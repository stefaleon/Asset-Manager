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
    case 'change-category-search-term':
      return {
        ...state,
        categorySearchTerm: action.categorySearchTerm,
      };
    case 'fetch-assets-request':
    case 'fetch-filtered-assets-request':
    case 'fetch-categories-request':
    case 'fetch-locations-request':
    case 'add-asset-request':
    case 'update-asset-request':
    case 'delete-asset-request':
    case 'fetch-filtered-categories-request':
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
    case 'fetch-filtered-categories-ok':
      return {
        ...state,
        filteredCategories: action.filteredCategories,
        loading: action.loading,
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
    case 'update-asset-ok':
      return {
        ...state,
        assets: state.assets.map((x) =>
          x._id === action.updatedAsset._id ? action.updatedAsset : x
        ),
        filteredAssets: state.filteredAssets.map((x) =>
          x._id === action.updatedAsset._id ? action.updatedAsset : x
        ),
        loading: action.loading,
      };
    case 'delete-asset-ok':
      return {
        ...state,
        assets: state.assets.filter((x) => x._id !== action.deletedId),
        filteredAssets: state.filteredAssets.filter(
          (x) => x._id !== action.deletedId
        ),
        loading: action.loading,
      };
    case 'fetch-assets-fail':
    case 'fetch-filtered-assets-fail':
    case 'fetch-categories-fail':
    case 'fetch-locations-fail':
    case 'add-asset-fail':
    case 'update-asset-fail':
    case 'delete-asset-fail':
    case 'fetch-filtered-categories-fail':
      return { ...state, loading: action.loading, error: action.error };
    case 'refresh-after-error':
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default reducer;
