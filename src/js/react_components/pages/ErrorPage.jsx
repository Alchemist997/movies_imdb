import { Link, useSearchParams } from 'react-router-dom';
import SVG from './../ui/svg/SVGList';

function ErrorPage() {
  const [params] = useSearchParams();
  const searchParams = {};

  for (const param of params.entries()) {
    searchParams[param.at(0)] = param.at(1);
  }

  const is404 = !searchParams.errorInfo &&
    (searchParams.statusCode === '404' || searchParams.statusCode === undefined);

  const { statusCode, statusInfo, errorInfo } = searchParams;

  return (
    <>
      <header className='header--moviePage'>
        <div className='container'>
          <Link to='/' className='header__logo'>
            <SVG name='logo-header' />
          </Link>
        </div>
      </header>

      <div className='backgroundMainImage' />

      <main className='errorPage'>
        <h1>Error {is404 ? 404 : statusCode}</h1>

        {(statusInfo || is404) && <p className='statusInfo'>{is404 ? 'Not found' : statusInfo}</p>}

        <p>{errorInfo}</p>

        <Link to='/' className='card card--loadMore'>
          OK, go to main page
        </Link>
      </main>
    </>
  );
}

export default ErrorPage;
