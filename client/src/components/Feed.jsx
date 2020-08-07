import React from "react";
import ReactDOM from "react-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Tile from "./Tile.jsx";


class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.data,
    }
  }

  render() {
    return (
      <div>
        <Typography gutterBottom>
          <b>{this.state.reviews.length} reviews, still needs to be sorted</b>
        </Typography>
        <div>
          {this.state.reviews.map((review, i) => {
            return ( <Tile data={review} key={i} /> )
          })}
        </div>

      </div>
    )
  }
}

export default Feed;