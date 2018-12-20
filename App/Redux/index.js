// import { combineReducers } from 'redux'
// import { createNavigationReducer } from 'react-navigation-redux-helpers'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
// import AppNavigation from '../Navigation/AppNavigation'
import reducers from './Reducers'


// console.log('-----------------------12221');
// console.log(AppNavigation);

// /* ------------- Assemble The Reducers ------------- */
// export const reducers = combineReducers({
//   nav: createNavigationReducer(AppNavigation),
//   // ADD_REDUX_REDUCER
// })

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      // const nextRootReducer = require('./').reducers
      // store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
