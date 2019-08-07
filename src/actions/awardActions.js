import { awardService } from '../services/awardService';
import { awardConstants } from '../types/awardConstants';
import history from '../utils/history';

export const awardActions = {
    getAllAwards,
    getAwardById,
    createAward,
    deleteAward,
    updateAward,
    updateAwardField
};

function getAllAwards() {
    return dispatch => {
        dispatch(request());
        awardService.getAll()
            .then(
                awards => {
                    dispatch(success(awards));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: awardConstants.GET_ALL_AWARDS_REQUEST }; }
    function success(awards) { return { type: awardConstants.GET_ALL_AWARDS_SUCCESS, awards }; }
    function failure(error) { return { type: awardConstants.GET_ALL_AWARDS_FAILURE, error }; }
}

function getAwardById(awardId) {
    return dispatch => {
        dispatch(request());
        awardService.getById(awardId)
            .then(
                award => {
                    dispatch(success(award));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: awardConstants.GET_AWARD_REQUEST }; }
    function success(award) { return { type: awardConstants.GET_AWARD_SUCCESS, award }; }
    function failure(error) { return { type: awardConstants.GET_AWARD_FAILURE, error }; }
}

function createAward(award) {
    return dispatch => {
        dispatch(request());
        awardService.create(award)
            .then(
                award => {
                    dispatch(success(award));
                    history.push("/awards");
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: awardConstants.CREATE_AWARD_REQUEST }; }
    function success(award) { return { type: awardConstants.CREATE_AWARD_SUCCESS, award }; }
    function failure(error) { return { type: awardConstants.CREATE_AWARD_FAILURE, error }; } 
}

function updateAward(awardId, award) {
    return dispatch => {
        dispatch(request());
        awardService.update(awardId, award)
            .then(
                result => {
                    dispatch(success());
                    history.push(`/awards/${awardId}`);
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: awardConstants.UPDATE_AWARD_REQUEST }; }
    function success() { return { type: awardConstants.UPDATE_AWARD_SUCCESS }; }
    function failure(error) { return { type: awardConstants.UPDATE_AWARD_FAILURE, error }; } 
}

function deleteAward(awardId) {
    return dispatch => {
        dispatch(request());
        awardService._delete(awardId)
            .then(
                result => dispatch(success(awardId)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: awardConstants.DELETE_AWARD_REQUEST }; }
    function success(awardId) { return { type: awardConstants.DELETE_AWARD_SUCCESS, awardId }; }
    function failure(error) { return { type: awardConstants.DELETE_AWARD_FAILURE, error }; }
}

function updateAwardField(fieldName, value) {
    const fieldState = { name: fieldName, value: value };
    return { type: awardConstants.UPDATE_AWARD_FIELD, fieldState };
}
