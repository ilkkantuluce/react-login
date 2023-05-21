import './App.css';
import React, { useState } from 'react';

import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";


function App() {

  const [google, setGoogle] = useState(null);
  const [facebook, setFacebook] = useState(null);


  const logOut = () => {
    setGoogle(null);
    setFacebook(null);
  };

  return (
    <div>
      <div className='nav'>
        <div className='container'>
          <div className='row'>
            {
              google || facebook ? (
                <div>
                  <button onClick={logOut} className='btn'>Uitloggen</button>
                </div>
              ) : (
                <div>
                  <LoginSocialGoogle
                    client_id="698917628220-p8eb9ro47uidlkfgdum4gpfqk2h1hfnr.apps.googleusercontent.com"
                    onResolve={(response) => {
                      console.log(response);
                      setGoogle(response.data);
                    }}
                    onReject={(error) => {
                      console.log(error);
                    }}
                  >
                    <button className='btn'>Log in met google</button>
                  </LoginSocialGoogle>

                  <LoginSocialFacebook
                    appId="785994089767475"
                    onResolve={(response) => {
                      console.log(response);
                      setFacebook(response.data);
                    }}
                    onReject={(error) => {
                      console.log(error);
                    }}
                  >
                    <button className='btn'>Log in met Facebook</button>
                  </LoginSocialFacebook>
                </div>

              )}
          </div>
        </div>
      </div>
      <div className='content'>
        <div className='container'>
          <div className='row'>

            {facebook ? (
              <div className='data-info'>
                <h3>Gebruiker ingelogd</h3>
                <img src={facebook.picture.data.url} alt="" />
                <p>Naam: {facebook.name}</p>
                <p>Email: {facebook.email}</p>
              </div>
            ) : (
              ""
            )}

            {
              google ? (
                <div className='data-info'>
                  <h3>Gebruiker ingelogd</h3>
                  <img src={google.picture} alt="" />
                  <p>Naam: {google.name}</p>
                  <p>Email: {google.email}</p>
                  <p>Gevestigde land: {google.locale}</p>
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