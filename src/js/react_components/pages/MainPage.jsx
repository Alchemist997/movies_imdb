import axios from 'axios';
import urlGenerator from './../../utils/urlGenerator';
import { useCallback, useEffect, useState } from 'react';
import { throttleOnce } from '../../utils/debounce';
import Card from '../ui/cards/Card';
import CardError from '../ui/cards/CardError';
import BackgroundMovie from './../ui/BackgroundMovie';
import InputMain from './../ui/inputs/InputMain';
import SVG from './../ui/svg/SVGList';

function MainPage() {
  const [aspectRatio, setAspectRatio] = useState(0);
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestString, setRequestString] = useState('');
  const [resultsQty, setResultsQty] = useState(0);
  const [responseErrorInfo, setResponseErrorInfo] = useState('');
  const [cahchedRequestValue, setCahchedRequestValue] = useState(null);
  const [startNumber, setStartNumber] = useState(1);

  const loadMoreItemsQty = 5;
  const searchUrl = urlGenerator('AdvancedSearch');

  function makeRequest(url) {
    setIsLoading(true);
    axios.get(url)
      .then(response => {
        const results = response.data?.results;
        const errorMessage = response.data?.errorMessage;

        if (!results || errorMessage) {
          throw new Error(errorMessage || 'Unknown Error');
        } else {
          setStartNumber(startNumber + loadMoreItemsQty);
          setResultsQty(results.length);
          setData(data?.length && results.length ? [...data, ...results] : results);
        }
      })
      .catch(error => {
        setData('error');
        setCahchedRequestValue(null);
        setResponseErrorInfo({
          message: error.message,
          statusCode: error.response?.status,
          statusText: error.response?.statusText
        });
        console.log(error);
        // alert('Ошибка');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const getIMDbData = useCallback(throttleOnce(requestString => {
    if (!requestString) return;
    setRequestString(requestString);
    setStartNumber(1);
    makeRequest(searchUrl({ requestString, loadMoreItemsQty }));
  }, 1000), []);

  useEffect(() => {
    function updateSize() {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      setAspectRatio(width > 1023 ? (width / height) : 0);
      // if (width > 1023) setAR(width / height);
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      {aspectRatio > 1.6
        ? <BackgroundMovie />
        : <div className='backgroundMainImage' />
      }
      <div className='mainWrap'>
        <form className={`container main ${data?.length ? 'active' : ''}`}
          method="POST"
          onSubmit={evt => {
            evt.preventDefault();
            if (isLoading || cahchedRequestValue === inputValue) return;
            setCahchedRequestValue(inputValue);
            getIMDbData(inputValue);
          }}
        >
          <h1>Unlimited movies,<br />TV shows, and more.</h1>
          <p className={data?.length ? 'active' : null}>Watch anywhere. Cancel anytime.</p>
          <div className='main__searchArea'>
            <InputMain
              handler={setInputValue}
              value={inputValue}
              isLoading={isLoading}
            />
            <section className='cards-list cards-list--main'>
              {data && data.length && data !== 'error'
                ? <>
                  {data.map(el => <Card
                    key={el.id}
                    movieID={el.id}
                    title={el.title}
                    rate={el.imDbRating}
                    imgSrc={el.image}
                    genresList={el.genreList}
                    years={el.description}
                    plot={el.plot}
                  />)}

                  {resultsQty >= loadMoreItemsQty &&
                    <button
                      type='button'
                      className={`card card--loadMore ${isLoading ? 'hide' : ''}`}
                      onClick={() => {
                        if (isLoading) return;
                        makeRequest(searchUrl({
                          requestString,
                          loadMoreItemsQty,
                          startNumber
                        }));
                      }}
                    >
                      <SVG name='loader_1' />
                      Load more
                    </button>}
                </>

                : data && data !== 'error'
                  ? <div className='card card--empty'>No results</div>

                  : data && data === 'error'
                    ? <CardError
                      message={responseErrorInfo.message}
                      statusCode={responseErrorInfo.statusCode}
                      statusText={responseErrorInfo.statusText}
                    />

                    : null
              }
            </section>
          </div>
        </form>
      </div>
    </>
  );
}

export default MainPage;
