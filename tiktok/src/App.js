import './App.css';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Upload from './pages/Upload';
import Home from './pages/Home';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header/>
        <Switch>
          <Route path="/upload" component={Upload}/> 
          <Route exact path="/" component={Home}/> 
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
