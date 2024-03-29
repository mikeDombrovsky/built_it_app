import {useAuth} from "../hooks/AuthProvider";
import {useEffect, useState} from "react";
import default_image from '../default.jpg';

export const Profile = () => {
    const {BASE_URL, token, verifyToken} = useAuth();

    const [inputs, setInputs] = useState({
        name: '',
        surname: '',
        title: '',
        phone_number: '',
        city: '',
        country: '',
        state_region: '',
        bio: '',
        image_name: 'default.jpg',
        image_src: BASE_URL + '/media/profile_pics/default.jpg',
        image_file: null
    })

    const {
        name,
        surname,
        title,
        phone_number,
        city,
        country,
        state_region,
        bio,
        image_src,
        image_name,
        image_file
    } = inputs;

    useEffect(() => {
        if (token) {
            verifyToken(token);
            fetchProfile();
        }


    }, []);

    const fetchProfile = async () => {
        let response = await fetch(BASE_URL + '/api/profile/', {
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
            // bug fix in render with extra slash in the end of the url
            let src = BASE_URL + data.image;
            if (BASE_URL === 'https://build-it-server.onrender.com/') {
                src = BASE_URL.slice(0, -1) + data.image;
                // bug fix for default image that render may delete from server
                // TODO
                // fix bug with removing images from server, they might be saved in the cookies
                if (data.image.endsWith('default.jpg')) {
                    src = default_image;
                }
            }


            setInputs({
                ...inputs,
                name: data.name,
                surname: data.surname,
                title: data.title,
                phone_number: data.phone_number,
                city: data.city,
                address: data.country,
                category: data.state_region,
                bio: data.bio,
                image_name: data.image,
                image_src: src,
            })
            console.log(BASE_URL, data.image, src);
        } else {
            console.log(response.status);
        }
    }

    const onChange = e => {
       if (e.target.name === 'phone_number') {
            if ( e.target.value.match('[0-9]{10}') ) {
                    e.target.value = e.target.value.slice(0, 3) +
                        '-' + e.target.value.slice(3, 6) +
                        '-' + e.target.value.slice(6);
            }
        }

        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onFileChange = e => {
        setInputs({
            ...inputs,
            image_file: e.target.files[0],
            image_name: e.target.files[0].name
        });
        console.log('file is ', e.target.files[0], image_name)
    }

    const onSubmit = async e => {
        e.preventDefault();
        console.log(inputs);
        const formData = new FormData();
        if (image_file) {
            formData.append('image', image_file);
        }
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('title', title);
        formData.append('phone_number', phone_number);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('state_region', state_region);
        formData.append('bio', bio);
        console.log(formData);

        let response = await fetch(BASE_URL + '/api/profile/', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: formData
        })
        if (response.status === 200) {
            let data = await response.json();
            console.log(data);
            await fetchProfile();
        } else {
            console.log(response.status);
        }

    }

    return (

        <form onSubmit={onSubmit} className="container rounded bg-white mt-5 mb-5">
            <div className="row">

                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img
                            className="rounded-circle mt-5" width="150px"
                            src={image_src}
                            alt="profile"/>
                        <span
                            className="font-weight-bold">{name === "" ? "Name" : name} {surname === "" ? "Surname" : surname}</span>
                        <span
                            className="text-black-50">{phone_number === "" ? "Phone number is not set" : phone_number}</span>
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6 d-flex flex-column align-items-start">
                                <label className="labels">Name</label>
                                <input
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="First name"
                                    value={name}
                                    name="name"
                                    required
                                />
                            </div>
                            <div className="col-md-6 d-flex flex-column align-items-start">
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
                                placeholder="Bio"
                                value={bio}
                                name="bio"
                                rows="4" cols="30"/>
                        </div>
                        <br/>
                        <div className="col-md-12 d-flex flex-column align-items-start">
                            <label className="labels">Profile image</label>
                            <input
                                onChange={onFileChange}
                                type="file"
                                name="profile_image"
                                accept="image/*"
                                className="form-control"
                                placeholder="profile image"
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