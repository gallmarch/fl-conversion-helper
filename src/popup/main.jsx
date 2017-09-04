import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducer from './reducer';
import Popup from './Popup';

console.info('somebody notice me plz');

const store = applyMiddleware(reduxThunk)(createStore)(reducer);
const container = document.querySelector('#react-container');
ReactDOM.render(<Popup />, container);
