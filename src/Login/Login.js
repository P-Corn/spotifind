import React from 'react'
import {Button} from '@material-ui/core'

function Login() {

    // Try to add these to the .env files instead of exposing our sensitive data!
    const REACT_APP_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
    const REACT_APP_CLIENT_ID = '12cd3241fb414a9b81e771a0181251e0';
    const REACT_APP_REDIRECT_URL = 'https://priceless-noyce-91014e.netlify.app/main';
    const scopes = [
        'streaming',
        'user-read-private',
        'user-modify-playback-state',
        'user-read-email',
        'user-top-read',
        'playlist-modify-public',
        'playlist-modify-private',
        'playlist-read-private'
    ]

    const handleLogin = () => {
        window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
    }

    return (
        <div className="login">
            <h1>Login to Spotify!</h1>
            <Button variant="contained" type="submit" onClick={handleLogin}>Login to spotify</Button>
        </div>
    );
}

  
export default Login;
