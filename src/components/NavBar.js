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
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/find-job'}>
                                        Find job
                                    </Link>
                                </li>
                            </>
                            {token ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/create-job'}>
                                            Create job
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