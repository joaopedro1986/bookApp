
import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home"
import Header from "./components/Header"
import FavoritePage from "./pages/FavoritePage"

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
         <Route exact path ="/">
          <Home />
        </Route><Route exact path ="/Favorite">
          <FavoritePage />
        </Route>
      </Switch>
       
    </div>
  );
}

export default App;
