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
      <Grid Container>
        <Grid container xs={12}>
          Ratings and Reviews
        </Grid>
        <Grid container >
          <Grid container xs={3} >
            <OverallRating />
            <Grid >
              <grid>
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
              </grid>
              <Grid>
                size / comfort goes here
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={8}>
            <Grid container xs={12}>
              <ReviewFeed />
            </Grid>
          </Grid>
          <Grid item xs={8}>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default App;