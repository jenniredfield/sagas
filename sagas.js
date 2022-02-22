const { put, take, call, select } = require('redux-saga/effects');
const TravelServiceApi = require('./TravelServiceApi');

function loadDeparture() {
    return TravelServiceApi.getDeparture();
}

function loadForecast(date) {
    return TravelServiceApi.getForecast(date)
}

function* loadUser() {
    try {
     // [1]
      const user = yield call(TravelServiceApi.getUser);
     // [2]
      yield put({type: 'FETCH_USER_SUCCESS', payload: user});

    } catch(error) {
     // [3]
      yield put({type: 'FETCH_FAILED', error});
    }
  }

  function* loadDashboardSequenced() {
      console.log('fetching dashboard...')
    try {
      // [1]
      yield take('FETCH_USER_SUCCESS');
  // [2]
      const user = yield select(state => state.user);
      // [3]
      const departure = yield call(loadDeparture, user);
      // [4]
    //   const flight = yield call(loadFlight, departure.flightID);
      const forecast = yield call(loadForecast, departure.date);
  // [5]
      yield put({
        type: 'FETCH_DASHBOARD_SUCCESS',
        payload: { forecast, flight, departure }
      });
    } catch (error) {
      // [6]
      yield put({
        type: 'FETCH_FAILED',
        error: error.message
      });
    }
  }

  function* loadDashboardNonSequenced() {
    try {
      // Esperando pela redux action
      yield take('FETCH_USER_SUCCESS');
  // Busca informações do usuário na store
      const user = yield select(getUserFromState);
  // Busca informações de embarque
      const departure = yield call(loadDeparture, user);
      
      // AQUI QUE A MÁGICA ACONTECE 🎉🎉🎉
      const [flight, forecast] = yield [
          call(loadFlight, departure.flightID), 
          call(loadForecast, departure.date)
      ];
  // Retornando os valores para nossa aplicação
      yield put({
          type: 'FETCH_DASHBOARD_2_SUCCESS', 
          payload: { departure, flight, forecast }
      });
  } catch(error) {
      yield put({type: 'FETCH_FAILED', error: error.message});
    }
  }

  module.exports = { loadUser, loadDashboardSequenced, loadDashboardNonSequenced }