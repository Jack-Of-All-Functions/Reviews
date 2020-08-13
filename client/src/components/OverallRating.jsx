import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import QuarterRatingRead from './StarRatings.jsx';
import BarStat from './BarStat.jsx';

function average(ratings) {
  let sum = 0;
  let total = 0;
  for (let key in ratings) {
    sum = sum + Number(key)*ratings[key];
    total += ratings[key];
  }
  const ave = sum / total;
  return ave.toFixed(1);
}

function percentRecommend(recommend) {
  const percent = (recommend[1] / (recommend[0] + recommend[1])) * 100;
  return percent.toFixed(0);
}

class OverallRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: this.props.meta,
      filter: null,
      average: average(this.props.meta.ratings),
    };
  }

  render() {
    return (
      <Grid container direction="column">
        <Grid container item justify="space-between" className="aveWithStars">
          <Grid item className="ave">
            <Typography className="overallRating" gutterBottom variant="h3">
              {this.state.average}
            </Typography>
          </Grid>
          <Grid item className="stars" >
            <QuarterRatingRead userRating={this.state.average} />
          </Grid>
        </Grid>
        <Grid item className="recommend">
          {percentRecommend(this.state.meta.recommended)}
          % of reviewers recommend this product
        </Grid>
        <Grid item className='barStats'>
          {Object.keys(this.state.meta.ratings).map((key, index) => {
            return ( <BarStat rating={key} key={index} /> )
          })}
        </Grid>
      </Grid>
    );
  }
}

export default OverallRating;
