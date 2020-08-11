import React from "react";
import ReactDOM from "react-dom";
import { Grid, ButtonBase } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import { gray, blue } from '@material-ui/core/colors';
import QuarterRatingRead from "./StarRatings.jsx";
import ImgModal from './ImgModal.jsx';
import moment from 'moment';
import RenderReviewBody from './RenderReviewBody.jsx';
import { borders } from '@material-ui/system';


const useStyles = makeStyles({
  root: {
    width: "90%",
    justify: "center",
    padding: "10px",
    borderBottom: "1px solid black",
  },
  summary: {
    variant: 'h1',
    color: 'black',
    fontSize: 14,
    fontweight: "fontWeightBold",

  },
  username: {
    fontSize: 12,
    color: "gray",

  },
  recommend: {
    color: "gray",
    display: "flex",
    alignItems: "center",
  },
  helpful: {
    color: "gray",
    display: "flex",
    alignItems: "center",
  },
  body: {
    padding: "10px 0px",
    alignItems: "center",
  },
  response: {
    margin: "10px 0px",
    backgroundColor: '#F5F5F5',
    color: "black",
  },
  userLine: {
    display: "flex",
    alignItems: "center",
  },
});


var Tile = function (props) {
  const classes = useStyles();
  const curData = props.data;
  const first250Char = curData.body.slice(0, 249);

  return (
    <div className={classes.root}>
      <Grid container className={classes.userLine}>
        <Grid item xs={6} align="left">

          <QuarterRatingRead userRating={curData.rating} />
        </Grid>
        <Grid item xs={6} align="right" className={classes.username}>
          {curData.reviewer_name}, {moment(curData.date).format("MMM Do YYYY")} <br />
              If the review purchased, Show Verified Purchaser
            </Grid>
      </Grid>
      <Typography className={classes.summary} gutterBottom>
        <b>{curData.summary}</b>
      </Typography>

      {/* Default: display 250 chars of the body */}
      {(curData.body.length <= 250) ?
        <Typography className={classes.body}>
          {curData.body}
        </Typography>
        :
        <Typography className={classes.body}>
          <RenderReviewBody body={props.data.body} />
        </Typography>
      }
      {/* who the user recommend */}
      {(curData.recommend === 1) ?
        <Typography className={classes.recommend}>
          <CheckIcon /> I recommend this product
          </Typography>
        :
        null
      }
      {/* show thumbnail images */}
      <Grid container alignItems='center' spacing={2} >
        {(props.data.photos.length === 0) ? null : props.data.photos.map((photo, index) => {
          return (
            <Grid item container justify='center' xs={12} sm={4} md={2} key={index}>
              <img height={70} src={photo.url} alt="new" />
            </Grid>
          )
        }
        )}
      </Grid>
      {/* Response from the server */}
      {(curData.response !== null) ?
        <Typography className={classes.response}>
          <b>Response from seller</b> <br />
          {curData.response}
        </Typography>
        :
        null
      }
      <Grid item>
        Helpful? <ButtonBase >Yes</ButtonBase> ({curData.helpfulness})
        </Grid>
    </div>
  );
}

export default Tile;