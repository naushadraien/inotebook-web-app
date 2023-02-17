import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password: ""})
    //In react-router-dom v6 useHistory() is replaced by useNavigate()
    //let history = useHistory();
    let navigate = useNavigate();
    //Here e is element
    const handleSubmit = async (e) => {
        e.preventDefault();
        //API CALL or FETCH for logging in the existing user
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                //this was copied from header section of update Note of thunderclient
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email:credentials.email, password:credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            //save the auth token in our local storage and redirect
            localStorage.setItem('token',json.authtoken);
            //history.push("/")
            navigate('/');
        }else{
            alert("Invalid credentials");
        }
    }
    const onChange = (e) => {
        //... means using spread operator where ...note keeps all the property of note then , [] overrides the properties which is given in the array
        //where e is the event
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login