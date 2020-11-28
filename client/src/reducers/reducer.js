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
    case 'add-category-request':
    case 'update-category-request':
    case 'delete-category-request':
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
    case 'add-category-ok':
      return {
        ...state,
        categories: [action.newCategory, ...state.categories],
        filteredCategories: [action.newCategory, ...state.filteredCategories],
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
    case 'update-category-ok':
      return {
        ...state,
        categories: state.categories.map((x) =>
          x._id === action.updatedCategory._id ? action.updatedCategory : x
        ),
        filteredCategories: state.filteredCategories.map((x) =>
          x._id === action.updatedCategory._id ? action.updatedCategory : x
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
    case 'delete-category-ok':
      return {
        ...state,
        categories: state.categories.filter((x) => x._id !== action.deletedId),
        filteredCategories: state.filteredCategories.filter(
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
    case 'add-category-fail':
    case 'update-category-fail':
    case 'delete-category-fail':
      return { ...state, loading: action.loading, error: action.error };
    case 'refresh-after-error':
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default reducer;
