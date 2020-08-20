import React, { useState } from 'react';
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
    width: '100%',
    padding: '8px',
    borderBottom: '1px solid black',
    display: 'flex',
    flexGrow: '1',
  },
  summary: {
    variant: 'h1',
  },
  username: {
    fontSize: 10,
    color: 'gray',
  },
  recommend: {
    margin: '8px 0px',
    color: 'gray',
    display: 'flex',
    alignItems: 'center',
  },
  helpful: {
    margin: '8px 0px',
    color: 'gray',
    display: 'flex',
  },
  body: {
    // padding: '10px 0px',
    justifyContent: 'flex-start',
  },
  response: {
    margin: '8px 0px',
    backgroundColor: '#FFFFFF4D',
    paddingLeft: '3px',

  },
  userLine: {
    display: 'flex',
    alignItems: 'center',
  },
});

const Tile = (props) => {
  const classes = useStyles();
  const { data } = props;
  const [helpful, setHelpful] = useState(data.helpfulness);

  function updateHelpful(event) {
    setHelpful(helpful + 1);
    axios.put(`http://52.26.193.201:3000/reviews/helpful/${data.review_id}`)
    //.then(props.handleUpdate());
  }
  function updateReport() {
    axios.put(`http://52.26.193.201:3000/reviews/report/${data.review_id}`)
      .then(props.handleUpdate());
  }

  return (
    <Grid container className={classes.root}>
      <Grid container item className={classes.userLine}>
        <Grid item xs={6} align="left">
          <QuarterRatingRead userRating={data.rating} />
        </Grid>
        <Grid item xs={6} align="right" className={classes.username}>
          <Typography className={classes.username}>
            {data.reviewer_name}, {moment(data.date).format('MMM Do YYYY')}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.summary} gutterBottom>
          <b>{data.summary}</b>
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.body}>
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
      </Grid>
      <Grid item xs={12}>
        {/* who the user recommend */}
        {(data.recommend === 1)
          ? (
            <Typography className={classes.recommend}>
              <CheckIcon /> I recommend this product
            </Typography>
          ) : null}
      </Grid>
      {/* show thumbnail images */}
      <Grid container alignItems='center' spacing={2}>
        {(data.photos.length === 0) ? null : data.photos.map((photo) => (
          <Grid item container justify='center' xs={12} sm={4} md={2} key={photo.id}>
            <img height={70} src={photo.url} alt="new" />
          </Grid>
        ))}
      </Grid>
      {/* Response from the server */}
      <Grid item xs={12}>
        {(data.response !== null)
          ? (
            <Typography className={classes.response} bgcolor="grey.300">
              <b>Response from seller</b>
              <br />
              {data.response}
            </Typography>
          ) : null}
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.helpful}>
          Helpful?<span>&nbsp;</span><Link onClick={updateHelpful} style={{ cursor: 'pointer' }}>Yes</Link><span>&nbsp;</span>({helpful}) | ( <Link onClick={updateReport} style={{ cursor: 'pointer' }}> Report </Link> )
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Tile;
