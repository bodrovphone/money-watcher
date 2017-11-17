import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import transactions from './reducers';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(transactions);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
