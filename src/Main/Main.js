import React, { useState } from 'react';
import {Typography, Divider, Box} from '@material-ui/core'
import './Main.css'
import { ThumbUp } from '@material-ui/icons'
import Controller from './Controller'

function Main() {
    const [name, setName] = useState("");

    return (
      <div className="header-bg">
        <Box py={3}>
          <Typography gutterBottom variant="h3">Hi, {name} Welcome to Spotifind</Typography>
          <Typography gutterBottom variant="h5">Listen to the songs below and tap the {<ThumbUp fontSize="large"/>} on your favorite song to generate more like it!</Typography>
        </Box>
        <Divider/>
        {/* Move to Controller */}
        <Controller
        setName={setName} />
      </div>
    );
  }
  
export default Main;
