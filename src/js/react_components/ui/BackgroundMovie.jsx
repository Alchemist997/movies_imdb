function BackgroundMovie() {
  return (
    <div className='backgroundMain'>
      <iframe
        className="backgroundMovie"
        title="YouTube background movie"
        src="https://www.youtube.com/embed/gA0nQyDZR4A?autoplay=1&mute=1&controls=0&loop=1&start=5&modestbranding=1;"
        frameBorder="0"
        allowFullScreen
      />
      <div className='frontCover'></div>
    </div>
  );
}

export default BackgroundMovie;
