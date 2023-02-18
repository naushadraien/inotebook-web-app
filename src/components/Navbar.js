import React  from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';



const Navbar = () => {
    let navigate = useNavigate();
    //this handleLogout function is used for when user clicked on logout button he will be redirected to login page
    const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
    }
    //using the useLocation() for showing the active nav-link when clicked on Home, About links on Navbar
    let location = useLocation();
    // useEffect(() => {
    //     console.log(location.pathname);
    // }, [location]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {/* //using the {`nav-link ${location.pathname === "/" ? "active" : ""}`} for showing the active nav-link when clicked on Home, About links on Navbar */}
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {/* for showing the logged out button when user is logged in and hide login and signup button when user is logged in */}
                    {!localStorage.getItem('token')?<form className="d-flex" role="search">
                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form>: <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
