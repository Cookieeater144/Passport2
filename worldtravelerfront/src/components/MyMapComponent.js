import { useRef, useEffect, useState } from 'react'
import axios from 'axios';
import SwiperComponent from "./swiper"
import ToDoAPI from '../api/ToDoAPI'
import { useNavigate } from "react-router-dom";



let markers = []


function MyMapComponent(props) {

  const [map, setMap] = useState(null);
  const [countrylist, setCountryList] = useState([])
  const [countrycodelist, setCountryCodeList] = useState([])
  const [photostoshow, setPhotostoshow] = useState([])
  let center = props.center
  let zoom = props.zoom
  const navigate = useNavigate()
  const ref = useRef();

  function logout() {
    localStorage.setItem("passport.username", "")
    navigate("/")
  }


  function setMapOnAll(map) {
    for (let i=0; i<markers.length; i++) {
      markers[i].setMap(map)
    }
  }

  function hideMarkers() {
    setMapOnAll(null);
  }

  function showMarkers() {
    setMapOnAll(map)
  }

  function deleteMarkers() {
    hideMarkers();
    markers=[];
  }

  async function populateList() {
    let countrylisttorender = []
    let countrycodelisttorender = []
    for(let i=0; i<markers.length;i++) {
      let data = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${markers[i].position.lat()},${markers[i].position.lng()}&result_type=country&key={GOOGLEAPIKEY}`)
      if(data.data.status != 'ZERO_RESULTS'){
        if (data.data.results[0]["formatted_address"]){
          if (countrylisttorender.indexOf(data.data.results[0]["formatted_address"] + "  ") == -1 ) {
          countrycodelisttorender.push(data.data.results[0]['address_components'][0]['short_name'])
          countrylisttorender.push(data.data.results[0]["formatted_address"] + "  ")
        }
      }
    }
    }
    setCountryList(countrylisttorender)
    setCountryCodeList(countrycodelisttorender)
  }
  

  function deleteList() {
    setCountryList([])
    setCountryCodeList([])
  }

  async function addToUser(evt) {
    evt.preventDefault();
    let countryData = {
      name: evt.target.getAttribute('countryname'),
      svg: evt.target.getAttribute('countryimg')
    }
    console.log("COUNTRY INFO:", countryData)
    let data = await ToDoAPI.createCountry(countryData)
    if (data) {
      let usertravellist = await ToDoAPI.getTravelListById(props.travellistid)
      let newtravellist = []
      for (let i=0; i<usertravellist.countrys.length;i++){
        newtravellist.push(usertravellist.countrys[i])
      }
      newtravellist.push(data['id'])
      await ToDoAPI.updateTravelList(props.travellistid, newtravellist)
      props.getPassportlist()
    }
    else {
      console.log('hi')
      let data = await ToDoAPI.getAllCountries()
      for(let i=0; i<data.length; i++) {
        if(data[i]['name'].trim() == evt.target.getAttribute('countryname').trim()){
          console.log('hi')
          let usertravellist = await ToDoAPI.getTravelListById(props.travellistid)
          let newtravellist = []
          for (let i=0; i<usertravellist.countrys.length;i++){
            newtravellist.push(usertravellist.countrys[i])
          }
          newtravellist.push(data[i]['id'])
          await ToDoAPI.updateTravelList(props.travellistid, newtravellist)
          props.getPassportlist()
        }
      }
    }
  }




  async function informationPage() {
    let photos = []
    let data = []
    for(let i=0;i<countrylist.length;i++) {
      let photodata = await axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=20&client_id={UNSPLASHKEY}&query=${countrylist[i]}`)
      photos.push(photodata)
      let countrydata = await axios.get(`https://restcountries.com/v3.1/alpha/${countrycodelist[i]}`)
      data.push(countrydata.data[0])
    }
    let photoarray = []
    let countryinfo = []
    let photoswiper = []
    for (let i=0;i<photos.length;i++) {
      countryinfo.push(
      <div id="countryinformation">
        <div>
        <img src = {data[i]['flags']['svg']} height='150'/>
        </div>
        <div>
        <ul id='countryname'>{countrylist[i]}</ul>
        <ul>Continent: {data[i]['continents']}</ul>
        <ul>Total Area: {data[i]['area']} </ul>
        <ul>Population: {data[i]['population']}</ul>
        <ul>Capital City: {data[i]['capital']} </ul>
        <ul>Languages : {(Object.keys(data[i]['languages']).map(function(key) {
          return (data[i]['languages'])[key] + ' '; }))} </ul>
        </div>
        <div>
          <button countryname={countrylist[i]} countryimg={data[i]['flags']['svg']}onClick = {addToUser}>Add to passport</button>
        </div>
      </div>
      )
      for (let j=0; j<photos[i].data.results.length;j++) {
        console.log(j)
        console.log(photoswiper)
        if(photoswiper.length >= 15){
        }
        else {
          photoswiper.push(<img class="swiper-lazy" src = {photos[i].data.results[j].urls.regular} />)
          console.log(photoswiper)
      }
      } 
      countryinfo.push(<br></br>)
      countryinfo.push(<SwiperComponent photos={photoswiper}/>)
      photoswiper = []
    }
    setPhotostoshow(countryinfo)
  }

  function setCenterNA() {
    map.setZoom(4)
    map.setCenter({lat:46.0730555556, lng:-100.546666667})
  }

  function setCenterSA() {
    map.setZoom(3)
    map.setCenter({lat:-14.6047222222, lng:-57.6561111111})
  }

  function setCenterAF() {
    map.setZoom(3.2)
    map.setCenter({lat:7.18805555556, lng:21.0936111111})
  }

  function setCenterEU() {
    map.setZoom(3.5)
    map.setCenter({lat:48.6908333333, lng:9.14055555556})
  }

  function setCenterAS() {
    map.setZoom(4)
    map.setCenter({lat:29.8405555556, lng:89.2966666667})
  }

  function setCenterAU() {
    map.setZoom(3.6)
    map.setCenter({lat:-18.3127777778, lng:138.515555556})
  }

  function setCenterAN() {
    map.setZoom(3)
    map.setCenter({lat:-60.3594444444, lng:16.5233333333})
  }

  useEffect(() => {
    let map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      gestureHandling: 'greedy',
      styles : [
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "hue": "#FFBB00"
                },
                {
                    "saturation": 43.400000000000006
                },
                {
                    "lightness": 37.599999999999994
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "road.highway",
            "stylers": [
                {
                    "hue": "#FFC200"
                },
                {
                    "saturation": -61.8
                },
                {
                    "lightness": 45.599999999999994
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "stylers": [
                {
                    "hue": "#FF0300"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 51.19999999999999
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "hue": "#FF0300"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 52
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "hue": "#0078FF"
                },
                {
                    "saturation": -13.200000000000003
                },
                {
                    "lightness": 2.4000000000000057
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "hue": "#00FF6A"
                },
                {
                    "saturation": -1.0989010989011234
                },
                {
                    "lightness": 11.200000000000017
                },
                {
                    "gamma": 1
                }
            ]
        }
    ]
      


    });
    setMap(map)
    map.addListener("click", (event) => {
     let marker = new window.google.maps.Marker({
       position: new window.google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
       map:map
     })
     markers.push(marker)
    })
  },[]);

  return (
  <div>
    <div>
    <h6>Welcome back {props.username}.</h6>
    <button onClick={logout}> Logout </button>
    <br></br>
    Center map on :
    <div id="continent-panel">
      <input class="button4" style={{backgroundColor: '#f14e4e'}} id="North-America" onClick={ () => setCenterNA() } type="button" value="North-America" />
      <input class="button4" style={{backgroundColor:'#f1bb4e'}} id="South-America" onClick={ () => setCenterSA() } type="button" value="South-America" />
      <input class="button4" style={{backgroundColor:"#84f14e"}} id="Africa" onClick={ () => setCenterAF() } type="button" value="Africa" />
      <input class="button4" style={{backgroundColor:"#4ef18f"}} id="Europe" onClick={ () => setCenterEU() } type="button" value="Europe" />
      <input class="button4" style={{backgroundColor:"#4e9af1"}} id="Asia" onClick={ () => setCenterAS() } type="button" value="Asia" />
      <input class="button4" style={{backgroundColor:"#9a4ef1"}} id="Australia" onClick={ () => setCenterAU() } type="button" value="Australia" />
      <input class="button4" style={{backgroundColor:"#f14ebd"}} id="Antarctica" onClick={ () => setCenterAN() } type="button" value="Antarctica" />
    </div>
    <div id="floating-panel">
      <input class="button4" style={{backgroundColor:"#9a4ef1"}}id="hide-markers" onClick={ () => hideMarkers() } type="button" value="Hide Markers" />
      <input class="button4" style={{backgroundColor:"#4e9af1"}}id="show-markers" onClick = { () => showMarkers() }type="button" value="Show Markers" />
      <input class="button4" style={{backgroundColor:"#4ef18f"}}id="delete-markers" onClick = { () => deleteMarkers() }type="button" value="Delete Markers" />
      <input class="button4" style={{backgroundColor:"#84f14e"}}id="populate-country-list" onClick = { () => populateList() } type="button" value="Load Country List" />
      <input class="button4" style={{backgroundColor:'#f1bb4e'}}id="reset-country-list" onClick = { () => deleteList() } type="button" value="Delete Country List" />
      <input class="button4" style={{backgroundColor: '#f14e4e'}} id="information-page" onClick = { () => informationPage() } type="button" value="Load Country Information" />
    </div>

  Current List of Countries Selected : {countrylist}
  <div ref={ref} id="map" />
  <br></br>
  <h6>To Be Stamped:</h6>
  {props.passportlist} 
  { photostoshow } 
  </div>
  </div>
  )
}


export default MyMapComponent