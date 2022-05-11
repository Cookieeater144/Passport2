import React, { Component } from 'react'
import { useNavigate, Link } from "react-router-dom"
import ToDoAPI from '../api/ToDoAPI'



function SignUp(props) {
    const navigate = useNavigate()

    const handleSignUp = async (evt) => {
      evt.preventDefault()
      let signUpData = {
        username: evt.target.elements["username"].value,
        password: evt.target.elements["password"].value
      }
      console.log("SIGN UP INFO:", signUpData)
      const data = await ToDoAPI.signup(signUpData)
      if (data) {
        navigate("/sign-in")
      }
    }

    return (
      <div id='loginpage' style={{ backgroundImage: `url(https://i0.wp.com/www.touristisrael.com/wp-content/uploads/2021/04/Passport.jpg?w=1200&ssl=1)`, 
      backgroundSize:'cover',
      backgroundRepeat: 'no-repeat',
      }} className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      <div className="auth-wrapper">
      <div className="auth-inner">
      <form onSubmit = { handleSignUp } method="POST">
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Username</label>
          <input
            name="username"
            type="username"
            className="form-control"
            placeholder="Enter username"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
      </div>
      </div>
      </div>
    )
  }

  export default SignUp