import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return value;
}

export default function SettingsSlider({name, setter}) {
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // setter(newValue)
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {name}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}