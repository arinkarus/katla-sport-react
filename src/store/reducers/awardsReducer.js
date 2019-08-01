import { awardConstants } from '../../types/awardConstants';

export function awards(state = {}, action) {
    switch (action.type) {
        case awardConstants.GET_ALL_AWARDS_REQUEST: {
            return { ...state, loading: true };
        }

        case awardConstants.GET_ALL_AWARDS_SUCCESS: {
            return { ...state, loading: false, awards: action.awards };
        }

        case awardConstants.DELETE_AWARD_SUCCESS: {
            return { ...state, awards: state.awards.filter(a => a.id !== action.id) };
        }

        default: {
            return state;
        }
    }
}