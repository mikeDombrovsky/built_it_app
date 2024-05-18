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
import {Home} from "./components/Home";
import {NavBar} from "./components/NavBar";
import {CreateTask} from "./components/CreateTask";
import {Tasks} from "./components/Tasks";

function App() {
    const {token} = useAuth();

    return (
        <Router>
            <div className="App">
                <NavBar/>
                <Routes>
                    <Route exact path="/profile" element={token ? <Profile/> : <Navigate to="/sign-in"/>}/>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/sign-in" element={!token ? <Sign_In/> : <Navigate to="/profile"/>}/>
                    <Route path="/sign-up" element={!token ? <Sign_up/> : <Navigate to="/profile"/>}/>
                    <Route path="/change-password" element={<ChangePassword/>}/>
                    <Route path={'/tasks'} element={token ? <Tasks/> : <Navigate to="/sign-in"/>}/>
                    <Route path={'/create-task'} element={token ? <CreateTask/> : <Navigate to="/sign-in"/>}/>
                    <Route path={'*'} element={<Navigate to="/"/>}/>
                </Routes>

            </div>
        </Router>
    );
}

export default App;
