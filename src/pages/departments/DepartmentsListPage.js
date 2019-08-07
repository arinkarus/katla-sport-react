import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import {
    MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBBtn
} from 'mdbreact';
import history from '../../utils/history';
import { departmentActions } from '../../actions/departmentActions';
import LoadingGif from '../../components/loading/LoadingGif';
import ConfirmModal from '../../components/modals/ConfirmModal';

class DepartmentsListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: false,
            deletingId: null,
            parentDeletingId: null,
            showChilds: {}
        };
        this.toggleDeleteConfirmationModal = this.toggleDeleteConfirmationModal.bind(this);
        this.toggleShowChildDepartments = this.toggleShowChildDepartments.bind(this);
        this.handleDeleteDepartment = this.handleDeleteDepartment.bind(this);
    }

    componentDidMount() {
        this.props.getAllDepartments();
    }

    toggleDeleteConfirmationModal() {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal
        });
    }

    handleDeleteDepartmentClick(e, id) {
        this.toggleDeleteConfirmationModal();
        this.setState({ deletingId: id });
    }

    handleDeleteChildDepartmentClick(e, id, parentId) {
        this.toggleDeleteConfirmationModal();
        this.setState({ deletingId: id, parentDeletingId: parentId });
    }

    handleDeleteDepartment() {
        if (!this.state.parentDeletingId) {
            this.props.deleteParentDepartmentById(this.state.deletingId);
        }
        else {
            this.props.deleteChildDepartmentById(this.state.deletingId, this.state.parentDeletingId);
        }
        this.toggleDeleteConfirmationModal();
        this.setState({ parentDeletingId: null });
    }

    goToEditDepartment(e, id) {
        history.push(`/department/${id}`);
    }

    goToCreateDepartmentPage() {
        history.push(`/department`);
    }

    toggleShowChildDepartments(e, id)
    {
        const show = this.state.showChilds[id];
        let showChilds = this.state.showChilds;
        showChilds[id] = !show;
        this.setState({ showChilds: showChilds });
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <h4>Departments List</h4>
                    </MDBCol>
                </MDBRow>
                {this.props.loading &&
                    <MDBRow>
                        <MDBCol>
                            <LoadingGif />
                        </MDBCol>
                    </MDBRow>
                }
                {(this.props.departments && !this.props.loading) &&
                    <MDBRow className="justify-content-center">
                        <MDBCol>
                            <MDBTable bordered>
                                <MDBTableHead color="cyan" textWhite>
                                    <tr>
                                        <th>Child</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Allowed actions for item</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                {this.props.departments.map(department => (
                                    <Fragment key={department.id} >
                                        <tr>
                                            <td size="1">
                                                {department.childDepartments.length !== 0 &&
                                                <MDBBtn size="sm" color="yellow" onClick={(e) => this.toggleShowChildDepartments(e, department.id)}>
                                                    {this.state.showChilds[department.id] ? "-" : "+"} 
                                                </MDBBtn>}
                                            </td>
                                            <td>{department.name}</td>
                                            <td>{department.description}</td>
                                            <td>
                                                <MDBBtn size="sm" color="cyan" onClick={(e) => this.goToEditDepartment(e, department.id)}>
                                                    Edit
                                                </MDBBtn>
                                                {department.childDepartments.length === 0 &&
                                                <MDBBtn onClick={(e) => this.handleDeleteDepartmentClick(e, department.id)} size="sm" color="red">
                                                        Delete
                                                </MDBBtn>
                                                }
                                            </td>
                                        </tr>
                                        {this.state.showChilds[department.id] && (
                                        <Fragment>
                                            {
                                                department.childDepartments.map(child => (
                                                    <tr className="grey lighten-3" key={child.id}>
                                                        <td className="text-center" colSpan="2">{child.name}</td>
                                                            <td>{child.description}</td>
                                                        <td>
                                                            <MDBBtn size="sm" color="cyan" onClick={(e) => this.goToEditDepartment(e, child.id)}>
                                                                Edit
                                                            </MDBBtn>
                                                            <MDBBtn onClick={(e) => this.handleDeleteChildDepartmentClick(e, child.id, department.id)} size="sm" color="red">
                                                                Delete
                                                            </MDBBtn>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </Fragment>
                                        )}
                                          
                                    </Fragment>
                                    )
                                )}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                }
                <MDBRow className="justify-content-center">
                    <MDBCol>
                        <MDBBtn onClick={this.goToCreateDepartmentPage} size="sm" gradient="peach">
                            Create new
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <ConfirmModal
                    toggle={this.toggleDeleteConfirmationModal}
                    isOpen={this.state.showDeleteModal}
                    onSave={this.handleDeleteDepartment}
                />
            </MDBContainer>
        );
    }
}


function mapStateToProps(state) {
    const { loading, departments } = state.departments;
    return {
        loading, departments
    };
}

export default connect(mapStateToProps, departmentActions)(DepartmentsListPage);