import { Routes, Route, HashRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MoviePage from './pages/MoviePage';
import ErrorPage from './pages/ErrorPage';
function App() {
  return (
    <HashRouter basename='/'>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='movie/:movieID' element={<MoviePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
