import React, { useState } from 'react';
import {Typography, Divider, Box, Icon} from '@material-ui/core'
import { getToken } from '../utils/getToken'
import ApiFunctions from './ApiFunctions'
import Axios from 'axios'
import SpotifySdk from './SpotifySdk'
import './Main.css'
import { ThumbUp } from '@material-ui/icons'

function Main() {
    const url = window.location.href;
    const token = getToken(url)
    const [name, setName] = useState("");
    const [accousticness, setAccousticness] = useState(0)
    const [danceability, setAbility] = useState(0)
    const [energy, setEnergy] = useState(0)
    const [instrumentalness, setInstrumentalness] = useState(0)
    const [liveness, setLiveness] = useState(0)
    const [popularity, setPopularity] = useState(0)
    const [speechiness, setSpeechiness] = useState(0)
    const [tempo, setTempo] = useState(0)
    const [valence, setValence] = useState(0) //Positivity
    // const [loudness, setLoudness] = useState(0)
    // const [key, setKey]
    // const [duration, setDuration]

    return (
      <div className="header-bg">
        <Box py={3}>
          <Typography gutterBottom variant="h3">Hi, {name} Welcome to Spotifind</Typography>
          <Typography gutterBottom variant="h5">Listen to the songs below and tap the {<ThumbUp fontSize="large"/>} on your favorite song to generate more like it!</Typography>
        </Box>
        <Divider/>
          <ApiFunctions 
          setName={setName}
          />
          <SpotifySdk/>
      </div>
    );
  }
  
export default Main;
