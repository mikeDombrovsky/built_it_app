import {Link} from "react-router-dom";
import logo from "../logo.png";
import {useAuth} from "../hooks/AuthProvider";

export const NavBar = () => {
    const {token, logOut} = useAuth();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/'}>
                        <img src={logo} alt="logo" width="200px"/>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/'}>
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/tasks'}>
                                        Find task
                                    </Link>
                                </li>
                            </>
                            {token ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/create-task'}>
                                            Create task
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link " to={'/profile'}>
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="nav-item align-self-end">
                                        <button className="nav-link ms-auto" onClick={logOut}>Log out</button>
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
            <div style={{height: "50px"}}></div>
        </>
    )
}