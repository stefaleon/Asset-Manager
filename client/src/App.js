import { useReducer, useEffect } from 'react';
import { Container, Tabs, Tab, Jumbotron } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';

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
import ManageLocations from './components/ManageLocations';
import LocationForm from './components/LocationForm';
import LoginForm from './components/LoginForm';

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
  fetchFilteredLocations,
  changeLocationSearchTerm,
  addLocation,
  updateLocation,
  deleteLocation,
  setToken,
  loginUser,
  logoutUser,
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
    locationSearchTerm: '',
    filteredLocations: [],
    token: localStorage.getItem('token'),
    loggedUserId: jwt.decode(localStorage.getItem('token'))?.id,
    username: jwt.decode(localStorage.getItem('token'))?.name,
    admin: jwt.decode(localStorage.getItem('token'))?.admin,
  });

  setToken(state.token); // set headers again after page reloads

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

  useEffect(() => {
    fetchFilteredLocations(dispatch, state.locationSearchTerm);
  }, [state.locationSearchTerm]);

  return (
    <BrowserRouter>
      <Container>
        <NavigationBar
          token={state.token}
          username={state.username}
          admin={state.admin}
          dispatch={dispatch}
          logoutUser={logoutUser}
        />
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

          <Route path='/locations'>
            <ManageLocations
              locations={state.filteredLocations}
              loading={state.loading}
              error={state.error}
              dispatch={dispatch}
              refreshAfterError={refreshAfterError}
              searchTerm={state.locationSearchTerm}
              changeSearchTerm={changeLocationSearchTerm}
              deleteLocation={deleteLocation}
            />
          </Route>

          <Route
            path='/location'
            exact
            render={(props) => (
              <LocationForm
                {...props}
                create={true}
                dispatch={dispatch}
                addLocation={addLocation}
              />
            )}
          />

          <Route
            path='/location/:id'
            render={(props) => (
              <LocationForm
                {...props}
                create={false}
                locationToUpdate={state.locations.find(
                  (x) => x._id === props.match.params.id
                )}
                dispatch={dispatch}
                updateLocation={updateLocation}
              />
            )}
          />

          <Route
            path='/login'
            exact
            render={(props) => (
              <LoginForm {...props} dispatch={dispatch} loginUser={loginUser} />
            )}
          />

          <Route path='/*' component={NotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
