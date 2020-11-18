import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <NavigationBar />
        <Switch>
          <Route exact path='/'>
            <div>Root</div>
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
