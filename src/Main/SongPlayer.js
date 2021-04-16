import React, { useState } from 'react';
import Axios from 'axios';
import { Card, Grid, Typography, IconButton, CardContent, CardMedia} from '@material-ui/core';
import PlaylistMenu from './PlaylistMenu'
import { makeStyles, useTheme} from '@material-ui/core/styles';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));
  
  export default function SongPlayer({play, pause, id, uri, token, title, artists, song, playlists}) {
    const classes = useStyles();
    const theme = useTheme();

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
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
                {title.length > 30 ? title.slice(0,27) + "..." : title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
            //{artists.map((artist) => (`${artist.name}//`))}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="previous">
              {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton onClick={() => handlePlayback()} aria-label="play/pause">
              {songPause === true ? <PlayArrowIcon/> : <PauseIcon/>}
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
    );
  }



// const useStyles = makeStyles({
//     songContainer: {
//         marginBottom: 35
//     }
// })

// function SongPlayer({play, pause, id, uri, token, title, artists, getRecommendations, song, playlists}) {
//     const classes = useStyles();
    // const [songPause, setSongPause] = useState(true)

    // const handlePlayback = () => {
    //     songPause === true ? play(id, token, uri) : pause(id, token)
    //     setSongPause(!songPause)
    // }

    // const addToPlaylist = (token, playlistId, songId) => {
        
    //     Axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=spotify%3Atrack%3A${songId}`, {}, {
    //         headers: {
    //             'Accept': 'application/JSON',
    //             'Content-Type': 'application/json',
    //             // 'Content-Length': 0,
    //             'Authorization': 'Bearer ' + token
    //         }
    //     }).then((res) => {
    //         console.log("from add Playlist function " + res);
    //     })
    // }

//     return (
//         <Card className={classes.songContainer}>
//             <Grid alignItems="center" container>
//                 <Grid xs={2} item>
//                     <IconButton onClick={() => handlePlayback()}>
//                     {songPause === true ? <PlayArrow/> : <Pause/>}
//                     </IconButton>
//                 </Grid>
//                 <Grid xs={8} item>
//                     <CardContent>
//                         <Typography variant="h5" className="song-title">{title.length > 30 ? title.slice(0,27) + "..." : title}</Typography>
//                         <Typography variant="subtitle1">//{artists.map((artist) => (`${artist.name}//`))}</Typography>
//                         {/* {artists.map((artist) => <Typography variant="subtitle1">{artist.name}</Typography>)} */}
//                     </CardContent>
//                 </Grid>
//                 <Grid xs={2} item>
//                     <PlaylistMenu 
//                     addToPlaylist={addToPlaylist} 
//                     playlists={playlists}
//                     token={token}
//                     songId={song.id}
//                     />
//                     <IconButton onClick={() => getRecommendations(token, song)}><ThumbUp/></IconButton>
//                 </Grid>
//             </Grid>
//         </Card>
//     );
//   }
  
// export default SongPlayer;