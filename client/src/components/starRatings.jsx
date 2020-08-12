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
  console.log('star', props);

  return (
    <div className={classes.root}>
      <Rating name="quater-rating-read" defaultValue={userRating} precision={0.25} emptyIcon={<StarBorderIcon fontSize="inherit" />} readOnly />
    </div>
  );
};

// const labels = {
//   1: 'Poor',
//   2: 'Fair',
//   3: 'Average',
//   4: 'Good',
//   5: 'Great',
// };

// const useStylesHover = makeStyles({
//   root: {
//     width: 200,
//     display: 'flex',
//     alignItems: 'center',
//   },
// });

// var HoverRating = function () {
//   const [value, setValue] = React.useState(2);
//   const [hover, setHover] = React.useState(-1);
//   const classes = useStylesHover();

//   return (
//     <div className={classes.root}>
//       <Rating
//         emptyIcon={<StarBorderIcon fontSize="inherit" />}
//         name="hover-feedback"
//         value={value}
//         precision={1}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//         onChangeActive={(event, newHover) => {
//           setHover(newHover);
//         }}
//       />
//       {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
//     </div>
//   );
// }

export default QuarterRatingRead;
