const reducer = (state, action) => {
  switch (action.type) {
    case 'set-page':
      return { ...state, page: action.page };
    case 'set-number-of-pages':
      return { ...state, numberOfPages: action.numberOfPages };
    case 'change-search-term':
      return {
        ...state,
        searchTerm: action.searchTerm,
        page: action.page,
      };
    case 'fetch-assets-request':
    case 'fetch-filtered-assets-request':
    case 'fetch-categories-request':
    case 'fetch-locations-request':
    case 'add-asset-request':
      return { ...state, loading: action.loading };
    case 'fetch-assets-ok':
      return {
        ...state,
        assets: action.assets,
        // loading: action.loading,
      };
    case 'fetch-filtered-assets-ok':
      return {
        ...state,
        filteredAssets: action.filteredAssets,
        loading: action.loading,
      };
    case 'fetch-categories-ok':
      return {
        ...state,
        categories: action.categories,
        // loading: action.loading,
      };
    case 'fetch-locations-ok':
      return {
        ...state,
        locations: action.locations,
        // loading: action.loading,
      };
    case 'add-asset-ok':
      return {
        ...state,
        assets: [action.newAsset, ...state.assets],
        filteredAssets: [action.newAsset, ...state.filteredAssets],
        loading: action.loading,
      };
    case 'fetch-assets-fail':
    case 'fetch-filtered-assets-fail':
    case 'fetch-categories-fail':
    case 'fetch-locations-fail':
    case 'add-asset-fail':
      return { ...state, loading: action.loading, error: action.error };
    case 'refresh-after-error':
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default reducer;
