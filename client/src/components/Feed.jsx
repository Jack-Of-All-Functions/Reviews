import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tile from './Tile.jsx';
import OpenForm from './OpenForm.jsx'

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.data,
      prod_id: this.props.prod_id,
      sortBy: this.props.sortBy,
    };
    this.createReview = this.createReview.bind(this);

  }

  createReview() {
    //console.log("clicked")
  }

  render() {
    //console.log(this.props)
    return (
      <div>
        <div>
          {this.state.reviews.map((review, idx) => <Tile data={review} key={idx} />)}
        </div>
        <Button variant="outlined">
          MORE REVIEWS
        </Button>
        <OpenForm product_id={this.props.prod_id}/>
      </div>
    );
  }
}

export default Feed;
