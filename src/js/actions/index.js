import { createActions } from 'redux-actions';

export const STORE_EXP_DATA = 'STORE_EXP_DATA';
export const STORE_DETAILS = 'STORE_DETAILS';
export const STORE_SCALE_VALUES = 'STORE_SCALE_VALUES';
export const STORE_WORKLOAD_VALUES = 'STORE_WORKLOAD_VALUES';

export const storeData = createActions({

  [STORE_EXP_DATA]: (expID, partID) => ({
    id: Date.now(),
    expID,
    partID,
  }),

  [STORE_DETAILS]: details => ({
    ageGroup: details.ageGroup,
    genderGroup: details.genderGroup,
    experienceGroup: details.experienceGroup,
  }),

  [STORE_SCALE_VALUES]: scale => ({ scale }),

  [STORE_WORKLOAD_VALUES]: workload => ({ workload }),

});
