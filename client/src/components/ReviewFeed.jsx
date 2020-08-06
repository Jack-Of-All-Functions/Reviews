import React from "react";
import ReactDOM from "react-dom";
import ReviewTile from "./ReviewTile.jsx"


class ReviewFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <div>
          Reviews sorted by
        </div>
        <div>
          <ReviewTile />
        </div>

      </div>
    )
  }
}

export default ReviewFeed;