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

import {
  fetchAssets,
  fetchCategories,
  refreshAfterError,
} from './methods/methods';

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    assets: [],
    loading: true,
    error: null,
    categories: [],
  });

  useEffect(() => {
    fetchAssets(dispatch);
    fetchCategories(dispatch);
  }, []);

  return (
    <BrowserRouter>
      <Container>
        <NavigationBar />
        <Switch>
          <Route path='/about' component={About} />
          <Route exact path='/'>
            <Tabs defaultActiveKey='assets' id='tabs'>
              <Tab eventKey='assets' title='Assets'>
                <Assets
                  assets={state.assets}
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
                <ByLocation />
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
