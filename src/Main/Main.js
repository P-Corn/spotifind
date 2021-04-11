import React, { useState } from 'react';
import {Typography, Divider, Box, Icon} from '@material-ui/core'
import { getToken } from '../utils/getToken'
import ApiFunctions from './ApiFunctions'
import Axios from 'axios'
import SpotifySdk from './SpotifySdk'
import './Main.css'
import {ThumbUp} from '@material-ui/icons'

function Main() {
    const url = window.location.href;
    const token = getToken(url)
    const [name, setName] = useState("");

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
