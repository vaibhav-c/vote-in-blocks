import React, {useState, useContext} from 'react';
import axios from 'axios';
import './Login.css';

const Login = (props) => {

    const [values, setValues] = useState({
        email: '',
        password: '',   
    })

    const onChangeHandler = (text) => (e) => {
        setValues({...values,[text]: e.target.value})
      
    }
    const onSubmitHandler = (e)=>{
        const {email,password} = values;
        e.preventDefault();
        if(email && password){
            axios.post(`http://localhost:5000/api/login`,{
                email,
                password
            }).then((res)=>{
                setValues({
                    ...values,
                    email: '',
                    password: ''
                })
                window.location.href = `/home?${res.data.token}`;
                console.log('Logged in');
            }).catch((err)=>{
                console.log(err);
                alert(err.response.data.error);
            })
        } else {
            alert('Please fill all the fields');
        }
        
        }
    
    const googleAuth = (event) => {
        event.preventDefault();
        window.location.href = "http://localhost:5000/api/auth/google";
    }

    return (
        <div className="containerx">
        <div className="row">
            <div className="col-sm-2 col-md-7 col-lg-10 mx-auto">
                <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-1">
                <h5 className="card-title text-center mb-5 fw-light fs-5"><b>Login</b></h5>
                    <form>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={onChangeHandler('email')}></input>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={onChangeHandler('password')}></input>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck"></input>
                        <label className="form-check-label" htmlFor="rememberPasswordCheck">
                        Remember password
                        </label>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" onClick = {onSubmitHandler}>Sign In</button>
                    </div>
                    <hr className="my-4"></hr>
                    <div className="d-grid mb-2">
                        <button className="btn btn-google btn-login text-uppercase fw-bold" type="submit" onClick = {googleAuth}>
                            <i className="fab fa-google me-2"></i> Sign in with Google
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>				                            
    )
}

export default Login;