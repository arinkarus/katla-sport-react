import React from 'react';
import { connect } from 'react-redux';
import {
    MDBContainer
} from 'mdbreact';
import history from '../../utils/history';
import AwardForm from '../../components/forms/AwardForm';
import LoadingGif from '../../components/loading/LoadingGif';
import { awardActions } from '../../actions/awardActions';
import { awardValidator } from '../../utils/validation/formValidators/awardValidator';
import { isFormValid } from '../../utils/validation/validationFunctions';

class EditAwardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            awardErrors: {
                name: "",
                description: ""
            }
        };
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleOnSubmitForm = this.handleOnSubmitForm.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount() {
        const awardId = this.props.match.params.id;
        this.props.getAwardById(awardId);
    }

    goBackToList() {
       history.push("/awards");
    } 

    handleOnSubmitForm(event) {
        event.preventDefault();
        const { awardErrors } = this.state;
        const award = this.props.award;
        Object.keys(award).forEach(key => {
            awardErrors[key] = awardValidator[key](award[key]);
        });
        const awardId = this.props.match.params.id;
        if (isFormValid(awardErrors)) {
            this.props.updateAward(awardId, this.props.award);
        }
        this.setState({
            awardErrors: Object.create(awardErrors)
        });
    }

    handleOnChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.props.updateAwardField(name, value);
    } 

    handleOnFocus(event) {
        const name = event.target.name;
        let awardErrors = this.state.awardErrors;
        awardErrors[name] = "";
        this.setState({
            awardErrors: Object.create(awardErrors)
        });
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

    handleGoToList() {
        history.push("/awards");
    }

    render() {
        return (
            <MDBContainer>
                {this.props.loading &&
                    <LoadingGif/>
                }
                {(!this.props.loading && this.props.award) &&
                    <AwardForm
                        onSubmit={this.handleOnSubmitForm}
                        onFocus={this.handleOnFocus}
                        onChange={this.handleOnChange}
                        onBlur={this.handleOnBlur}
                        formName="Edit award"
                        award={this.props.award}
                        isSaving={this.props.isSaving}
                        goToList={this.handleGoToList}
                        submitButtonCaption="Submit editing"
                        awardValidationErrors={this.state.awardErrors} />
                }
            </MDBContainer>
        );
    }
}

function mapStateToProps(state) {
    const { loading, award, isSaving } = state.awards;
    return {
        loading, award, isSaving
    };
}

export default connect(mapStateToProps, awardActions)(EditAwardPage);