
const { fork, call, takeLatest } = require('redux-saga/effects');
const { loadUser, loadDashboardSequenced, loadDashboardNonSequenced } = require('./sagas');

function* rootSaga() {
  console.log('hello');
  yield fork(loadUser);
  yield takeLatest('LOAD_DASHBOARD', loadDashboardSequenced);
  // yield takeLatest('LOAD_DASHBOARD2', loadDashboardNonSequenced);
  console.log('so what');
}

module.exports = rootSaga;
