import worker_img from '../pexels-anamul-rezwan-1216544.jpg'
import {Link} from "react-router-dom";

export const Home = () => {
    return (
        <div className="container rounded bg-white mt-5 pt-3 mb-5">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <h1>We will make your life much easier!</h1>
                        <p>Just make a task and we will help you to find the best construction professional for your
                            personal needs.</p>

                        <Link className="btn btn-outline-success m-3" to='/create-task'>Create a new task</Link>

                        <img className="rounded w-100 " src={worker_img} alt='construction worker'/>
                    </div>
                </div>
            </div>
        </div>
    )
}