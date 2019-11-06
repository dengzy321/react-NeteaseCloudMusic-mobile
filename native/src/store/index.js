import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './reducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};

const myPersistReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    myPersistReducer,
    compose(applyMiddleware(thunk))
);

export const persistor = persistStore(store)

export default store

// export default function configureStore(initialState) {
//     const store = createStore(
//         myPersistReducer,
//         initialState,
//         compose(applyMiddleware(thunk))
//     );
//     return store;
// };