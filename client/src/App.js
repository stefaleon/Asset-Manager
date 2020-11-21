import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { Container, Tabs, Tab } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import About from './components/About';
import Assets from './components/Assets';
import ByCategory from './components/ByCategory';
import ByLocation from './components/ByLocation';

const fetchAssets = async (dispatch) => {
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

const fetchCategories = async (dispatch) => {
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

const refreshAfterError = (dispatch) => {
  dispatch({ type: 'refresh-after-error', error: null });
};

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
