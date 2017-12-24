import { handleActions } from 'redux-actions';
import {
  STORE_DETAILS,
  STORE_EXP_DATA,
  STORE_SCALE_VALUES,
  STORE_WORKLOAD_VALUES,
} from '../actions';

const defaultState = {};

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
      'Mental Demand': action.payload.scale.mental,
      'Physical Demand': action.payload.scale.physical,
      'Temporal Demand': action.payload.scale.temporal,
      Performance: action.payload.scale.performance,
      Effort: action.payload.scale.effort,
      'Frustration Level': action.payload.scale.frustration,
    },
  }),

  [STORE_WORKLOAD_VALUES]: (state, action) => Object.assign({}, state, {
    workload: {
      'Mental Demand': action.payload.workload.mental,
      'Physical Demand': action.payload.workload.physical,
      'Temporal Demand': action.payload.workload.temporal,
      Performance: action.payload.workload.performance,
      Effort: action.payload.workload.effort,
      'Frustration Level': action.payload.workload.frustration,
    },
  }),

}, defaultState);
