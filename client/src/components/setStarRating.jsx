import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const labels = {
  1: 'Poor',
  2: 'Fair',
  3: 'Average',
  4: 'Good',
  5: 'Great',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

const SetRating = function () {
  const [value, setValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);
  const { register, handleSubmit } = useForm();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating
        name="rating"
        value={value}
        precision={1}
        required
        inputRef={register({ required: true })}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
      />
      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
    </div>
  );
};

export default SetRating;
