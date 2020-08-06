import React from "react";
import ReactDOM from "react-dom";
import { Grid } from "@material-ui/core"

class OverallRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Grid item xs={12}>
          this is the overall rating and % recommended
      </Grid>
    )
  }
}

export default OverallRating;
