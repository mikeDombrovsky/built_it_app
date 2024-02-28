// import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'
import {Login} from './components/Login'
import {Signup} from './components/Signup'
import {useAuth} from "./hooks/AuthProvider";
import {useEffect} from "react";

function App() {
    const {token, refresh, logIn, refreshTokens, verifyToken, logOut} = useAuth();

    useEffect(() => {
        const verify = async () => {
            try {
                verifyToken();
            } catch (err) {
                console.error('Error:', err);
                logOut();
            }
        };
        if (token) {
            verify();
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={'/sign-in'}>
                            Build it!
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/sign-in'}>
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/sign-up'}>
                                        Sign up
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Routes>
                            <Route exact path="/profile" element={token ? <h1>Profile</h1> : <Login/>}/>
                            <Route exact path="/" element={<h1>Home</h1>}/>
                            <Route path="/sign-in" element={!token ? <Login/> : <Navigate to="/profile"/>}/>
                            <Route path="/sign-up" element={<Signup/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
