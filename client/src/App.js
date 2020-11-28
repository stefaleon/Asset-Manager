import { useReducer, useEffect } from 'react';
import { Container, Tabs, Tab, Jumbotron } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import reducer from './reducers/reducer';

import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import About from './components/About';
import Assets from './components/Assets';
import ByCategory from './components/ByCategory';
import ByLocation from './components/ByLocation';
import Search from './components/Search';
import PaginationButtons from './components/PaginationButtons';
import ManageAssets from './components/ManageAssets';
import AssetForm from './components/AssetForm';
import ManageCategories from './components/ManageCategories';
import CategoryForm from './components/CategoryForm';

import {
  fetchAssets,
  fetchCategories,
  fetchLocations,
  refreshAfterError,
  fetchFilteredAssets,
  changeSearchTerm,
  setPage,
  addAsset,
  updateAsset,
  deleteAsset,
  fetchFilteredCategories,
  changeCategorySearchTerm,
  addCategory,
  updateCategory,
  deleteCategory,
} from './methods/methods';

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    assets: [],
    categories: [],
    locations: [],
    loading: true,
    error: null,
    searchTerm: '',
    filteredAssets: [],
    numberOfPages: 1,
    page: 1,
    categorySearchTerm: '',
    filteredCategories: [],
  });

  useEffect(() => {
    fetchAssets(dispatch);
    fetchCategories(dispatch);
    fetchLocations(dispatch);
  }, []);

  useEffect(() => {
    fetchFilteredAssets(dispatch, state.searchTerm, state.page);
  }, [state.searchTerm, state.page]);

  useEffect(() => {
    fetchFilteredCategories(dispatch, state.categorySearchTerm);
  }, [state.categorySearchTerm]);

  return (
    <BrowserRouter>
      <Container>
        <NavigationBar />
        <Switch>
          <Route path='/about' component={About} />

          <Route exact path='/'>
            <Tabs defaultActiveKey='assets' id='tabs'>
              <Tab eventKey='assets' title='Assets'>
                <Search
                  searchTerm={state.searchTerm}
                  dispatch={dispatch}
                  changeSearchTerm={changeSearchTerm}
                />
                <Assets
                  assets={state.filteredAssets}
                  loading={state.loading}
                  error={state.error}
                  dispatch={dispatch}
                  refreshAfterError={refreshAfterError}
                />
                <Jumbotron>
                  <PaginationButtons
                    numberOfPages={state.numberOfPages}
                    page={state.page}
                    setPage={setPage}
                    dispatch={dispatch}
                  />
                </Jumbotron>
              </Tab>
              <Tab eventKey='by-category' title='ByCategory'>
                <ByCategory
                  assets={state.assets}
                  categories={state.categories}
                  loading={state.loading}
                  error={state.error}
                />
              </Tab>
              <Tab eventKey='by-location' title='ByLocation'>
                <ByLocation
                  assets={state.assets}
                  locations={state.locations}
                  loading={state.loading}
                  error={state.error}
                />
              </Tab>
            </Tabs>
          </Route>

          <Route path='/assets'>
            <ManageAssets
              assets={state.filteredAssets}
              loading={state.loading}
              error={state.error}
              dispatch={dispatch}
              refreshAfterError={refreshAfterError}
              searchTerm={state.searchTerm}
              changeSearchTerm={changeSearchTerm}
              deleteAsset={deleteAsset}
            />
            <Jumbotron>
              <PaginationButtons
                numberOfPages={state.numberOfPages}
                page={state.page}
                setPage={setPage}
                dispatch={dispatch}
              />
            </Jumbotron>
          </Route>

          <Route
            path='/asset'
            exact
            render={(props) => (
              <AssetForm
                {...props}
                create={true}
                categories={state.categories}
                locations={state.locations}
                dispatch={dispatch}
                addAsset={addAsset}
              />
            )}
          />

          <Route
            path='/asset/:id'
            render={(props) => (
              <AssetForm
                {...props}
                create={false}
                assetToUpdate={state.assets.find(
                  (x) => x._id === props.match.params.id
                )}
                categories={state.categories}
                locations={state.locations}
                dispatch={dispatch}
                updateAsset={updateAsset}
              />
            )}
          />

          <Route path='/categories'>
            <ManageCategories
              categories={state.filteredCategories}
              loading={state.loading}
              error={state.error}
              dispatch={dispatch}
              refreshAfterError={refreshAfterError}
              searchTerm={state.categorySearchTerm}
              changeSearchTerm={changeCategorySearchTerm}
              deleteCategory={deleteCategory}
            />
          </Route>

          <Route
            path='/category'
            exact
            render={(props) => (
              <CategoryForm
                {...props}
                create={true}
                dispatch={dispatch}
                addCategory={addCategory}
              />
            )}
          />

          <Route
            path='/category/:id'
            render={(props) => (
              <CategoryForm
                {...props}
                create={false}
                categoryToUpdate={state.categories.find(
                  (x) => x._id === props.match.params.id
                )}
                dispatch={dispatch}
                updateCategory={updateCategory}
              />
            )}
          />

          <Route path='/*' component={NotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
