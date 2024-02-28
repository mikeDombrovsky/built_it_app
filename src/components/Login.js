import {useAuth} from "../hooks/AuthProvider";
import {useState} from "react";

export const Login = () => {
    const {login} = useAuth();
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    })
    const {username, password} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        login(username, password);
    }
    return (
        <form onSubmit={onSubmit}>
            <h3>Sign In</h3>
            <div className="mb-3">
                <label>Email address</label>
                <input onChange={onChange}
                       type="email"
                       className="form-control"
                       placeholder="Enter email"
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input onChange={onChange}
                       type="password"
                       className="form-control"
                       placeholder="Enter password"
                />
            </div>
            <div className="mb-3">
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                        Remember me
                    </label>
                </div>
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    )
}