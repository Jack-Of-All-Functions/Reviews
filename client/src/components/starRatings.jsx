import React from 'react';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

const QuarterRatingRead = function (props) {
  const classes = useStyles();
  const { userRating } = props;

  return (
    <div className={classes.root}>
      <Rating name="quater-rating-read" defaultValue={userRating} precision={0.25} readOnly />
    </div>
  );
};

export default QuarterRatingRead;
