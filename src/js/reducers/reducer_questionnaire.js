import { handleActions } from 'redux-actions';
import { STORE_DETAILS, STORE_EXP_DATA } from '../actions';

export default handleActions({

  [STORE_EXP_DATA]: (state, action) => ({
    id: action.payload.id,
    experimentID: action.payload.expID,
    participantID: action.payload.partID,
  }),

  [STORE_DETAILS]: (state, action) => Object.assign({}, state, {
    age: action.payload.ageGroup,
    gender: action.payload.genderGroup,
    experience: action.payload.experienceGroup,
  }),

}, {});
