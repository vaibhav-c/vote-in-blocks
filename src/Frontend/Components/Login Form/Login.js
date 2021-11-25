import React from 'react';
import LoginPage from '../../Pages/Login/Login';
import './Login.css';

const Login = (props) => {
    return (
        <div className="containerx">
        <div className="row">
            <div className="col-sm-2 col-md-7 col-lg-10 mx-auto">
                <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-1">
                <h5 className="card-title text-center mb-5 fw-light fs-5">Login</h5>
                    <form>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"></input>
                        <label for="floatingPassword">Password</label>
                    </div>

                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck"></input>
                        <label className="form-check-label" for="rememberPasswordCheck">
                        Remember password
                        </label>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign In</button>
                    </div>
                    <hr className="my-4"></hr>
                    <div className="d-grid mb-2">
                        <button className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
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