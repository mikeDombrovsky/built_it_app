import worker_img from '../pexels-anamul-rezwan-1216544.jpg'
export const Home = () => {
    return (
        <div className="container rounded bg-white mt-5 pt-3 mb-5">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <h1>We will make your life much easier!</h1>
                        <p>Just make a task and we will help you to find the best construction professional for your
                            personal needs.</p>
                        <form className="form-inline d-flex flex-row">
                            <input className="form-control mr-sm-2" type="search" placeholder="Service or professional"
                                   aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <img width="80%" src={worker_img} alt='construction worker'/>
                    </div>
                </div>
            </div>
        </div>
)
}