import {useAuth} from "../hooks/AuthProvider";

export const Profile = () => {
    const {token, refresh, refreshTokens, verifyToken, logOut} = useAuth();

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
                                <input type="text"
                                       className="form-control"
                                       placeholder="First name"
                                       value=""/>
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Surname</label>
                                <input type="text"
                                       className="form-control"
                                       value=""
                                       placeholder="Surname"/>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className="labels">Title</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Enter title of your profile if needed"
                                       value=""/>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Mobile Number</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Enter phone number"
                                       value=""/>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">City</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Enter your city"
                                       value=""/>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Occupation</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Enter your occupation"
                                       value=""/>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <label className="labels">Country</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="country"
                                       value=""/>
                            </div>
                            <div className="col-md-6">
                                <label className="labels">State/Region</label>
                                <input type="text"
                                       className="form-control"
                                       value=""
                                       placeholder="state"/>
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            <button className="btn btn-primary profile-button" type="button">Save Profile</button>
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
                                className="form-control" placeholder="Bio" value="" rows="4" cols="30"/>
                        </div>
                        <br/>
                        <div className="col-md-12">
                            <label className="labels">Profile image</label>
                            <input
                                type="file" className="form-control" placeholder="profile image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}