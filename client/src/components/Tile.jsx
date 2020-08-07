import React from "react";
import ReactDOM from "react-dom"
import { Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import QuarterRatingRead from "./StarRatings.jsx";
import moment from 'moment';


const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 250,
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
    display: "flex",
    color: "gray",
    alignItems: "center",
  },
});


var Tile = function (props) {
  const classes = useStyles();
  const curData = props.data;
  const first250Char = curData.body.slice(0, 249)
  console.log(curData)

  return (
    <Card className={classes.root} >
      <CardContent>
        <Grid container>
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
          <Typography >
            <b>Response</b> <br />
            {curData.response}
          </Typography>
          :
          null
        }
      </CardContent>
    </Card>
  );
}


export default Tile;
