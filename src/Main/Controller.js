import React, { useState } from 'react';
import {Typography, Divider, Box, Icon} from '@material-ui/core'
import { getToken } from '../utils/getToken'
import SpotifySdk from './SpotifySdk'
import SettingsUi from './SettingsUi'

function Controller({setName}) {
    // For the modal control
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
      };

    const url = window.location.href;
    const token = getToken(url)
    const [acousticness, setAcousticness] = useState({min: 0, max: 1})
    const [danceability, setDanceability] = useState({min: 0, max: 1})
    const [energy, setEnergy] = useState({min: 0, max: 1})
    const [instrumentalness, setInstrumentalness] = useState({min: 0, max: 1})
    const [liveness, setLiveness] = useState({min: 0, max: 1})
    const [popularity, setPopularity] = useState({min: 0, max: 100})
    const [speechiness, setSpeechiness] = useState({min: 0, max: 1})
    const [tempo, setTempo] = useState({min: 0, max: 140})
    const [valence, setValence] = useState({min: .5, max: 1}) //Positivity
    // const [loudness, setLoudness] = useState({min: 0, max: 1})
    // const [key, setKey] = useState({min: 0, max: 100})
    // const [duration, setDuration]
    const [settingNames] = useState(["Acousticness", "Danceability", "Energy", "Instrumentalness", "Liveness",
                                    "Popularity", "Speechiness", "Tempo", "Valence"])

    return (
      <div>
        <SpotifySdk
        setName={setName}
        acousticness={acousticness}
        danceability={danceability}
        energy={energy}
        instrumentalness={instrumentalness}
        liveness={liveness}
        popularity={popularity}
        speechiness={speechiness}
        tempo={tempo}
        valence={valence}
        handleOpen={handleOpen}
        />
        <SettingsUi
        handleClose={handleClose} 
        open={open}
        settingNames={settingNames}
        settings={[setAcousticness, setDanceability, setEnergy,
            setInstrumentalness, setLiveness, setPopularity, setSpeechiness, setTempo, setValence]}
         />
      </div>
    );
  }
  
export default Controller;