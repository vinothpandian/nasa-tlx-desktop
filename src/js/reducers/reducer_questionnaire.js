import { handleActions } from 'redux-actions';
import { STORE_DETAILS, STORE_EXP_DATA, STORE_SCALE_VALUES } from '../actions';

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

  [STORE_SCALE_VALUES]: (state, action) => Object.assign({}, state, {
    scale: {
      'Mental Demand': action.payload.mental,
      'Physical Demand': action.payload.physical,
      'Temporal Demand': action.payload.temporal,
      Performance: action.payload.performance,
      Effort: action.payload.effort,
      'Frustration Level': action.payload.frustration,
    },
  }),

}, {});
