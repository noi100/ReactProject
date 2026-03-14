import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import projectReducer from './projectSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { combineReducers } from 'redux';

// מאחד את כל ה- Slice לאובייקט אחד
const rootReducer = combineReducers({
    user: userReducer, // מגיע מ-userSlice
    project: projectReducer, // מגיע מ-projectSlice
});

const persistConfig = {
    key: 'root',
    storage,
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