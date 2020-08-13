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
    };
  }

  render() {
    const cardStyle = {
      border: '2px',
      padding: '4px',
    };

    //console.log("feed", this.props);

    return (
      <div>
        <div>
          {this.state.reviews.map((review, idx) => (
            <div key={idx} style={cardStyle}>
              <Tile data={review} prodID={this.props.prodData.id} handleUpdate={this.props.handleUpdate} />
            </div>
          ))}
        </div>
        <Button variant="outlined">
          MORE REVIEWS
        </Button>
        <OpenForm prodData={this.props.prodData} handleUpdate={this.props.handleUpdate} />
      </div>
    );
  }
}

export default Feed;
