import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import projectReducer from './projectSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // החלפת lib ב-es
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer,
});

const persistConfig = {
    key: 'root',
    storage, // כאן הבעיה הייתה, אם הייבוא למעלה לא נכון, זה יהיה undefined
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);