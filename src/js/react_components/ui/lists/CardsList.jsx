import SVG from './../svg/SVGList';
import Card from './../cards/Card';
import CardError from './../cards/CardError';

function CardsList({ data, isLoading, makeRequest, resultsQty, loadMoreItemsQty, responseErrorInfo, isHeaderMode }) {
  return (
    <section className={`cards-list cards-list${isHeaderMode ? '--movie' : '--main'}`}>
      {data && data.length && data !== 'error'
        ? <>
          {data.map(el => el.description ?
            <Card
              key={el.id}
              movieID={el.id}
              title={el.title}
              rate={el.imDbRating}
              imgSrc={el.image}
              genresList={el.genreList}
              years={el.description}
              plot={isHeaderMode ? null : el.plot}
            />

            : null
          )}

          {
            resultsQty >= loadMoreItemsQty ?

              !isHeaderMode ?
                <button
                  type='button'
                  className={`card card--loadMore ${isLoading ? 'hide' : ''}`}
                  onClick={() => {
                    if (isLoading) return;
                    makeRequest();
                  }}
                >
                  <SVG name='loader_1' />
                  Load more
                </button>

                : <button
                  type='button'
                  className={`card card--loadMore`}
                >
                  SHOW MORE RESULTS ON MAIN PAGE
                </button>

              : null
          }
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
  );
}

export default CardsList;
