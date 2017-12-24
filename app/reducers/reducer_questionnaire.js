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

  [STORE_DETAILS]: (state, action) => Object.assign({}, state, action.payload),

  [STORE_SCALE_VALUES]: (state, action) => Object.assign({}, state, action.payload),

  [STORE_WORKLOAD_VALUES]: (state, action) => Object.assign({}, state, action.payload),

}, defaultState);
