import ToDoAPI from '../api/ToDoAPI'
import { useNavigate } from "react-router-dom"

function LoginPage(props) {

  const navigate = useNavigate()

  const handleLogin = async (evt) => {
    evt.preventDefault()
    let loginData = {
      username: evt.target.elements["username"].value,
      password: evt.target.elements["password"].value
    }
    const data = await ToDoAPI.login(loginData)

    if (data) {
      console.log(data)
      props.setUsername(data.username)
    }

  }


  return (
    <div id='signupbox'>
      <h2> Login Page</h2>
      <br />
      <form onSubmit = { handleLogin } method="POST">
        <label>Username: </label>
        <input name="username" placeholder="enter username" />
        <label>Password: </label>
        <input type="password" name="password" placeholder="enter password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage