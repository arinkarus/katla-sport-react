import React from 'react';
import PropTypes from 'prop-types';
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody,
    MDBCardHeader, MDBBtn
} from "mdbreact";
import ControlledInput from '../formControls/ControlledInput';
import ControlledTextarea from '../formControls/ControlledTextarea';
import SumbitButton from '../formControls/SubmitButton';

class AwardForm extends React.PureComponent {
    render() {
        return (
            <MDBContainer fluid>
                <MDBRow className="ml-3 justify-content-center">
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardHeader
                                className="form-header peach-gradient text-center text-white">
                                <h4 className="my-3">
                                    {this.props.formName}
                                </h4>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <form>
                                    <ControlledInput
                                        caption="Name for award"
                                        name="name"
                                        defaultValue={this.props.award.name}
                                        isError={this.props.awardValidationErrors.name.length !== 0}
                                        errorMessage={this.props.awardValidationErrors.name}
                                        onChange={this.props.onChange}
                                        onBlur={this.props.onBlur}
                                        onFocus={this.props.onFocus}
                                    />
                                    <ControlledTextarea
                                        caption="Description for award"
                                        name="description"
                                        defaultValue={this.props.award.description}
                                        isError={this.props.awardValidationErrors.description.length !== 0}
                                        errorMessage={this.props.awardValidationErrors.description}
                                        rowCount={3}
                                        onChange={this.props.onChange}
                                        onBlur={this.props.onBlur}
                                        onFocus={this.props.onFocus}
                                    />
                                    <MDBRow className="justify-content-center">
                                        <SumbitButton 
                                            onClick={this.props.onSubmit}
                                            innerContent={this.props.submitButtonCaption}
                                            isLoading={this.props.isSaving}
                                        />
                                    </MDBRow>
                                    <MDBRow className="justify-content-center">
                                        <MDBBtn size="sm" color="red" onClick={this.props.goToList}>
                                           To list
                                        </MDBBtn>
                                    </MDBRow>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
        
AwardForm.propTypes = {
    award: PropTypes.instanceOf(Object),
    awardValidationErrors: PropTypes.instanceOf(Object),
    goToList: PropTypes.func,
    formName: PropTypes.string,
    isSaving: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    submitButtonCaption: PropTypes.string
};

export default AwardForm;