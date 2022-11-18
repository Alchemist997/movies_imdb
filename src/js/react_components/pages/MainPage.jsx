import { useEffect, useState } from 'react';
import BackgroundMovie from './../ui/BackgroundMovie';
import InputMain from './../ui/inputs/InputMain';

function MainPage() {
  const [aspectRatio, setAspectRatio] = useState(0);
  const [isActive, setIsActive] = useState(false);

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
        : <div className='backgroundMainImage'></div>
      }
      <div className='mainWrap'>
        <main className={`container main ${isActive ? 'active' : null}`}>
          <h1>Unlimited movies,<br />TV shows, and more.</h1>
          <p className={isActive ? 'active' : null}>Watch anywhere. Cancel anytime.</p>
          <div className='main__searchArea'>
            <InputMain changeActive={setIsActive} />
          </div>
        </main>
      </div>
    </>
  );
}

export default MainPage;
