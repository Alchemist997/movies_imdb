function CardError({ message, statusCode, statusText }) {
  return (
    <div className='card card--error'>
      <p>An error occurred while receiving the data.</p>
      <p>Try again or refresh the page.</p>
      Message: {message}<br />
      {statusCode && <>Status: {statusCode}<br /></>}
      {statusText && <>Info: {statusText}<br /></>}
    </div>
  );
}

export default CardError;
