import axios from 'axios';
import urlGenerator from './../../utils/urlGenerator';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function MoviePage() {
  const { movieID } = useParams();
  const [data, setData] = useState(null);

  function request(url) {
    axios.get(url)
      .then(response => {
        console.log(response.data);
        const results = response?.data;
        setData(results);
      })
      .catch(error => {
        // Добавить переход на 404
      })
      .finally(() => {
      });
  }

  useEffect(() => {
    const onLoadUrl = urlGenerator('Title');
    request(onLoadUrl({ movieID }));
  }, [movieID]);

  return (
    <>
      <header className='header--moviePage'>
        <div className='container'>
          <Link to='/' className='header__logo'>
            Magic Shows
          </Link>
          <div></div>
        </div>
      </header>

      <section className='movie-preview'>

        <div className='movie-preview__images-wrap'>
          {data?.images && <>
            <img className='movie-preview__img'
              alt={data.images.items[0].title}
              src={data.images.items[0].image}
            />
            <img className='movie-preview__img'
              alt={data.images.items[1]?.title}
              src={data.images.items[1]?.image}
            />
          </>}
          <div className='movie-preview__gradient' />
        </div>

        <div className='container'>
          <div className='movie-preview__info'>

            <div className='movie-preview__info-top'>
              <h1 className='movie-preview__title'>{data?.title}</h1>

              <div className='movie-info-description'>
                <div className='imdb-rate'>IMDb {data?.imDbRating || '—'}</div>
                {data?.genreList?.map(el => <p key={el.key}>{el.value}</p>)}
                {data?.type && <p>{data?.type}</p>}
                {data?.year && <p>{data?.year}</p>}
              </div>
            </div>

            <div className='movie-preview__info-bottom'>
              <button type='button' className='movie-preview__btn'>Watch</button>
              <p>{data?.awards}</p>
            </div>
          </div>
        </div>

      </section>

      <section className='movie-info'>
        <div className='container'>
          <div className='movie-info__description'>
            <h2>Watch {data?.title} on Magic Shows</h2>
            <p>{data?.plot}</p>
          </div>
        </div>
      </section>

      <footer className='footer'>Magic Shows</footer>
    </>
  );
}

export default MoviePage;
