import React from 'react';
import { connect } from 'react-redux';
import {
    MDBContainer
} from 'mdbreact';
import history from '../../utils/history';
import AwardForm from '../../components/forms/AwardForm';
import { awardValidator } from '../../utils/validation/formValidators/awardValidator';
import { isFormValid } from '../../utils/validation/validationFunctions';
import { awardActions } from '../../actions/awardActions';

class CreateAwardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            award: {
                name: "",
                description: ""
            },
            awardErrors: {
                name: "",
                description: ""
            }
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnSubmitForm = this.handleOnSubmitForm.bind(this);
    }

    handleOnChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        const { award } = this.state;
        this.setState({
            award: {
                ...award,
                [name]: value
            }
        });
    }

    handleGoToList()  {
        history.push("/awards");
    }

    handleOnBlur(event) {
        const { name, value } = event.target;
        const errorValue = awardValidator[name](value);
        let awardErrors = this.state.awardErrors;
        awardErrors[name] = errorValue;
        this.setState({
            awardErrors: Object.create(awardErrors)
        });
    }

    handleOnFocus(event) {
        const name = event.target.name;
        let awardErrors = this.state.awardErrors;
        awardErrors[name] = "";
        this.setState({
            awardErrors: Object.create(awardErrors)
        });
    }

    goBackToList() {
       history.push("/awards");
    } 

    handleOnSubmitForm(e) {
        e.preventDefault();
        const { award, awardErrors } = this.state; 
        Object.keys(award).forEach(key => {
            awardErrors[key] = awardValidator[key](award[key]);
        });
        if (isFormValid(awardErrors)) {
            this.props.createAward(this.state.award);
        }
        this.setState({
            awardErrors: Object.create(awardErrors)
        });
    }

    render() {
        return (
            <MDBContainer>
                <AwardForm
                    onSubmit={this.handleOnSubmitForm}
                    onFocus={this.handleOnFocus}
                    onChange={this.handleOnChange}
                    onBlur={this.handleOnBlur}
                    formName="Create new award"
                    award={this.state.award}
                    isSaving={this.props.isCreating}
                    submitButtonCaption="Submit creating"
                    goToList={this.handleGoToList}
                    awardValidationErrors={this.state.awardErrors} />
            </MDBContainer>
        );
    }
}

function mapStateToProps(state) {
    const { isCreating } = state.awards; 
    return {
        isCreating
    };
}

export default connect(mapStateToProps, awardActions)(CreateAwardPage);