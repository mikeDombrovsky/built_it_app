import {useEffect, useState} from "react";
import {useAuth} from "../hooks/AuthProvider";

export const Tasks = () => {
    const {BASE_URL, token, verifyToken} = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        verifyToken();
        fetch(BASE_URL + '/api/tasks', {
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


    return (
        <div className="container rounded mt-5 mb-5">
            <div className="row">
                {tasks.map(task => (
                    <div className="col-sm-3" key={task.id}>
                        <div className="card">
                            <img className="card-img-top" src={BASE_URL + task.image} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{task.title}</h5>
                                <p className="card-text">{task.description}</p>
                                <a href="#" className="btn btn-primary">see details</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}