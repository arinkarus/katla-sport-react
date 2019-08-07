import React from 'react';
import { connect } from 'react-redux';
import EmployeeImage from '../../components/imageWrappers/EmployeeImage';
import {
    MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBBtn,
    MDBCardBody, MDBCard, MDBCardHeader
} from 'mdbreact';
import { employeeActions } from '../../actions/employeeActions';
import LoadingGif from '../../components/loading/LoadingGif';
import MessageModal from '../../components/modals/MessageModal';
import { imageValidator } from '../../utils/validation/imageValidators/imageValidator';
import { checkAspectRatio, checkImageSize } from '../../utils/validation/imageValidators/employeeImageValidator'
import history from '../../utils/history';
import ConfirmModal from '../../components/modals/ConfirmModal';

class EmployeeProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirmDeletingModal: false,
            showImageErrorModal: false,
            imageErrorMessage: ""
        };
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
        this.handleDeleteImageClick = this.handleDeleteImageClick.bind(this);
        this.toggleImageErrorModalForm = this.toggleImageErrorModalForm.bind(this);
        this.showImageErrorMessage = this.showImageErrorMessage.bind(this);
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.toggleConfirmDeletingModel = this.toggleConfirmDeletingModel.bind(this);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
        this.handleDeleteEmployee = this.handleDeleteEmployee.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getEmployeeProfileById(id);
    }

    toggleImageErrorModalForm() {
        this.setState({ showImageErrorModal: !this.state.showImageErrorModal });
    }

    toggleConfirmDeletingModel() {
        this.setState({ showConfirmDeletingModal: !this.state.showConfirmDeletingModal });
    }

    showImageErrorMessage(message) {
        this.setState({ imageErrorMessage: message });
        this.toggleImageErrorModalForm();
    }

    handleFileInputChange(event) {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        if (!file) {
            return;
        }
        const fileExtension = file.name.match(/\.[0-9a-z]+$/i);
        const employeeId = this.props.match.params.id;
        reader.onloadend = () => {
            const matches = reader.result.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            imageValidator.validate(checkAspectRatio, checkImageSize, file, reader.result).then(result => {
                if (!result.isCorrect) {
                    this.showImageErrorMessage(result.message);
                    return;
                }
                this.props.updateEmployeePhoto(employeeId, { extension: fileExtension[0], content: matches[2] });  
            });

        };
        reader.readAsDataURL(file);
    }

    handleGoToListButtonClick() {
        history.push(`/employees`);
    }

    handleDeleteImageClick(event) {
        this.props.deleteEmployeePhoto(this.props.match.params.id);
    }

    handleEditButtonClick() {
        const id = this.props.match.params.id;
        history.push(`/employee/${id}`);
    }

    handleDeleteButtonClick() {
        this.toggleConfirmDeletingModel();
    }

    handleDeleteEmployee() {
        const id = this.props.match.params.id;
        this.props.deleteEmployeeById(id);
    }

    render() {
        return (
            <MDBContainer>
                {this.props.loading &&
                    <LoadingGif />}
                {this.props.employeeProfile &&
                    <MDBRow className>
                        <MDBCol>
                            <MDBCard>
                                <MDBCardHeader
                                    className="form-header peach-gradient text-center text-white">
                                    <h5 className="my-2">
                                        Employee profile: {this.props.employeeProfile.name} {this.props.employeeProfile.surname}
                                    </h5>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBRow className="justify-content-center py-2">
                                        <MDBCol>
                                        {this.props.loadingPhoto && 
                                            <LoadingGif/>
                                        }
                                        {!this.props.loadingPhoto &&
                                            <EmployeeImage path={this.props.employeeProfile.imagePath} />
                                        }
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="justify-content-center py-3">
                                        <MDBCol md="4">
                                            <input type="file"
                                                onChange={this.handleFileInputChange}
                                                className={"custom-file-input form-control"}
                                                name="employeeImageUploader" />
                                            <label className="custom-file-label" htmlFor="employeeImageUploader" >
                                                Change profile picture of employee
                                            </label>
                                        </MDBCol>
                                        {this.props.employeeProfile.imagePath &&
                                        <MDBCol md="2">
                                            <MDBBtn onClick={this.handleDeleteImageClick}
                                                size="sm"
                                                color="red">Delete</MDBBtn>
                                        </MDBCol>}
                                    </MDBRow>
                                    <hr/>
                                    <MDBRow className="px-2">
                                        <MDBCol md="2" className="font-weight-bolder">Name</MDBCol>
                                        <MDBCol md="2">{this.props.employeeProfile.name}</MDBCol>
                                    </MDBRow>
                                    <MDBRow className="px-2">
                                        <MDBCol md="2" className="font-weight-bolder">Surname</MDBCol>
                                        <MDBCol md="2">{this.props.employeeProfile.surname}</MDBCol>
                                    </MDBRow>
                                    <MDBRow className="px-2">
                                        <MDBCol md="2" className="font-weight-bolder">Email</MDBCol>
                                        <MDBCol md="2">{this.props.employeeProfile.email}</MDBCol>
                                    </MDBRow>
                                    {this.props.employeeProfile.about && this.props.employeeProfile.about.length !== 0 &&
                                    <MDBRow className="px-2">
                                        <MDBCol md="2" className="font-weight-bolder">About</MDBCol>
                                        <MDBCol md="2">{this.props.employeeProfile.about}</MDBCol>
                                    </MDBRow>}
                                    <MDBRow className="px-2">
                                        <MDBCol md="2" className="font-weight-bolder">Department</MDBCol>
                                        <MDBCol md="2">{this.props.employeeProfile.department.name}</MDBCol>
                                    </MDBRow>
                                    {this.props.employeeProfile.department.description && this.props.employeeProfile.department.description.length !== 0 &&
                                    <MDBRow className="px-2">
                                        <MDBCol md="2" className="font-weight-bolder">Department description</MDBCol>
                                        <MDBCol md="2">{this.props.employeeProfile.department.description}</MDBCol>
                                    </MDBRow>}
                                    <hr />
                                    <MDBRow className="justify-content-center">
                                        <MDBBtn onClick={this.handleGoToListButtonClick} size="sm" color="orange">Go to list</MDBBtn>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                }
                <MessageModal modalTitle="Can't load file"
                    isOpen={this.state.showImageErrorModal}
                    toggle={this.toggleImageErrorModalForm}
                    message={this.state.imageErrorMessage} />
                <ConfirmModal isOpen={this.state.showConfirmDeletingModal}
                    toggle={this.toggleConfirmDeletingModel}
                    onSave={this.handleDeleteEmployee}/>
            </MDBContainer>
        );
    }
}

function mapStateToProps(state) {
    const { loading, employeeProfile, loadingPhoto } = state.employees;
    return {
        loading, employeeProfile, loadingPhoto
    };
}

export default connect(mapStateToProps, employeeActions)(EmployeeProfilePage);