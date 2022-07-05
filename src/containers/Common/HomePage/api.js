import axios from '~/lib/axios';

export const fetchGeneralData = async () => axios('/toolkit/general_data', { method: 'get' });

// Entity
export const fetchEntitiesList = async () => axios('/entities?withoutPagination=1', { method: 'get' });

