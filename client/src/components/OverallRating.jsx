import React from "react";
import ReactDOM from "react-dom";
import QuarterRatingRead from "./StarRatings.jsx";
import BarStat from "./BarStat.jsx";
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";

var average = function (ratings) {
  var sum = 0;
  var total = 0;
  for (var key in ratings) {
    sum = sum + Number(key)*ratings[key];
    total += ratings[key]
  }
  var ave = sum  / total;
  return ave.toFixed(1)
}

var percentRecommend = function (recommend) {
  var percent = recommend[1] / (recommend[0] + recommend[1]) * 100
  return percent.toFixed(0)
}


class OverallRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: this.props.meta,
      filter: null,
      average: average(this.props.meta.ratings),
    }
  }



  render() {
    console.log(this.props.meta)
    console.log(average(this.props.meta.ratings))
    return (
      <Grid container direction="column">
        <Grid container item className="aveWithStars">
          <Grid item xs={4} className="ave">
            <Typography className="overallRating" gutterBottom>
              {this.state.average}
            </Typography>
          </Grid>
          <Grid item xs={8} className="stars">
            <QuarterRatingRead userRating={3.3} />
          </Grid>
        </Grid>
        <Grid item className="recommend">
          {percentRecommend(this.state.meta.recommended)}% of reviewers recommend this product
        </Grid>
        <Grid item className='barStats'>
          {Object.keys(this.state.meta.ratings).map((key, index) => {
            console.log("from OR", key, ",", this.state.meta.ratings[key]);
            return ( <BarStat rating={key} key={index} /> )
            })
          }
        </Grid>
      </Grid>
    )
  }
}

export default OverallRating;
