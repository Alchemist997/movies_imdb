import { useState } from 'react';
import { Link } from 'react-router-dom';
import SVG from './../svg/SVGList';

function Card({ title, movieID, rate, imgSrc, genresList, years, plot }) {
  const [imgIsNotLoaded, setImgIsNotLoaded] = useState('notLoaded');

  return (
    <Link to={`/movie/${movieID}`} className='card'>
      <div className={`card__img-wrap ${imgIsNotLoaded}`}>
        <img className='card__movieCover'
          src={imgSrc}
          alt={imgSrc?.endsWith('nopicture.jpg')
            ? 'Crossed out camera'
            : `${title} — cover`}
          onLoad={() => setImgIsNotLoaded('')}
        />

        {imgIsNotLoaded &&
          <div className='card__loaderCover'>
            <SVG name='loader_2' />
          </div>
        }
      </div>

      <div className='card__info'>
        <div className='card__info-top'>
          <p>{title}</p>
          <div className='imdb-rate'>IMDb {rate || '—'}</div>
        </div>

        <div className='movie-info-description'>
          {genresList?.map(el => <p key={el.key}>{el.value}</p>)}
          <p>{years?.replace(/[^0-9-–\s]/g, '')}</p>
        </div>

        {plot && <div className='card__info-bottom'>{plot}</div>}
      </div>
    </Link>
  );
}

export default Card;
