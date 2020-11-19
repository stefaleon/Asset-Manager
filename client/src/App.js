import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <NavigationBar />
        <Switch>
          <Route path='/about' component={About} />
          <Route exact path='/'>
            <div>Root</div>
          </Route>
          <Route path='/*' component={NotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
