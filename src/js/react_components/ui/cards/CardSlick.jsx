import { useState } from 'react';
import { Link } from 'react-router-dom';
import SVG from '../svg/SVGList';

function CardSlick({ title, movieID, rate, imgSrc }) {
  const [imgIsNotLoaded, setImgIsNotLoaded] = useState('notLoaded');

  return (
    <Link to={`/movie/${movieID}`} className='card-slick' draggable='false'>
      <div className={`card-slick__img-wrap ${imgIsNotLoaded}`}>
        <img className='card-slick__movieCover'
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

      <div className='card-slick__info'>
        <p>{title}</p>
        <div className='imdb-rate'>IMDb {rate || '—'}</div>
      </div>
    </Link>
  );
}

export default CardSlick;
