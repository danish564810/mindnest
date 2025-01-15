import DatePicker from 'react-datepicker';
import './DateTimePicker.css';
import 'react-datepicker/dist/react-datepicker.css';

function DateTimePicker({ layout, selected, onChange }) {

  const defineLayout = layout === 'dashboard' ? 'datepicker-dashboard' : 'datepicker-account'

  return (

    <div className={defineLayout}>
      <DatePicker floatLabelType="Auto"
        className='form-control '
        placeholderText="DOB"
        selected={selected}
        onChange={onChange}
        minDate={new Date('1900-01-01')}
        dateFormat="dd-MM-yyyy"
      />
    </div>
  )
}

export default DateTimePicker