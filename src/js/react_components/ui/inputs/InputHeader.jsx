import SVG from '../svg/SVGList';

function InputHeader({ handler, value, isLoading, onFocusHandler }) {
  return (
    <label className='inputHeader-wrap'>
      <div className={`inputHeader__svg-wrap ${isLoading ? 'isLoading' : ''}`}>
        <SVG name='magnifier' />
        <SVG name='loader_2' />
      </div>
      <input className='inputHeader'
        placeholder='Type here... (English)'
        type='text'
        value={value}
        maxLength='128'
        onChange={evt => handler(evt.target.value)}
        onFocus={() => onFocusHandler()}
      />
    </label>
  );
}

export default InputHeader;
