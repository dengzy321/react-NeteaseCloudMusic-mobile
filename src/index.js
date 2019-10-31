import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './store';
import App from './App';
import 'antd-mobile/dist/antd-mobile.css';
import './style/common.css'
import './style/variable.css'

import { http } from './api/http'
http.phoneLogin({
    phone: '17725999414',
    password: 'dzy2258349'
}).then(res =>{

})

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);