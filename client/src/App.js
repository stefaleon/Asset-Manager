import { useState, useEffect } from 'react';
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

function App() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAssets = async () => {
    try {
      const res = await axios.get('/api/assets');
      console.log(res.data.data);
      setAssets(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  const refreshAfterError = () => {
    setError(null);
  };

  useEffect(() => {
    fetchAssets();
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
                  assets={assets}
                  loading={loading}
                  error={error}
                  refreshAfterError={refreshAfterError}
                />
              </Tab>
              <Tab eventKey='by-category' title='ByCategory'>
                <ByCategory />
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
}

export default App;
