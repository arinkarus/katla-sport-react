import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store/configureStore';
import history from './utils/history';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Layout from './components/layout/Layout';
import { Route, Router } from 'react-router-dom';
import './App.css';
import _404ErrorPage from './pages/errors/404ErrorPage';
import EditAwardPage from './pages/awards/EditAwardPage';

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    rootElement);

registerServiceWorker();
