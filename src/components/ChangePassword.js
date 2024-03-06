import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const ChangePassword = () => {

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
        //TODO: implement sendNewPass function
        // sendNewPass(email);
        navigate('/sign-in')
    }
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={onSubmit}>
                    <h3>Password reset</h3>
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
            </div>
        </div>
    )
}