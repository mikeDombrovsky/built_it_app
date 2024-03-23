import {useAuth} from "../hooks/AuthProvider";
import {useEffect, useState} from "react";

export const CreateTask = () => {
    const {BASE_URL, token, refresh, refreshTokens, verifyToken, logOut} = useAuth();

    const [inputs, setInputs] = useState({
        title: '',
        desc: '',
        category: '',
        budget: '',
        start_date: '',
        end_date: '',
        city: '',
        address: '',
        phone_number: '',
        image_srcs: [],
        task_images: []
    })

    const {
        title,
        phone_number,
        city,
        address,
        category,
        budget,
        start_date,
        end_date,
        desc,
        task_images
    } = inputs;


    // const fetchMyTasks = async () => {
    //     let response = await fetch(BASE_URL + 'api/tasks/', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token
    //         }
    //     })
    //     if (response.status === 200) {
    //         let data = await response.json();
    //         console.log(
    //             data
    //         )
    //         setInputs({
    //             ...inputs,
    //             title: data.title,
    //             phone_number: data.phone_number,
    //             city: data.city,
    //             country: data.country,
    //             state_region: data.state_region,
    //             image_name: data.image,
    //             image_src: BASE_URL + data.image,
    //         })
    //     } else {
    //         console.log(response.status);
    //     }
    // }

    const onChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onFileChange = e => {
        setInputs({
            ...inputs,
            task_images: e.target.files
        });
        console.log('files ', e.target.files);
    }

    const onSubmit = async e => {
        e.preventDefault();
        console.log(inputs);
        const formData = new FormData();
        if (task_images) {
            for (let i = 0; i < task_images.length; i++) {
                formData.append('attachments[]', task_images[i],);
            }
        }

        formData.append('title', title);
        formData.append('phone_number', phone_number);
        formData.append('address', city + ', ' + address);
        formData.append('budget', budget);
        formData.append('start_date', start_date);
        formData.append('end_date', end_date);
        formData.append('category', category);
        formData.append('description', desc);
        console.log(formData.toString());

        let response = await fetch(BASE_URL + 'api/task/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: formData
        })
        if (response.status === 200) {
            let data = await response.json();
            console.log(data);

        } else {
            console.log(response.status);
        }
    }

    return (

        <form onSubmit={onSubmit} className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-5 border-right">
                    <div className="pt-5 ps-3">
                        <div className="d-flex flex-column align-items-start">
                            <h4 className="text-right">Create new task</h4>
                            <p className="text-start">Fill all places with information for constractor that will contact
                                you with an offer.</p>
                        </div>
                    </div>
                </div>


            </div>
            <div className="row">
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="row">
                            <div className="col-md-12 d-flex flex-column align-items-start">
                                <label className="labels">Title</label>
                                <input
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter meaningful title of your task"
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
                                    placeholder="City where the task will take place"
                                    value={city}
                                    name="city"
                                />
                            </div>

                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6 d-flex flex-column align-items-start">
                                <label className="labels">Address</label>
                                <input
                                    onChange={onChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Wall street 1"
                                    value={address}
                                    name="address"
                                />
                            </div>
                            <div className="col-md-6 d-flex flex-column align-items-start">
                                <label className="labels">Category</label>
                                <select
                                    onChange={onChange}
                                    className="form-control"
                                    value={category}
                                    name="category"
                                >
                                    <option value="null">Select category</option>
                                    <option value="tiles">Laying of tiles</option>
                                    <option value="painting">Wall painting</option>
                                    <option value="electricity">Electricity</option>
                                    <option value="carpentry">Carpentry</option>
                                    <option value="bricklaying">Bricklaying</option>
                                    <option value="sewage">Sewage</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6 d-flex flex-column align-items-start">
                                <label className="labels">Start date</label>
                                <input
                                    onChange={onChange}
                                    type="date"
                                    className="form-control"
                                    // placeholder="Wall street 1"
                                    value={start_date}
                                    name="start_date"
                                />
                            </div>
                            <div className="col-md-6 d-flex flex-column align-items-start">
                                <label className="labels">End date</label>
                                <input
                                    onChange={onChange}
                                    type="date"
                                    className="form-control"
                                    // placeholder="Wall street 1"
                                    value={end_date}
                                    name="end_date"
                                />
                            </div>
                        </div>


                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="col-md-12 d-flex flex-column align-items-start">
                            <label className="labels">Budget</label>
                            <select
                                onChange={onChange}
                                className="form-control"
                                value={budget}
                                name="budget"
                            >
                                <option value="null">Select budget</option>
                                <option value="500">less then ₪500</option>
                                <option value="1000">between ₪500 and ₪1000</option>
                                <option value="10000">between ₪1000 and ₪10.000</option>
                                <option value="50000">between ₪10.000 and ₪50.000</option>
                                <option value="50001">more then ₪50.000</option>
                            </select>
                        </div>
                        <br/>
                        <div className="col-md-12 d-flex flex-column align-items-start">
                            <label className="labels">Description</label>
                            <textarea
                                onChange={onChange}
                                className="form-control"
                                placeholder="Description of the task"
                                value={desc}
                                name="desc"
                                rows="4" cols="30"/>
                        </div>
                        <br/>
                        <div className="col-md-12 d-flex flex-column align-items-start">
                            <label className="labels">Images</label>
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

            </div>
            <div className="row">
                <div className="col m-5 text-center">
                    <input type='submit' className="btn btn-primary profile-button" value="Save Task"/>
                </div>
            </div>
        </form>
    )
}