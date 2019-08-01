import React from 'react';
import { connect } from 'react-redux';
import {
    MDBContainer, MDBRow, MDBCol, MDBTable,
    MDBTableHead, MDBTableBody, MDBBtn
} from 'mdbreact';
import history from '../../utils/history';
import { awardActions } from '../../actions/awardActions';
import ConfirmModal from '../../components/modals/ConfirmModal';
import LoadingGif from '../../components/loading/LoadingGif';

class AwardsListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: false,
            deletingId: null
        };
        this.toggleDeleteConfirmationModal = this.toggleDeleteConfirmationModal.bind(this);
        this.handleDeleteAward = this.handleDeleteAward.bind(this);
    }

    componentDidMount() {
        this.props.getAllAwards();
    }

    goToCreateAwardPage() {
        history.push("/");
    } 

    handleDeleteAwardClick(e, id) {
        this.toggleDeleteConfirmationModal();
        this.setState({ deletingId: id });
    }

    toggleDeleteConfirmationModal() {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal
        });
    }

    handleDeleteAward() {
        this.props.deleteAward(this.state.deletingId);
        this.toggleDeleteConfirmationModal();
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <h4>Awards List</h4>
                    </MDBCol>
                </MDBRow>
                {this.props.loading &&
                    <MDBRow>
                        <MDBCol>
                            <LoadingGif />
                        </MDBCol>
                    </MDBRow>
                }
                {this.props.awards &&
                    <MDBRow className="justify-content-center">
                        <MDBCol>
                            <MDBTable bordered>
                                <MDBTableHead color="cyan" textWhite>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Has (count) employees</th>
                                        <th>Allowed actions for item</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                {this.props.awards.map(award => (
                                    <tr key={award.id}>
                                        <td>{award.name}</td>
                                        <td>{award.description}</td>
                                        <td>{award.employeeCount}</td>
                                        <td>
                                            <MDBBtn size="sm" color="cyan">
                                                Edit
                                        </MDBBtn>
                                            {award.employeeCount === 0 &&
                                                <MDBBtn onClick={(e) => this.handleDeleteAwardClick(e, award.id)} size="sm" color="red">
                                                    Delete
                                                </MDBBtn>
                                            }
                                        </td>
                                    </tr>
                                 ))}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                }
                <MDBRow className="justify-content-center">
                    <MDBCol>
                        <MDBBtn onClick={this.goToCreateAwardPage} size="sm" gradient="peach">
                            Create new
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <ConfirmModal
                    toggle={this.toggleDeleteConfirmationModal}
                    isOpen={this.state.showDeleteModal}
                    onSave={this.handleDeleteAward}
                />
            </MDBContainer>
        );
    }
}

function mapStateToProps(state) {
    const { loading, awards } = state.awards;
    return {
        loading, awards
    };
}

export default connect(mapStateToProps, awardActions)(AwardsListPage);