import axios from 'axios';

const LIMIT = 10;

export const setPage = (dispatch, page) => {
  dispatch({ type: 'set-page', page });
};

export const changeSearchTerm = (dispatch, term) => {
  dispatch({ type: 'change-search-term', searchTerm: term, page: 1 });
};

export const fetchAssets = async (dispatch) => {
  try {
    dispatch({ type: 'fetch-assets-request', loading: true });
    const { data } = await axios.get('/api/assets');
    console.log('in fetchAssets - data.data is:', data.data);
    dispatch({ type: 'fetch-assets-ok', assets: data.data, loading: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'fetch-assets-fail', loading: false, error });
  }
};

export const fetchFilteredAssets = async (dispatch, term, page) => {
  try {
    dispatch({ type: 'fetch-filtered-assets-request', loading: true });
    const { data } = await axios.get(
      `/api/assets?search=${term}&page=${page}&limit=${LIMIT}`
    );
    console.log('in fetchFilteredAssets - data.data is:', data.data);
    dispatch({
      type: 'fetch-filtered-assets-ok',
      filteredAssets: data.data,
      loading: false,
    });
    dispatch({
      type: 'set-number-of-pages',
      numberOfPages: Math.ceil(data.filtered / data.limit),
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'fetch-filtered-assets-fail', loading: false, error });
  }
};

export const fetchCategories = async (dispatch) => {
  try {
    dispatch({ type: 'fetch-categories-request', loading: true });
    const { data } = await axios.get('/api/categories');
    console.log('in fetchCategories - data.data is:', data.data);
    dispatch({
      type: 'fetch-categories-ok',
      categories: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'fetch-categories-fail', loading: false, error });
  }
};

export const fetchLocations = async (dispatch) => {
  try {
    dispatch({ type: 'fetch-loacations-request', loading: true });
    const { data } = await axios.get('/api/locations');
    console.log('in fetchLocations - data.data is:', data.data);
    dispatch({
      type: 'fetch-locations-ok',
      locations: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'fetch-locations-fail', loading: false, error });
  }
};

export const refreshAfterError = (dispatch) => {
  dispatch({ type: 'refresh-after-error', error: null });
};

export const addAsset = async (dispatch, postData) => {
  try {
    dispatch({ type: 'add-asset-request', loading: true });
    const { data } = await axios.post('/api/assets', postData);
    console.log('in addAsset - data.data is:', data.data);
    dispatch({ type: 'add-asset-ok', newAsset: data.data, loading: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'add-asset-fail', loading: false, error });
  }
};
