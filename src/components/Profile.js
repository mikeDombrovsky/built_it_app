import {useAuth} from "../hooks/AuthProvider";
import {useState} from "react";

export const Profile = () => {
    const {token, refresh, refreshTokens, verifyToken, logOut} = useAuth();

    const [inputs, setInputs] = useState({
        name: '',
        surname: '',
        title: '',
        mobile_number: '',
        city: '',
        country: '',
        region: '',
        bio: '',
        profile_image: ''
    })

    const {name, surname, title, mobile_number, city, country, region, bio, profile_image} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        // e.preventDefault();
        console.log(inputs);
    }

    return (

        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">

                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img
                            className="rounded-circle mt-5" width="150px"
                            src="https://bootdey.com/img/Content/avatar/avatar6.png"
                        />
                        <span className="font-weight-bold">Name Surname</span>
                        <span className="text-black-50">example@mail.com</span>
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels">Name</label>
                                <input
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="First name"
                                    value={name}
                                    name="name"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Surname</label>
                                <input
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    value={surname}
                                    placeholder="Surname"
                                    name="surname"
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className="labels">Title</label>
                                <input
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter title of your profile if needed"
                                    value={title}
                                    name="title"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Phone number</label>
                                <input
                                    onChange={onChange}
                                    type="tel"
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    className="form-control"
                                    placeholder="Enter phone number like 058-456-7890"
                                    value={mobile_number}
                                    name="mobile_number"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">City</label>
                                <input
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your city"
                                    value={city}
                                    name="city"
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <label className="labels">Country</label>
                                <input
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="country"
                                    value={country}
                                    name="country"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Region</label>
                                <input
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    value={region}
                                    placeholder="region"
                                    name="region"
                                />
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            <button className="btn btn-primary profile-button" type="button" onClick={onSubmit}>Save Profile</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center experience mb-3">
                            <h4 className="text-right">Details</h4>
                        </div>

                        <div className="col-md-12">
                            <label className="labels">Bio</label>
                            <textarea
                                onChange={onChange}
                                className="form-control"
                                placeholder="Bio"
                                value={bio}
                                name="bio"
                                rows="4" cols="30"/>
                        </div>
                        <br/>
                        <div className="col-md-12">
                            <label className="labels">Profile image</label>
                            <input
                                onChange={onChange}
                                type="file"
                                name="profile_image"
                                value={profile_image}
                                className="form-control"
                                placeholder="profile image"/>
                        </div>
                    </div>
                </div>
                <p>*To become a builder you need to fill all these fields for verification. For clients it's not required but highly recommended</p>
            </div>
        </div>
    )
}