import BackgroundMovie from './../ui/BackgroundMovie';
import { useEffect, useState } from 'react';

function MainPage() {
  const [ar, setAR] = useState(0);
  useEffect(() => {
    function updateSize() {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      setAR(width > 1023 ? (width / height) : 0);
      // if (width > 1023) setAR(width / height);
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      {ar > 1.6 ? <BackgroundMovie /> : null}
      <div className='mainWrap'>
        <main className='container main'>
          <h1>Unlimited movies,<br />TV shows, and more.</h1>
          <p>Watch anywhere. Cancel anytime.</p>
        </main>
      </div>
    </>
  );
}

export default MainPage;
