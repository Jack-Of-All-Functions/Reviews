/* eslint-disable no-nested-ternary */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tile from './Tile.jsx';
import OpenForm from './OpenForm.jsx';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsDisplayed: 2,
    };
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
    this.handleViewAllReviews = this.handleViewAllReviews.bind(this);
  }

  handleMoreReviews() {
    this.setState({ reviewsDisplayed: this.state.reviewsDisplayed + 2 });
  }

  handleViewAllReviews() {
    const { list } = this.props;
    this.setState({ reviewsDisplayed: list.length });
  }

  render() {
    const { list } = this.props;
    const cardStyle = {
      border: '1px',
      padding: '2px',
    };
    const feedOverflow = {
      overflow: 'auto',
      maxHeight: '85vh',
    };
    //console.log('feed', list);

    return (
      <Grid container direction="column">
        <Grid style={feedOverflow} item xs={12}>
          {list.slice(0, this.state.reviewsDisplayed).map((review, idx) => (
            <div key={idx} style={cardStyle}>
              <Tile
                data={review}
                prodID={this.props.prodData.id}
                handleUpdate={this.props.handleUpdate}
              />
            </div>
          ))}
        </Grid>
        <Grid item xs={12}>
          {(list.length > this.state.reviewsDisplayed && this.state.reviewsDisplayed <= 4)
            ? (
              <Button variant="outlined" color="primary" onClick={this.handleMoreReviews}>
                MORE REVIEWS
              </Button>
            )
            : (
              (list.length > this.state.reviewsDisplayed)
                ? (
                  <Button variant="outlined" color="primary" onClick={this.handleViewAllReviews}>
                    View All REVIEWS
                  </Button>
                )
                : null
            )}
          <OpenForm
            prodData={this.props.prodData}
            meta={this.props.meta}
            handleUpdate={this.props.handleUpdate}
          />
        </Grid>
      </Grid>
    );
  }
}

export default Feed;
