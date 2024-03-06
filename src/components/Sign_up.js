import {useAuth} from "../hooks/AuthProvider";
import {useState} from "react";

export const Sign_up = () => {
    const {register} = useAuth();
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: ''
    })
    const {username, email, password} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        register(username, email, password);
    }

    return (
        <div className="auth-wrapper">

            <div className="auth-inner">
                <form onSubmit={onSubmit}>
                    <h3>Sign Up</h3>
                    <div className="mb-3">
                        <label>Username</label>
                        <input
                            onChange={onChange}
                            name="username"
                            type="text"
                            className="form-control"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            onChange={onChange}
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            onChange={onChange}
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Already registered <a href="/sign-in">sign in?</a>
                    </p>
                </form>
            </div>
        </div>
    )
}