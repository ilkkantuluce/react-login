import './App.css';
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import axios from "axios"
import FacebookLogin from '@greatsumini/react-facebook-login';


function App() {

  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async respose => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            "Authorization": `Bearer ${respose.access_token}`
          }
        })
        setProfile(res.data)
        //console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
  });

  const logOut = () => {
    setProfile(null);
    googleLogout();
  };

  const responseFacebook = (response) => {
    console.log(response);
  }
  

  return (
    <div>
      <div className='nav'>
        <div className='container'>
          <div className='row'>
          {
            profile ? (
            <button onClick={logOut} className='btn'>Uitloggen</button>
            ) : (
              <button onClick={() => login()} className='btn'>Log in met Google</button>
            )
          }
          </div>
        </div>
      </div>
      <div className='content'>
        <div className='container'>
          <div className='row'>
          <FacebookLogin
  appId="1566419997180171"
  onSuccess={(response) => {
    console.log('Login Success!', response);
  }}
  onFail={(error) => {
    console.log('Login Failed!', error);
  }}
  onProfileSuccess={(response) => {
    console.log('Get Profile Success!', response);
  }}
/>


            {
            profile ? (
              <div className='google-info'>
                <h3>Gebruiker ingelogd</h3>
                <img src={profile.picture} alt="user image" />
                <p>Naam: {profile.name}</p>
                <p>Email: {profile.email}</p>
                <p>Gevestigde land: {profile.locale}</p>
              </div>
            ) : (
              ''
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;