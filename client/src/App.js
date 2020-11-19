import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Container, Tabs, Tab } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import About from './components/About';
import Assets from './components/Assets';
import ByCategory from './components/ByCategory';
import ByLocation from './components/ByLocation';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <NavigationBar />
        <Switch>
          <Route path='/about' component={About} />
          <Route exact path='/'>
            <Tabs defaultActiveKey='assets' id='tabs'>
              <Tab eventKey='assets' title='Assets'>
                <Assets />
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
