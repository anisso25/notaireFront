import { handleActions } from '~/utils/redux-actions';
import {
  fetchGeneralDataProcess,
  fetchGeneralDataError,
  fetchGeneralDataSuccess,

  // Entities
  fetchEntitiesListProcess,
  fetchEntitiesListError,
  fetchEntitiesListSuccess,
} from './actions';

const defaultState = {
  isFetching: false,
  error: false,
  wilayas: [],
  countries: [],
  categories: [],
  entities: [],
};

export default handleActions({
  /* *
  * Fetch General Data
  * */
  [fetchGeneralDataProcess]: draftState => {
    draftState.isFetching = true;
    draftState.error = false;
  },
  [fetchGeneralDataError]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = payload;
  },
  [fetchGeneralDataSuccess]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = false;
    draftState.wilayas = payload?.wilayas?.map(item => ({
      value: item.id,
      name: item.name,
    })) || [];
    draftState.countries = payload?.countries?.map(item => ({
      value: item.id,
      name: item.name,
    })) || [];
    draftState.categories = payload?.categories || [];
  },

  /* * * * * * * * * *
   * Entities
  * * * * * * * * * */
  [fetchEntitiesListProcess]: draftState => {
    draftState.isFetching = true;
    draftState.error = false;
  },
  [fetchEntitiesListError]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = payload;
  },
  [fetchEntitiesListSuccess]: (draftState, { payload }) => {
    draftState.isFetching = false;
    draftState.error = false;
    draftState.entities = payload;
  },
},
defaultState);
