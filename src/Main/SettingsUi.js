import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import SettingsSlider from './SettingsSlider';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    // textAlign: "center",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center"
  },
  modalContainer: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center"
  }
}));

export default function SettingsUi({handleClose, open, settings, settingNames}) {

  // handleClose, open, setFunctions (props)
  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
      <SettingsSlider />
      {settings.map((setting, index) => (
        <SettingsSlider name={settingNames[index]} setter={setting}/>
      ))}
    </div>
  );

  return (
    <div>
      <Modal
        className={classes.modalContainer}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}