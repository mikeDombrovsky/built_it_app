import {useAuth} from "../hooks/AuthProvider";
import {useEffect, useState, useRef} from "react";
import Cookies from "js-cookie";

export const Sign_In = () => {
    const {logIn} = useAuth();
    const [remembered_email, setRememberedEmail] = useState(Cookies.get('email') ? Cookies.get('email') : null);
    const [inputs, setInputs] = useState({
        email: remembered_email ? remembered_email : '',
        password: ''
    })
    let remember_checkbox = useRef(remembered_email ? true : false);
    const {email, password} = inputs;

    useEffect(() => {
        if (remembered_email) {
            remember_checkbox.current.checked = true;
            setInputs({...inputs, email: remembered_email})
        }
    }, []);

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        if (remember_checkbox.current.checked) {
            setRememberedEmail(email);
            Cookies.set('email', email);
        } else {
            setRememberedEmail(null);
            Cookies.remove('email');
        }
        logIn(email, password);
    }
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">

                <form onSubmit={onSubmit}>
                    <h3>Sign In</h3>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input onChange={onChange}
                               name="email"
                               type="email"
                               className="form-control"
                               placeholder="Enter email"
                               required
                               value={email}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input onChange={onChange}
                               name="password"
                               type="password"
                               className="form-control"
                               placeholder="Enter password"
                               required
                        />
                    </div>
                    <div className="mb-3">
                        <div className="custom-control custom-checkbox">
                            <input ref={remember_checkbox}
                                   type="checkbox"
                                   className="custom-control-input"
                                   id="customCheck1"
                                   name="remember_me"
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
                        Forgot <a href="/change-password">password?</a>
                    </p>
                </form>
            </div>
        </div>
    )
}