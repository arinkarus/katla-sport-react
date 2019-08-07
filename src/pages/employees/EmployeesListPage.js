import React from 'react';
import { connect } from 'react-redux';
import {
    MDBContainer, MDBRow, MDBCol, MDBTable,
    MDBTableHead, MDBTableBody, MDBBtn
} from 'mdbreact';
import history from '../../utils/history';
import ConfirmModal from '../../components/modals/ConfirmModal';
import LoadingGif from '../../components/loading/LoadingGif';
import { employeeActions } from '../../actions/employeeActions';
import EmployeeImage from '../../components/imageWrappers/EmployeeImage';

class EmployeesListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: false,
            deletingId: null
        };
        this.toggleDeleteConfirmationModal = this.toggleDeleteConfirmationModal.bind(this);
        this.handleDeleteEmployee = this.handleDeleteEmployee.bind(this);
        this.handleDeleteEmployeeClick = this.handleDeleteEmployeeClick.bind(this);
    }

    componentDidMount() {
        this.props.getAllEmployees();
    }

    goToCreatePage() {
        history.push("/employee");
    }

    goToEditPage(e, id) {
        history.push(`/employee/${id}`);
    }

    goToProfilePage(e, id) {
        history.push(`/employeeProfile/${id}`);
    }

    handleDeleteEmployeeClick(e, id) {
        this.toggleDeleteConfirmationModal();
        this.setState({
            deletingId: id
        });
    }

    toggleDeleteConfirmationModal() {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal
        });
    }

    handleDeleteEmployee() {
        this.toggleDeleteConfirmationModal();
        this.props.deleteEmployeeById(this.state.deletingId);
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <h4>Employees List</h4>
                    </MDBCol>
                </MDBRow>
                {this.props.loading &&
                    <MDBRow>
                        <MDBCol>
                            <LoadingGif />
                        </MDBCol>
                    </MDBRow>
                }
                {(this.props.employees && !this.props.loading) &&
                    <MDBRow className="justify-content-center">
                        <MDBCol>
                            <MDBTable bordered>
                                <MDBTableHead color="cyan" textWhite>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Name</th>
                                        <th>Surname</th>
                                        <th>Email</th>
                                        <th>Department</th>
                                        <th>Allowed actions for item</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                {this.props.employees.map(emp => (
                                    <tr key={emp.id}>
                                        <td><EmployeeImage maxSize={80} path={emp.imagePath}/></td>
                                        <td>{emp.name}</td>
                                        <td>{emp.surname}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.department.name}</td>
                                        <td>
                                            <MDBBtn size="sm" color="cyan" onClick={(e) => this.goToEditPage(e, emp.id)}>
                                                Edit
                                            </MDBBtn>
                                            <MDBBtn onClick={(e) => this.handleDeleteEmployeeClick(e, emp.id)} size="sm" color="red">
                                                Delete
                                            </MDBBtn>
                                            <MDBBtn onClick={(e) => this.goToProfilePage(e, emp.id)} size="sm" color="orange">
                                                Go to profile
                                            </MDBBtn>
                                        </td>
                                    </tr>))}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                }
                <MDBRow className="justify-content-center">
                    <MDBCol>
                        <MDBBtn onClick={this.goToCreatePage} size="sm" gradient="peach">
                            Create new
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <ConfirmModal
                    toggle={this.toggleDeleteConfirmationModal}
                    isOpen={this.state.showDeleteModal}
                    onSave={this.handleDeleteEmployee}
                />
            </MDBContainer>
        );
    }
}

function mapStateToProps(state) {
    const { loading, employees } = state.employees;
    return {
        loading, employees
    };
}

export default connect(mapStateToProps, employeeActions)(EmployeesListPage);