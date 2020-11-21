const reducer = (state, action) => {
  switch (action.type) {
    case 'fetch-assets-request':
    case 'fetch-categories-request':
      return { ...state, loading: action.loading };
    case 'fetch-assets-ok':
      return { ...state, assets: action.assets, loading: action.loading };
    case 'fetch-categories-ok':
      return {
        ...state,
        categories: action.categories,
        loading: action.loading,
      };
    case 'fetch-assets-fail':
    case 'fetch-categories-fail':
      return { ...state, loading: action.loading, error: action.error };
    default:
      return state;
  }
};

export default reducer;
