// +core+
import React from 'react';
import ReactDOM from 'react-dom';

// ~structural~
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

// $store
import configureStore from './store/configureStore';

// [containers]
import App from './containers/App';

// :design assets:
import './index.css';

// creating App store with customized function
const store = configureStore({
    transactions: [],
    categories: [],
    dataIsLoading: false,
    dataFetchErrored: false,
})

// passing store downstream with react-redux Provider
ReactDOM.render(

    <Provider store={ store }>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);

registerServiceWorker();