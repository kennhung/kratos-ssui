import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Error from './pages/error';
import Registration from './pages/registration';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/error">
                        <Error />
                    </Route>
                    <Route path="/auth/login">
                        <Login />
                    </Route>
                    <Route path="/auth/registration">
                        <Registration />
                    </Route>
                    <Route path="/auth/logout" render={() => {
                        window.location.href = "http://127.0.0.1:4433/self-service/browser/flows/logout";
                        return null;
                    }} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
