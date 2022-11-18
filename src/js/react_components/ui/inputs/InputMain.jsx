import { useState } from 'react';

function InputMain({ changeActive }) {
  const [inputValue, setinputValue] = useState('');

  return (
    <form className='inputMain-wrap'
      method="POST"
      onSubmit={e => {
        e.preventDefault();
        console.log('a');
      }}
    >
      <input className='inputMain'
        placeholder='Type here...'
        type='text'
        value={inputValue}
        onChange={e => {
          setinputValue(e.target.value);
          changeActive(Boolean(e.target.value));
        }}
      />
      <button className='inputMain-submitBtn' type='submit'>Search</button>
    </form>
  );
}

export default InputMain;
