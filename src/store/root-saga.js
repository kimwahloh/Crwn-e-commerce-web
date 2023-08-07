import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga';
import { userSagas } from './user/user.saga';

//174 generator funxtion (ES6)
export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSagas)]);
}
