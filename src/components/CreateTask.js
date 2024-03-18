import {useAuth} from "../hooks/AuthProvider";
import {useEffect, useState} from "react";

export const CreateTask = () => {
    const {BASE_URL, token, refresh, refreshTokens, verifyToken, logOut} = useAuth();

    const [inputs, setInputs] = useState({
        title: '',
        phone_number: '',
        city: '',
        country: '',
        state_region: '',
        desc: '',
        image_srcs: [],
        task_images: []
    })

    const {
        title,
        phone_number,
        city,
        country,
        state_region,
        desc,
        task_images
    } = inputs;


    const fetchMyTasks = async () => {
        let response = await fetch(BASE_URL + 'api/tasks/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.status === 200) {
            let data = await response.json();
            console.log(
                data
            )
            setInputs({
                ...inputs,
                title: data.title,
                phone_number: data.phone_number,
                city: data.city,
                country: data.country,
                state_region: data.state_region,
                image_name: data.image,
                image_src: BASE_URL + data.image,
            })
        } else {
            console.log(response.status);
        }
    }

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onFileChange = e => {
        setInputs({
            ...inputs,
            image_files: e.target.files
        });
        console.log('files ', e.target.files);
    }

    const onSubmit = async e => {
        e.preventDefault();
        console.log(inputs);
        const formData = new FormData();
        if (task_images) {
            for (let i = 0; i < task_images.length; i++) {
                formData.append('image', task_images[i]);
            }
        }

        formData.append('title', title);
        formData.append('phone_number', phone_number);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('state_region', state_region);
        formData.append('desc', desc);
        console.log(formData);

        let response = await fetch(BASE_URL + 'api/task/', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: formData
        })
        if (response.status === 200) {
            let data = await response.json();
            console.log(data);
            // await fetchProfile();
        } else {
            console.log(response.status);
        }

    }

    return (

        <form onSubmit={onSubmit} className="container rounded bg-white mt-5 mb-5">
            <div className="row">

                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        {/*<img*/}
                        {/*    className="rounded-circle mt-5" width="150px"*/}
                        {/*    src={image_src}*/}
                        {/*    alt="profile"/>*/}
                        {/*<span className="font-weight-bold">{name === "" ? "Name" : name} {surname === "" ? "Surname" : surname}</span>*/}
                        <span className="text-black-50">{phone_number === "" ? "Phone number is not set" : phone_number}</span>
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12 d-flex flex-column align-items-start">
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
                            <div className="col-md-12 d-flex flex-column align-items-start">
                                <label className="labels">Phone number</label>
                                <input
                                    onChange={onChange}
                                    type="tel"
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    className="form-control"
                                    placeholder="Enter phone number like 058-456-7890"
                                    value={phone_number}
                                    name="phone_number"
                                    required
                                />
                            </div>
                            <div className="col-md-12 d-flex flex-column align-items-start">
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
                            <div className="col-md-6 d-flex flex-column align-items-start">
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
                            <div className="col-md-6 d-flex flex-column align-items-start">
                                <label className="labels">Region</label>
                                <input
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    value={state_region}
                                    placeholder="region"
                                    name="state_region"
                                />
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            <input type='submit' className="btn btn-primary profile-button" value="Save profile"/>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center experience mb-3">
                            <h4 className="text-right">Details</h4>
                        </div>

                        <div className="col-md-12 d-flex flex-column align-items-start">
                            <label className="labels">Bio</label>
                            <textarea
                                onChange={onChange}
                                className="form-control"
                                placeholder="description of the task"
                                value={desc}
                                name="desc"
                                rows="4" cols="30"/>
                        </div>
                        <br/>
                        <div className="col-md-12 d-flex flex-column align-items-start">
                            <label className="labels">Profile image</label>
                            <input
                                onChange={onFileChange}
                                type="file"
                                name="task_images"
                                accept="image/*"
                                multiple
                                className="form-control"
                                placeholder="task images"
                            />
                        </div>
                    </div>
                </div>
                <p>*To become a builder you need to fill all these fields for verification. For clients it's not
                    required but highly recommended</p>
            </div>
        </form>
    )
}