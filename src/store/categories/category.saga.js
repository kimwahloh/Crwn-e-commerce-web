import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';

import { CATEGORIES_ACTION_TYPES } from './category.types';

//176 Whenever we take the latest, FETCH_CATEGORIES_START action > initialize fetchCategoriesAsync Saga (that attempt to fetch our 
// categories array from Firebase) >take this onFetchCategories Saga and listen to it inside of our categoriesSaga aggregator

export function* fetchCategoriesAsync() {
    try { 
        const categoriesArray = yield call(getCategoriesAndDocuments,'categories');
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed (error));
    }
};

export function* onFetchCategories() {
    yield takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, 
        fetchCategoriesAsync
    );
};

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}