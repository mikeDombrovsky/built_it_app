import {useAuth} from "../hooks/AuthProvider";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const ChangePassword = () => {
    // const {logIn} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')

    const onChange = e => {
        setEmail(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();
        alert("New password sent to your email: ." + email + "\n" +
            "If you don't receive it, please check your spam folder.\n" +
            "Have a nice day!");
        // sendNewPass(email);
        navigate('/sign-in')
    }
    return (
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
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Send new password
                </button>
            </div>
        </form>
    )
}