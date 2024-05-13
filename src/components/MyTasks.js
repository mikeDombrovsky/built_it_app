import {useEffect, useState} from "react";
import {useAuth} from "../hooks/AuthProvider";

export const Tasks = () => {
    const {BASE_URL, token, verifyToken} = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        verifyToken();
        fetch(BASE_URL + '/api/tasks/my', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(data => {
                setTasks(data)
                console.log(data)
            });
    }, []);


    return (<div className="container rounded mt-5 mb-5 min-vh-80">
            <div className="row">
                {tasks.map(task => (

                    <div className="col-sm-3" key={task.id}>
                        <div className="card">
                            <img className="card-img-top" src={task.image ? BASE_URL +  task.image : BASE_URL + '/media/no_image.jpg'} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{task.title}</h5>
                                <p className="card-text">{task.description}</p>
                                { !task.budget ? "" : <p className="card-text text-start">Budget: ₪{task.budget}</p>}
                                <p className="card-text text-start">Address: {task.address}</p>
                                { !task.start_date || task.start_date === "" ? "" : <p className="card-text text-start">Start date: {task.start_date.slice(0,10)}</p>}
                                { !task.end_date || task.end_date === "" ? "" : <p className="card-text text-start">End date: {task.end_date.slice(0,10)}</p>}
                                <a href="#" className="btn btn-primary">see details</a>
                                <a href="#" className="btn btn-danger">remove task</a>
                            </div>
                        </div>
                    </div>))}
                {tasks.length === 0 ? <h1 className='text-white mt-5'>Loading...</h1> : ''}
            </div>
        </div>);
}