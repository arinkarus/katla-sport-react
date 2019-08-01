import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import AwardsListPage from './pages/awards/AwardsListPage';
import CreateAwardPage from './pages/awards/CreateAwardPage';
import _404ErrorPage from './pages/errors/404ErrorPage';
import EditAwardPage from './pages/awards/EditAwardPage';
import history from './utils/history';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Layout>
                    <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path="/awards" component={AwardsListPage} />
                        <Route exact path="/award" component={CreateAwardPage} />
                        <Route path="/award/:id(\d+)" component={EditAwardPage} />
                        <Route path="/NotFound" component={_404ErrorPage} />
                        <Route path='*' component={_404ErrorPage} />
                        </Switch>
                    </Router>
                </Layout>
          </div>
        );
    }
}

export default connect()(App);
