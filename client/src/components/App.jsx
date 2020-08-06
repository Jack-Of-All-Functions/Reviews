import React from "react";
import ReactDOM from 'react-dom';
import OverallRating from './OverallRating.jsx'
import ReviewFeed from './ReviewFeed.jsx'
import { Grid, Paper } from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render () {
    return (
      <div>
        <Grid container className="title">
          Ratings and Reviews
        </Grid>
        <Grid container>
          <Grid item xs={3} className="ratings">
            <OverallRating />
            <Grid className="starGraph">
              5 stars
              <br />
              4 stars
              <br />
              3 stars
              <br />
              2 stars
              <br />
              1 stars
              <br />
            </Grid>
            <Grid className="size comfort">
              size / comfort goes here
            </Grid>
          </Grid>
          <Grid container item xs={8}>
            <Grid container >
              <ReviewFeed />
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default App;