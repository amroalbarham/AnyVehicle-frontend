import { React, createContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import base64 from 'base-64';
import cookie from 'react-cookies';
import superagent from 'superagent';

const API = process.env.REACT_APP_API;
export const UserContext = createContext();

export default function Context(props) {

  const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', password: '', role: '', repairRequests: [] });
  const [loggedIn, setLoggedIn] = useState(false);
  const [requestStatusData, setRequestStatusData] = useState({
    Accepted: 0,
    Declined: 0,
    Pending: 0,
  });

  useEffect(() => {
    const token = cookie.load('cookies');
    validateingToken(token);
  }, []);

  function validateingToken(token) {
    try {
      const userInfo = jwt.decode(token);
      if (userInfo) setLogInState(true, token, userInfo);
    } catch (error) {
      setLogInState(false, null, {});
      throw new Error(error.message);
    }
  }
  async function setLogInState(loggedIn, token, data) {
    cookie.save('cookies', token);
    let userInfo = await readRequests(data.email, token);
    setUserData(userInfo);
    setLoggedIn(loggedIn);
  }

  function setLogOutState(loggedIn, userInfo) {
    cookie.save('cookies', null);
    setUserData(userInfo);
    setLoggedIn(loggedIn);
  }

  async function signIn(email, password) {
    try {
      const response = await superagent
        .post(`${API}/register/signin`)
        .set('authorization', `Basic ${base64.encode(`${email}:${password}`)}`);
      validateingToken(response.body.token);
    } catch (error) {
      console.log('Invalid Email or Password...');
    }
  }

  async function signUp(userData) {
    try {
      const response = await superagent.post(`${API}/register/signup`, userData);
      validateingToken(response.body.token);
    } catch (error) {
      console.log(error.message)
    }
  }

  function logOut() {
    setLogOutState(false, { firstName: '', lastName: '', email: '', password: '', role: '', repairRequests: [] });
  }

  async function createRequest(reqInfo) {
    try { 
      const token = cookie.load('cookies');
      const response = await superagent
        .post(`${API}/create`, reqInfo)
        .set('authorization', `Bearer ${token}`);
      setUserData(response.body);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function readRequests(email, token) {
    const response = await superagent.get(`${API}/read?email=${email}`).set('authorization', `Bearer ${token}`);

    setRequestStatusData(response.body.requestStatusData);

    return {
      firstName: response.body.firstName,
      lastName: response.body.lastName,
      email: response.body.email,
      role: response.body.role,
      repairRequests: response.body.repairRequests,
    }
  }
  async function deleteRequest(reqName) {
    const token = cookie.load('cookies');
    const response = await superagent.delete(`${API}/delete`, { email: userData.email, name: reqName }).set('authorization', `Bearer ${token}`);
    setUserData(response.body);
  }
  async function updateRequest(reqName, email, status) {
    const token = cookie.load('cookies');
    const response = await superagent.update(`${API}/update`, { name: reqName, email: email, status: status }).set('authorization', `Bearer ${token}`);
    const newData = await readRequests(userData.email, token);
    setUserData(newData);
  }


  const state = {
    userData,
    setUserData,
    loggedIn,
    setLoggedIn,
    requestStatusData,
    setRequestStatusData,
    signIn,
    signUp,
    createRequest,
    readRequests,
    deleteRequest,
    updateRequest,
  };
  return (
    <UserContext.Provider value={state} >
      {props.children}
    </UserContext.Provider >
  )
}


