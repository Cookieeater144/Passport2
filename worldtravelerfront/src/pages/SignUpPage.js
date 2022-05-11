import { useNavigate } from "react-router-dom"
import ToDoAPI from "../api/ToDoAPI"


function SignUpPage(props) {
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
      navigate("/login")
    }
  }



  return (
    <div>
      <h2> Sign Up Page</h2>
      <br />
      <form onSubmit = { handleSignUp } method="POST">
        <label>Username: </label>
        <input name="username" placeholder="enter username" />
        <label>Password: </label>
        <input type="password" name="password" placeholder="enter password" />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpPage