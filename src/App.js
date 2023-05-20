import './App.css';
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import axios from "axios"

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

  return (
    <div className="App">
      <header className="App-header">
        {
          profile ? (
            <div>
              <img src={profile.picture} alt="user image" />
              <h3>Gebruiker ingelogd</h3>
              <p>Naam: {profile.name}</p>
              <p>Email: {profile.email}</p>
              <p>Gevestigde land: {profile.locale}</p>
              <button onClick={logOut}>Uitloggen</button>
            </div>
          ) : (
            <button onClick={() => login()}>Log in met Google</button>
          )}

      </header>
    </div>
  );
}

export default App;