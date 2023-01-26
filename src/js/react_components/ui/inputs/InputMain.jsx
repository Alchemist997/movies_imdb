import SVG from '../svg/SVGList';

function InputMain({ handler, value, isLoading }) {
  return (
    <div className='inputMain-wrap'>
      <input className='inputMain'
        placeholder='Type here...'
        type='text'
        value={value}
        maxLength='128'
        onChange={evt => { handler(evt.target.value); }}
      />
      <button
        className={`inputMain-submitBtn ${isLoading ? 'hide' : ''}`}
        type='submit'
        disabled={isLoading ? true : false}
      >
        <SVG name='loader_1' />
        Search
      </button>
    </div>
  );
}

export default InputMain;
