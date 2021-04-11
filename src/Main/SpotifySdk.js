import React, { useState, useEffect } from 'react';
import { getToken } from '../utils/getToken'
import Axios from 'axios'
import SongPlayer from './SongPlayer'
import {Grid, Box} from '@material-ui/core'

function SpotifySdk() {
  const url = window.location.href;
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const [topArtists, setTopArtists] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [positions, setPositions] = useState([]);


    const getPlaylists = (token) => {
      Axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
              'Accept': 'application/JSON',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
      })
      .then((res) => {
          console.log(res.data.items)
          setPlaylists(res.data.items)
      })
    }

    const getInitialRecommendations = (token, songIds) => {
      Axios.get(`https://api.spotify.com/v1/recommendations?limit=3&&min_popularity=30&seed_artists=${songIds.join('%2C')}`, {
          headers: {
              'Accept': 'application/JSON',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
      })
      .then((res) => {
          // Put 3 songs inside of the topRecommendations
          setRecommendations([...res.data.tracks])
          console.log(res.data.tracks)
      })
    }

  const getInitialTopArtists = (token) => {
      Axios.get('https://api.spotify.com/v1/me/top/artists?limit=5', {
          headers: {
              'Accept': 'application/JSON',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
      })
      .then((res) => {
          setTopArtists(res.data.items)
          const songIds = res.data.items.map((item) => (
              item.id
          ))
          getInitialRecommendations(token, songIds)
      })
  }

  useEffect(() => {
    getInitialTopArtists(getToken(url))
    setToken(getToken(url))
    getPlaylists(getToken(url))
  },[])
    
    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Web Playback',
          getOAuthToken: cb => { cb(token); }
        });

          // Error handling
          player.addListener('initialization_error', ({ message }) => { console.error(message); });
          player.addListener('authentication_error', ({ message }) => { console.error(message); });
          player.addListener('account_error', ({ message }) => { console.error(message); });
          player.addListener('playback_error', ({ message }) => { console.error(message); });

          // Playback status updates
          player.addListener('player_state_changed', state => { 
              console.log(state);
            //   setPosition(state.position)
            });

          // Ready
          player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
          });

          // Not Ready
          player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gaddListenere offline', device_id);
          });

          player.addListener('ready', data => {
            console.log('Ready with Device ID', data.device_id)
            setId(data.device_id)

            // play(data.device_id, token);
          });

          // CaddListenernect to the player!
          player.connect().then(success => {
            if(success){
              console.log('Success, player connected')
            }

          });
    }

    function play(device_id, token, uri, position) {
        Axios.put('https://api.spotify.com/v1/me/player/play?device_id=' + device_id, 
        {
            // "context_uri": "spotify:album:7jk1IjLRs1vAI42vb9whxe"
            // ,
            // // "uris": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
            // "offset": {
            // "position": 5
            // },
            "position_ms": position,
            "uris": [uri]
        },
        {
            headers: {
                'Accept': 'application/JSON',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }
        ).then((res) => console.log(res))
    }

    function pause(device_id, token) {
      Axios.put('https://api.spotify.com/v1/me/player/pause?device_id=' + device_id,{},
      {
          headers: {
              'Accept': 'application/JSON',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
      }
      ).then((res) => 
        console.log(res)
      )
  }

//   function seekPosition(device_id, token) {
//     Axios.put('https://api.spotify.com/v1/me/player/seek' + device_id,{},
//     {
//         headers: {
//             'Accept': 'application/JSON',
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         },
//     }
//     ).then((res) => console.log(res))
// }

    const getRecommendations = (token, song) => {
        pause(id, token)
        Axios.get(`https://api.spotify.com/v1/recommendations?limit=3&&min_popularity=30&seed_artists=${song.artists.map((artist) => artist.id)}&seed_tracks=${song.id}`, {
            headers: {
                'Accept': 'application/JSON',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then((res) => {
            // Put 3 songs inside of the topRecommendations
            setRecommendations([...res.data.tracks])
        })
    }

    return (
      <div className="container">
        <Box pb={5}/>
        <Grid alignItems="center" container>
        {recommendations.map((song) => (
            <Grid key={song.id} sm={12} item>
                <SongPlayer 
                className="song-player"
                key={song.id}
                id={id}
                uri={song.uri}
                token={token}
                title={song.name}
                play={play}
                pause={pause}
                artists={song.artists}
                getRecommendations={getRecommendations}
                song={song}
                positions={positions}
                playlists={playlists}
                />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
  
export default SpotifySdk;