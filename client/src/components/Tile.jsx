import React from 'react';
import axios from 'axios';
import { Grid, Button, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import Link from '@material-ui/core/Link';
import moment from 'moment';
import QuarterRatingRead from './StarRatings.jsx';
import ImgModal from './ImgModal.jsx';
import RenderReviewBody from './RenderReviewBody.jsx';

const useStyles = makeStyles({
  root: {
    width: '90%',
    justify: 'center',
    padding: '10px',
    borderBottom: '1px solid black',
  },
  summary: {
    variant: 'h1',
    color: 'black',
    fontSize: 14,
    fontweight: 'fontWeightBold',

  },
  username: {
    fontSize: 12,
    color: 'gray',

  },
  recommend: {
    margin: '10px 0px',
    color: 'gray',
    display: 'flex',
    alignItems: 'center',
  },
  helpful: {
    margin: '10px 0px',
    color: 'gray',
    display: 'flex',
    alignItems: 'center',
  },
  body: {
    padding: '10px 0px',
    alignItems: 'center',
  },
  response: {
    margin: '10px 0px',
    backgroundColor: '#F5F5F5',
    color: 'black',
  },
  userLine: {
    display: 'flex',
    alignItems: 'center',
  },
});

const Tile = (props) => {
  const classes = useStyles();
  const { data } = props;
  //console.log('props', props);

  function updateHelpful() {
    axios.put(`http://52.26.193.201:3000/reviews/helpful/${data.review_id}`)
      .then(props.handleUpdate());
  }
  function updateReport() {
    axios.put(`http://52.26.193.201:3000/reviews/report/${data.review_id}`);
  }
  return (
    <div className={classes.root}>
      <Grid container className={classes.userLine}>
        <Grid item xs={6} align="left">

          <QuarterRatingRead userRating={data.rating} />
        </Grid>
        <Grid item xs={6} align="right" className={classes.username}>
          {data.reviewer_name}, {moment(data.date).format('MMM Do YYYY')}
        </Grid>
      </Grid>
      <Typography className={classes.summary} gutterBottom>
        <b>{data.summary}</b>
      </Typography>

      {/* Default: display 250 chars of the body */}
      {(data.body.length <= 250)
        ? (
          <Typography className={classes.body}>
            {data.body}
          </Typography>
        ) : (
          <Typography className={classes.body}>
            <RenderReviewBody body={data.body} />
          </Typography>
        )}
      {/* who the user recommend */}
      {(data.recommend === 1)
        ? (
          <Typography className={classes.recommend}>
            <CheckIcon /> I recommend this product
          </Typography>
        ) : null }
      {/* show thumbnail images */}
      <Grid container alignItems='center' spacing={2}>
        {(data.photos.length === 0) ? null : data.photos.map((photo, index) => (
          <Grid item container justify='center' xs={12} sm={4} md={2} key={index}>
            <img height={70} src={photo.url} alt="new" />
          </Grid>
        ))}
      </Grid>
      {/* Response from the server */}
      {(data.response !== null)
        ? (
          <Typography className={classes.response}>
            <b>Response from seller</b> <br />
            {data.response}
          </Typography>
        ) : null }
      <Grid item>
        <Typography className={classes.helpful}>
          Helpful?<span>&nbsp;</span><Link underlineHover onClick={updateHelpful}>Yes</Link><span>&nbsp;</span>({data.helpfulness}) | ( <Link underlineHover onClick={updateReport}> Report </Link> )
        </Typography>
      </Grid>
    </div>
  );
};

export default Tile;
