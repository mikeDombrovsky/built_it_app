import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'
import {Sign_In} from './components/Sign_In'
import {Sign_up} from './components/Sign_up'
import {useAuth} from "./hooks/AuthProvider";
import {useEffect} from "react";
import logo from './logo.png';
import {ChangePassword} from "./components/ChangePassword";
import {Profile} from "./components/Profile";

function App() {
    const {token, refresh, refreshTokens, verifyToken, logOut} = useAuth();

    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={'/'}>
                            <img src={logo} alt="logo" width="200px"/>
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                {token ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={'/profile'}>
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <button className="nav-link" onClick={logOut}>Log out</button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={'/sign-in'}>
                                                Sign in
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={'/sign-up'}>
                                                Sign up
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route exact path="/profile" element={token ? <Profile/> : <Navigate to="/sign-in"/>}/>
                    <Route exact path="/" element={<h1>Home</h1>}/>
                    <Route path="/sign-in" element={!token ? <Sign_In/> : <Navigate to="/profile"/>}/>
                    <Route path="/sign-up" element={!token ? <Sign_up/> : <Navigate to="/profile"/>}/>
                    <Route path="/change-password" element={<ChangePassword/>}/>
                </Routes>

            </div>
        </Router>
    );
}

export default App;
