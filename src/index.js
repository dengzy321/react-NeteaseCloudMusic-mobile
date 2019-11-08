import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from '@/store';
import App from '@/App';
import '@/utils/global'
import 'antd-mobile/dist/antd-mobile.css';
import '@/style/common.css'
import '@/style/variable.css'

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);