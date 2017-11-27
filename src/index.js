import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './containers/App';

import configureStore from './store/configureStore';

const store = configureStore({
    transactions: [],
    trsIsLoading: false,
    trsHasErrored: false,
})

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
