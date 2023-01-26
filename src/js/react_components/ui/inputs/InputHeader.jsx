import SVG from '../svg/SVGList';

function InputHeader({ handler, value, isLoading }) {
  return (
    <label className='inputHeader-wrap'>
      <div className={`inputHeader__svg-wrap ${isLoading ? 'isLoading' : ''}`}>
        <SVG name='magnifier' />
        <SVG name='loader_2' />
      </div>
      <input className='inputHeader'
        placeholder='Type here...'
        type='text'
        value={value}
        maxLength='128'
        onChange={evt => {
          // if (isLoading) return;
          handler(evt.target.value);
        }}
      />
    </label>
  );
}

export default InputHeader;
