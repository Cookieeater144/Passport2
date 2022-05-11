import { Link, Navigate, useNavigate } from "react-router-dom";
import ToDoAPI from "../api/ToDoAPI";


function MainHeader(props) {

  const navigate = useNavigate()

  // helpers
  const doLogout = async () => {
    const data = await ToDoAPI.logout()
    if (data) {
      props.setUsername("")
      navigate("/#/")
    }
  }

  // render
  const renderAuthItems = () => {
    console.log(props.username)
    if (props.username === "") {
      return (
        <>
          &nbsp;|&nbsp;
          <Link to="/login">Login</Link>
          &nbsp;|&nbsp;
          <Link to="/signup">Sign Up</Link>
        </>
      )
    }

    return (
      <>
        &nbsp;|&nbsp;
        <Link to="/" onClick={ doLogout } >Logout</Link>
      </>
    )
  }


  return (
    <div id="header">
      <div id="header-title">
        <h1>{ props.title }</h1>
      </div>
      <div id="header-menu">
        <Link to="/">Home</Link>
        { renderAuthItems() }
      </div>
    </div>
  )
}

export default MainHeader; 