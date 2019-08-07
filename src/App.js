import React from 'react';
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
import EmployeesListPage from './pages/employees/EmployeesListPage';
import CreateEmployeePage from './pages/employees/CreateEmployeePage';
import EditEmployeePage from './pages/employees/EditEmployeePage';
import DepartmentsListPage from './pages/departments/DepartmentsListPage';
import EditDepartmentPage from './pages/departments/EditDepartmentPage';
import CreateDepartmentPage from './pages/departments/CreateDepartmentPage';
import EmployeeProfilePage from './pages/employees/EmployeeProfilePage';
import history from './utils/history';

class App extends React.Component {
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
                        <Route path="/employees" component={EmployeesListPage} />
                        <Route path="/employee/:id(\d+)" component={EditEmployeePage} />
                        <Route path="/employeeProfile/:id(\d+)" component={EmployeeProfilePage} />
                        <Route path="/employee" component={CreateEmployeePage} />
                        <Route path="/departments" component={DepartmentsListPage} />
                        <Route path="/department/:id(\d+)" component={EditDepartmentPage} />
                        <Route path="/department" component={CreateDepartmentPage} />
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
