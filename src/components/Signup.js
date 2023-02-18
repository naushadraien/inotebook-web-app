import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email:"", password: "", cpassword:""})
    //In react-router-dom v6 useHistory() is replaced by useNavigate()
    //let history = useHistory();
    let navigate = useNavigate();
    //Here e is element
    const handleSubmit = async (e) => {
        e.preventDefault();
       const  {name,email,password} = credentials;
        //API CALL or FETCH for logging in the existing user
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            //using destructuring
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                //this was copied from header section of update Note of thunderclient
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            //save the auth token in our local storage and redirect
            localStorage.setItem('token',json.authtoken);
            //history.push("/")
            navigate('/');
            props.showAlert(":Successfully created your account", "success")
        }else{
            props.showAlert(":Invalid Credentials", "danger")
        }
    }
    const onChange = (e) => {
        //... means using spread operator where ...note keeps all the property of note then , [] overrides the properties which is given in the array
        //where e is the event
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container mt-2'>
            <h2 className='my-3'>Create an account use iNotebook</h2>
            <form onSubmit={handleSubmit}>
            <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='password' onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup