const { createStore, compose, applyMiddleware } = require('redux');
const createSagaMiddleware = require('redux-saga').default;

const rootSaga = require('./rootSaga');
const sagaMiddleware = createSagaMiddleware();

const initialState = {
  user: {
    email: '',
    repository: '',
  },
  departure: {
    userId: '',
    flightID: '',
    date: '',
  },
  forecast: {
    date: '',
    forecast: '',
  },
  dashboard: {},
};

const reducers = (state, { type, payload }) => {
    console.log("🚀 ~ file: store.js ~ line 25 ~ reducers ~ type", type)
    console.log("🚀 ~ file: store.js ~ line 25 ~ reducers ~ payload", payload)
  
  switch (type) {
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        user: payload,
      };
    case 'FETCH_DASHBOARD_SUCCESS':
      return {
        ...state,
        dashboard: payload,
      }
    default:
      return state;
  }
};

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

module.exports = store;
