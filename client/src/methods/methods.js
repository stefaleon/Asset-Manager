import axios from 'axios';

const LIMIT = 10;

export const setPage = (dispatch, page) => {
  dispatch({ type: 'set-page', page });
};

export const changeSearchTerm = (dispatch, term) => {
  dispatch({ type: 'change-search-term', searchTerm: term, page: 1 });
};

export const changeCategorySearchTerm = (dispatch, term) => {
  dispatch({ type: 'change-category-search-term', categorySearchTerm: term });
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

export const fetchFilteredCategories = async (dispatch, term) => {
  try {
    dispatch({ type: 'fetch-filtered-categories-request', loading: true });
    const { data } = await axios.get(`/api/categories?search=${term}`);
    console.log('in fetchFilteredCategories - data.data is:', data.data);
    dispatch({
      type: 'fetch-filtered-categories-ok',
      filteredCategories: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'fetch-filtered-categories-fail', loading: false, error });
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

export const updateAsset = async (dispatch, id, postData) => {
  try {
    dispatch({ type: 'update-asset-request', loading: true });
    const { data } = await axios.patch(`/api/assets/${id}`, postData);
    console.log('in updateAsset - data.data is:', data.data);
    dispatch({
      type: 'update-asset-ok',
      updatedAsset: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'update-asset-fail', loading: false, error });
  }
};

export const deleteAsset = async (dispatch, id) => {
  try {
    dispatch({ type: 'delete-asset-request', loading: true });
    await axios.delete(`/api/assets/${id}`);
    dispatch({ type: 'delete-asset-ok', deletedId: id, loading: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'delete-asset-fail', loading: false, error });
  }
};

export const addCategory = async (dispatch, postData) => {
  try {
    dispatch({ type: 'add-category-request', loading: true });
    const { data } = await axios.post('/api/categories', postData);
    console.log('in addCategory - data.data is:', data.data);
    dispatch({
      type: 'add-category-ok',
      newCategory: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'add-category-fail', loading: false, error });
  }
};

export const updateCategory = async (dispatch, id, postData) => {
  try {
    dispatch({ type: 'update-category-request', loading: true });
    const { data } = await axios.patch(`/api/categories/${id}`, postData);
    console.log('in updateCategory - data.data is:', data.data);
    dispatch({
      type: 'update-category-ok',
      updatedCategory: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'update-category-fail', loading: false, error });
  }
};

export const deleteCategory = async (dispatch, id) => {
  try {
    dispatch({ type: 'delete-category-request', loading: true });
    await axios.delete(`/api/categories/${id}`);
    dispatch({ type: 'delete-category-ok', deletedId: id, loading: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'delete-category-fail', loading: false, error });
  }
};
