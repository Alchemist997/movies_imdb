import axios from 'axios';
import urlGenerator from './../../utils/urlGenerator';
import InputHeader from './../ui/inputs/InputHeader';
import CardsList from './../ui/lists/CardsList';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { debounce } from './../../utils/debounce';
import SlickSlider from './../ui/slick_slider/SlickSlider';

function MoviePage() {
  const { movieID } = useParams();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputIsAtive, setInputIsAtive] = useState(false);
  const [cardsListData, setCardsListData] = useState(null);
  const [requestString, setRequestString] = useState('');
  const [responseErrorInfo, setResponseErrorInfo] = useState('');
  const [pageData, setPageData] = useState(null);
  const [images, setImages] = useState(null);
  const [suitableImages, setSuitableImages] = useState(new Set());
  const [showedImage, setShowedImage] = useState(-1);
  const [similarsData, setSimilarsData] = useState(null);

  const loadMoreItemsQty = 7;
  const searchUrl = urlGenerator('AdvancedSearch');

  function onLoadPageRequest(url) {
    axios.get(url)
      .then(response => {
        const responseData = response?.data;
        const imagesList = responseData?.images?.items;
        setImages(imagesList);
        if (imagesList?.length === 1) {
          setSuitableImages(prev => prev.add(imagesList[0].image));
        }
        setSimilarsData(responseData.similars);
        responseData.images = null;
        responseData.similars = null;
        setPageData(responseData);
      })
      .catch(error => {
        // Добавить переход на 404
      })
      .finally(() => {
      });
  }

  function inputRequest(url) {
    if (isLoading) return;

    setIsLoading(true);
    axios.get(url)
      .then(response => {
        const results = response.data?.results;
        const errorMessage = response.data?.errorMessage;

        if (!results || errorMessage) {
          throw new Error(errorMessage || 'Unknown Error');
        } else {
          setCardsListData(results);
        }
      })
      .catch(error => {
        setCardsListData('error');
        setRequestString(null);
        setResponseErrorInfo({
          message: error.message,
          statusCode: error.response?.status,
          statusText: error.response?.statusText
        });
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        setInputIsAtive(true);
      });
  }

  const debounceInputHandler = useCallback(debounce(value => {
    if (!value || value === requestString || isLoading) return;
    setRequestString(value);
    inputRequest(searchUrl({ requestString: value, loadMoreItemsQty }));
  }, 1000), [requestString, isLoading]);

  function inputOnChangeHandler(val) {
    setInputValue(val);
    debounceInputHandler(val);
  }

  useEffect(() => {
    setSuitableImages(new Set());
    setSimilarsData(null);
    setPageData(null);
    const onLoadPage = urlGenerator('Title');
    onLoadPageRequest(onLoadPage({ movieID }));
  }, [movieID]);

  useEffect(() => {
    const input = document.querySelector('.inputHeader');

    function inputHandler() {
      setInputIsAtive(true);
    }

    function searchAreaHandler(evt) {
      const target = evt.target;
      if (target.closest('.header__searchArea') && !target.closest('.card')) return;
      setInputIsAtive(false);
    }

    input.addEventListener('focus', inputHandler);
    document.addEventListener('pointerdown', searchAreaHandler);
    return () => {
      input.removeEventListener('focus', inputHandler);
      document.removeEventListener('pointerdown', searchAreaHandler);
    };
  });

  useEffect(() => {
    if (!images || !images.length) return;

    function getSuitableImageIndex(imgsArray, startIndex) {
      for (let i = startIndex || 0; i < imgsArray.length; i++) {
        if (suitableImages.has(imgsArray[i].image)) return i;
      }
      return null;
    }

    function setNewShowedImage() {
      if (!suitableImages.size) return;
      if (!changeShowedImage) {
        clearInterval(showFirstLoadedImg);
        changeShowedImage = setInterval(setNewShowedImage, 7000);
      }

      setShowedImage(prevN => {
        if (prevN + 1 >= images?.length) {
          return getSuitableImageIndex(images) ?? prevN;
        }

        return getSuitableImageIndex(images, prevN + 1) ?? getSuitableImageIndex(images) ?? prevN;
      });
    }

    const showFirstLoadedImg = setInterval(setNewShowedImage, 200);
    let changeShowedImage = null;

    return () => {
      clearInterval(showFirstLoadedImg);
      clearInterval(changeShowedImage);
    };

  }, [images, suitableImages]);

  return (
    <>
      <header className='header--moviePage'>
        <div className='container'>
          <Link to='/' className='header__logo'>
            Magic Shows
          </Link>

          <div className={`header__searchArea ${inputIsAtive ? 'active' : ''}`}>
            <InputHeader
              handler={inputOnChangeHandler}
              value={inputValue}
              isLoading={isLoading}
            />

            <CardsList
              data={cardsListData}
              isLoading={isLoading}
              resultsQty={cardsListData?.length}
              loadMoreItemsQty={loadMoreItemsQty}
              responseErrorInfo={responseErrorInfo}
              isHeaderMode={true}
            />
          </div>

        </div>
      </header>

      <section className='movie-preview'>

        <div className={`movie-preview__images-wrap
        ${!suitableImages.size ? 'hidden' : ''}
        ${images?.length === 1 ? 'once' : ''}`}>
          {images &&
            <>
              {images.map((el, i) => {
                return <img className={`movie-preview__img ${showedImage === i ? 'isShowed' : ''}`}
                  key={el.image}
                  alt={el.title}
                  src={el.image}
                  onLoad={evt => {
                    const img = evt.target;
                    const imgAspectRatio = img.naturalWidth / img.naturalHeight;
                    const viewportWidth = document.documentElement.clientWidth;
                    if (imgAspectRatio < 1.2 || (img.naturalWidth < 1024 && viewportWidth >= 1024)) return;
                    setSuitableImages(prev => prev.add(el.image));
                  }}
                />;

              })}
            </>
          }

          {!suitableImages.size && <div className='backgroundCSSImage' />}
          <div className='movie-preview__gradient' />
        </div>

        <div className='container'>
          {pageData &&
            <div className='movie-preview__info'>

              <div className='movie-preview__info-top'>
                <h1 className={`movie-preview__title ${pageData.title.length > 60 ? 'long' : ''}`}>
                  {pageData.title}
                </h1>

                <div className='movie-info-description'>
                  <div className='imdb-rate'>IMDb {pageData.imDbRating || '—'}</div>
                  {pageData.genreList?.map(el => <p key={el.key}>{el.value}</p>)}
                  {pageData.type && <p>{pageData.type}</p>}
                  {pageData.year && <p>{pageData.year}</p>}
                </div>
              </div>

              <div className='movie-preview__info-bottom'>
                <button type='button' className='movie-preview__btn'>Watch</button>
                <p>{pageData.awards}</p>
              </div>
            </div>
          }
          {!pageData && <h1>Loading info...</h1>}
        </div>

      </section>

      {pageData &&
        <section className='movie-info'>
          <div className='container'>
            <div className='movie-info__description'>
              <h2>Watch {pageData.title} on Magic Shows</h2>
              <p>{pageData.plot}</p>
            </div>

            {similarsData?.length ?
              <div className='movie-info__similars'>
                <p className='movie-info__similars-heading'>You may also like</p>
                <SlickSlider list={similarsData} className='movie-info__slider' />
              </div>
              : null
            }
          </div>
        </section>
      }

      <footer className='footer'>Magic Shows</footer>
    </>
  );
}

export default MoviePage;
