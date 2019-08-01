import { awardService } from '../services/awardService';
import { awardConstants } from '../types/awardConstants';

export const awardActions = {
    getAllAwards,
    getAwardById,
    createAward,
    deleteAward,
    updateAward
};

function getAllAwards() {
    return dispatch => {
        dispatch(request());
        awardService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: awardConstants.GET_ALL_AWARDS_REQUEST }; }
    function success(awards) { return { type: awardConstants.GET_ALL_AWARDS_SUCCESS, awards }; }
    function failure(error) { return { type: awardConstants.GET_ALL_AWARDS_FAILURE, error }; }
}

function getAwardById(awardId) {

}

function createAward(award) {

}

function updateAward(awardId, award) {

}

function deleteAward(awardId) {
    console.log("sss");
    return dispatch => {
        dispatch(request());
        awardService.delete(awardId)
            .then(
                result => dispatch(success(awardId)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: awardConstants.DELETE_AWARD_REQUEST }; }
    function success(awardId) { return { type: awardConstants.DELETE_AWARD_SUCCESS, awardId }; }
    function failure(error) { return { type: awardConstants.DELETE_AWARD_FAILURE, error }; }
}
