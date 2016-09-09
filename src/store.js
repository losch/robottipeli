import { createStore } from 'redux';
import rootReducer from './rootReducer';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);

  // Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
