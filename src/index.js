import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';


const initialState = window.initialReduxState;
const history = createBrowserHistory();
const store = configureStore(history, initialState);
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    rootElement);

registerServiceWorker();
