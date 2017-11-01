import React from 'react';
import ReactDOM from 'react-dom';
import TimePicker from '../src';

function onChange(time, timeString) {
  console.log(time, timeString);
}

ReactDOM.render(<TimePicker onChange={onChange} /> ,document.getElementById('sk-root'));
