import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from './store'

const history = createHistory()
const store = configureStore(history)

ReactDOM.render(
	(<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>
	), document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
