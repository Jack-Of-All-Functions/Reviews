import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tile from './Tile.jsx';
import OpenForm2 from './OpenForm2.jsx'

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.data,
    };
  }

  render() {
    const cardStyle = {
      border: '2px',
      padding: '4px',
    };
    return (
      <div>
        <div>
          {this.state.reviews.map((review, idx) =>
            <div key={idx} style={cardStyle}>
              <Tile data={review}  />
            </div>)}
        </div>
        <Button variant="outlined">
          MORE REVIEWS
        </Button>
        <OpenForm2 prodData={this.props.prodData} />
      </div>
    );
  }
}

export default Feed;
