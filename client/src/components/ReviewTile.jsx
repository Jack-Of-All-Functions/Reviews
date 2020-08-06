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


const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  summary: {
    variant: 'h1',
    color: 'black',
    fontSize: 14,
    fonteight: "fontWeightBold",
  },
  username: {
    fontSize: 12,

  },
  recommend: {
    display: "flex",
    alignItems: "center",
  },
});


var ReviewTile = function () {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.username} color="textSecondary" gutterBottom>
          <Grid container xs={12}>
            <Grid xs={6} align="left">
              stars go here
            </Grid>
            <Grid xs={6} align="right">
              username, month DD, YYYY. <br />
              If the review purchased, Show Verified Purchaser
            </Grid>
          </Grid>
        </Typography>
        <Typography className={classes.summary} color="textSecondary" gutterBottom>
          <b>Review Summary, capped at 60 characters.</b>
        </Typography>
        <Typography >
          The review body goes here. Must be at least 50 charaters long and no more than 1000. Initially only show the first 250 charaters.
        </Typography>
        <Typography className={classes.recommend} color="textSecondary">
          <CheckIcon /> <p>I recommend this product</p>
        </Typography>
        <Typography variant="body2" component="p">
          Response from the seller
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}


export default ReviewTile;
