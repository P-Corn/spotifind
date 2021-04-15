import React, { useState } from 'react';
import Axios from 'axios';
import { Card, Grid, Typography, IconButton, CardContent } from '@material-ui/core';
import {PlayArrow, Pause, Add, ThumbUp} from '@material-ui/icons'
import PlaylistMenu from './PlaylistMenu'

function SongPlayer({play, pause, id, uri, token, title, artists, getRecommendations, song, playlists}) {
    const [songPause, setSongPause] = useState(true)

    const handlePlayback = () => {
        songPause === true ? play(id, token, uri) : pause(id, token)
        setSongPause(!songPause)
    }

    const addToPlaylist = (token, playlistId, songId) => {
        
        Axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=spotify%3Atrack%3A${songId}`, {}, {
            headers: {
                'Accept': 'application/JSON',
                'Content-Type': 'application/json',
                // 'Content-Length': 0,
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            console.log("from add Playlist function " + res);
        })
    }

    return (
      <div className="song-container">
          <Card>
            <Grid alignItems="center" container>
                <Grid item>
                    <IconButton onClick={() => handlePlayback()}>
                    {songPause === true ? <PlayArrow/> : <Pause/>}
                    </IconButton>
                </Grid>
                <Grid item>
                    <CardContent>
                        <Typography variant="h5" className="song-title">{title.length > 30 ? title.slice(0,27) + "..." : title}</Typography>
                        <Typography variant="subtitle1">//{artists.map((artist) => (`${artist.name}//`))}</Typography>
                        {/* {artists.map((artist) => <Typography variant="subtitle1">{artist.name}</Typography>)} */}
                    </CardContent>
                </Grid>
                <Grid item>
                    <PlaylistMenu 
                    addToPlaylist={addToPlaylist} 
                    playlists={playlists}
                    token={token}
                    songId={song.id}
                    />
                    <IconButton onClick={() => getRecommendations(token, song)}><ThumbUp/></IconButton>
                </Grid>
            </Grid>
          </Card>
          {/* {positions} */}
      </div>
    );
  }
  
export default SongPlayer;