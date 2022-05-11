import './App.css';
import { HashRouter, Routes, Route, Link } from "react-router-dom"
import MyMapComponent from './components/MyMapComponent'
import { useState, useEffect } from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login'
import SignUp from './components/signup.component'
import ToDoAPI from './api/ToDoAPI';


function App() {
  function getUserName() {
    let name = localStorage.getItem("passport.username")
    return name ? name : ""
  }
  function getTravelListId() {
    let travellistid = localStorage.getItem("passport.travellistid")
    return travellistid ? travellistid : []
  }

  const [username, setUsername] = useState(getUserName())
  const [travellistid, setTravellistid] = useState(getTravelListId())
  const [passportlist, setPassportlist] = useState(null)

  const center = { lat: 0, lng: 0 };
  const zoom = 2.5;

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  async function deleteCountry (evt) {
    let usertravellist = await ToDoAPI.getTravelListById(travellistid)
    let newtravellist = []
    for(let i=0; i<usertravellist.countrys.length;i++){
      if (usertravellist.countrys[i] != evt.target.getAttribute('countryid')) {
        newtravellist.push(usertravellist.countrys[i])
      }
    }
    let data = await ToDoAPI.updateTravelList(travellistid, newtravellist)
    console.log(data)
    getPassportlist()
  }

  async function getPassportlist() {
    let usertravellist = await ToDoAPI.getTravelListById(travellistid)
    console.log(usertravellist.countrys[1])
    let passporttoflex = []
    for(let i=0; i<usertravellist.countrys.length; i++) {
      let passporttoshow = []
      let countrylist  = await ToDoAPI.getCountryById(usertravellist.countrys[i])
      passporttoshow.push(countrylist.name)
      passporttoshow.push(<img src = {countrylist.svg} height='25'/>)
      passporttoshow.push(<button countryid = {usertravellist.countrys[i]} onClick = {deleteCountry}>X</button>)
      passporttoshow.push(<br></br>)
      passporttoflex.push(<div id="passportflex"><div>{passporttoshow}</div></div>)
    }
    setPassportlist(<div id="allpassports">{passporttoflex}</div>)
  }

  useEffect(() => {
    getPassportlist()
  }, [])

  return (
    <HashRouter>
    <div className="App">
          <Routes>
              <Route exact path="/" element={<Login setUsername = {setUsername}
              />} />
              <Route path="/sign-in" element={<Login setUsername = {setUsername}/>} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/worldmap" element={
              <Wrapper apiKey={"GOOGLEAPIKEY"} render={render}>
              <MyMapComponent getPassportlist = {getPassportlist}travellistid = {travellistid} passportlist = {passportlist} setPassportlist = {setPassportlist} center={center} zoom={zoom} username={username} />
              </Wrapper>}/>
          </Routes>
          </div>
   </HashRouter>
  );
}


export default App;
