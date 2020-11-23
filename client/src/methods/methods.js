import axios from 'axios';

export const changeSearchTerm = (dispatch, term) => {
  dispatch({ type: 'change-search-term', searchTerm: term });
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

export const fetchFilteredAssets = async (dispatch, term) => {
  try {
    dispatch({ type: 'fetch-filtered-assets-request', loading: true });
    const { data } = await axios.get(`/api/assetszz?search=${term}`);
    console.log('in fetchFilteredAssets - data.data is:', data.data);
    dispatch({
      type: 'fetch-filtered-assets-ok',
      filteredAssets: data.data,
      loading: false,
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
