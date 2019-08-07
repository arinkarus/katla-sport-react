import { awardConstants } from '../../types/awardConstants';

export function awards(state = {}, action) {
    switch (action.type) {
        case awardConstants.GET_ALL_AWARDS_REQUEST: {
            return { loading: true };
        }

        case awardConstants.GET_ALL_AWARDS_SUCCESS: {
            return { awards: action.awards };
        }

        case awardConstants.DELETE_AWARD_SUCCESS: {
            return { ...state, awards: state.awards.filter(a => a.id !== action.awardId) };
        }

        case awardConstants.CREATE_AWARD_REQUEST: {
            return { ...state, isCreating: true };
        }

        case awardConstants.CREATE_AWARD_SUCCESS: {
            return { ...state, isCreating: false };
        }

        case awardConstants.UPDATE_AWARD_REQUEST: {
            return { ...state, isSaving: true };
        }

        case awardConstants.UPDATE_AWARD_SUCCESS: {
            return { ...state, isSaving: false };
        }

        case awardConstants.GET_AWARD_REQUEST: {
            return { ...state, loading: true };
        }

        case awardConstants.GET_AWARD_SUCCESS: {
            return { award: action.award };
        }

        case awardConstants.UPDATE_AWARD_FIELD: {
            let award = state.award;
            award[action.fieldState.name] = action.fieldState.value;
            return { ...state, award: award };
        }

        default: {
            return state;
        }
    }
}