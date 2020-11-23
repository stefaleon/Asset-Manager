import { useReducer, useEffect } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
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

import {
  fetchAssets,
  fetchCategories,
  fetchLocations,
  refreshAfterError,
  fetchFilteredAssets,
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
  });

  useEffect(() => {
    fetchAssets(dispatch);
    fetchCategories(dispatch);
    fetchLocations(dispatch);
  }, []);

  useEffect(() => {
    fetchFilteredAssets(dispatch, state.searchTerm);
  }, [state.searchTerm]);

  return (
    <BrowserRouter>
      <Container>
        <NavigationBar />
        <Switch>
          <Route path='/about' component={About} />
          <Route exact path='/'>
            <Tabs defaultActiveKey='assets' id='tabs'>
              <Tab eventKey='assets' title='Assets'>
                <Search searchTerm={state.searchTerm} />
                <Assets
                  assets={state.filteredAssets}
                  loading={state.loading}
                  error={state.error}
                  dispatch={dispatch}
                  refreshAfterError={refreshAfterError}
                />
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
          <Route path='/*' component={NotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
