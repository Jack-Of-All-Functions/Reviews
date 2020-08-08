import React from "react";
import ReactDOM from "react-dom"
import { Grid, ButtonBase } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import { gray, blue } from '@material-ui/core/colors';

import QuarterRatingRead from "./StarRatings.jsx";
import moment from 'moment';


const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: 10,
  },
  summary: {
    variant: 'h1',
    color: 'black',
    fontSize: 14,
    fontweight: "fontWeightBold",
    padding: 10,

  },
  username: {
    padding: 10,
    fontSize: 12,
    color: "gray",

  },
  recommend: {
    padding: 10,
    color: "gray",
    display: "flex",
    alignItems: "center",
  },
  helpful: {
    padding: 10,
    color: "gray",
    display: "flex",
    alignItems: "center",
  },
  response: {
    padding: 10,
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
    <Card className={classes.root} >
      <CardContent>
        <Grid container className={classes.userLine}>
          <Grid item xs={6} align="left">
            < QuarterRatingRead userRating={curData.rating} />
          </Grid>
          <Grid item xs={6} align="right" className={classes.username}>
            {curData.reviewer_name}, {moment().format("MMM Do YYYY")} <br />
              If the review purchased, Show Verified Purchaser
            </Grid>
        </Grid>
        <Typography className={classes.summary} gutterBottom>
          <b>{curData.summary}</b>
        </Typography>

        {/* Default: display 250 chars of the body */}
        {(curData.body.length <= 250) ?
          <Typography >
            {curData.body}
          </Typography>
          :
          <div>
            <Typography>
              {first250Char}...
            </Typography>
            <Button size="small">Continue Reading</Button>
          </div>
        }
        {/* who the user recommend */}
        {(curData.recommend === 1) ?
          <Typography className={classes.recommend}>
            <CheckIcon /> I recommend this product
          </Typography>
          :
          null
        }
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
      </CardContent>
    </Card>
  );
}

export default Tile;
