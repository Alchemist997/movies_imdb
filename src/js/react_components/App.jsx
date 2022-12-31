import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MoviePage from './pages/MoviePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='*' element={<h1>Error 404 — Page not found</h1>} />
        <Route path='movie/:movieID' element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
