import axios from "axios"
import apiHelpers from "./apiHelpers"

const ToDoAPI = { }
const BASE_URL = "http://localhost:8000"

ToDoAPI.signup = async (signupData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/users/`, signupData, apiHelpers.getCsrfConfig()))
}

ToDoAPI.login = async (loginData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/login/`, loginData, apiHelpers.getCsrfConfig()))
}

ToDoAPI.logout = async () => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/logout/`, null, apiHelpers.getCsrfConfig()))
}

ToDoAPI.getAllTravelLists = async () => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/travel-lists/`, apiHelpers.getCsrfConfig()))
}

ToDoAPI.createTravelList = async (travelListData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/travel-lists/`,travelListData, apiHelpers.getCsrfConfig()))
}

ToDoAPI.getTravelListById = async (travelListId) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/travel-lists/${travelListId}/`, apiHelpers.getCsrfConfig()))
}

ToDoAPI.deleteTravelListById = async (travelListId) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.delete(`${BASE_URL}/travel-lists/${travelListId}/`, apiHelpers.getCsrfConfig()))
}

ToDoAPI.updateTravelList = async (travelListId, newtravellist) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.patch(`${BASE_URL}/travel-lists/${travelListId}/`, {"countrys": newtravellist }, apiHelpers.getCsrfConfig()))
}

ToDoAPI.createCountry = async (countryData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/countrys/`, countryData, apiHelpers.getCsrfConfig()))
}

ToDoAPI.getCountryById = async (countryID) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/countrys/${countryID}/`, apiHelpers.getCsrfConfig()))
}

ToDoAPI.getAllCountries = async () => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/countrys/`, apiHelpers.getCsrfConfig()))
}

ToDoAPI.deleteCountryById = async (countryID) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.delete(`${BASE_URL}/countrys/${countryID}/`,
    apiHelpers.getCsrfConfig()))
}




export default ToDoAPI