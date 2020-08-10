import React from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import OverallRating from './OverallRating.jsx';
import Feed from './Feed.jsx';

const url = 'http://52.26.193.201:3000/reviews';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 5,
      listIsLoading: true,
      metaIsLoading: true,
      list: {},
      meta: {},
    };
  }

  componentDidMount() {
    axios.get(`${url}/${this.state.product_id}/list?count=100`)
      .then((res) => {
        this.setState({ list: res.data });
      })
      .then(() => this.setState({ listIsLoading: false }));

    axios.get(`${url}/${this.state.product_id}/meta?count=100`)
      .then((res) => {
        this.setState({ meta: res.data });
      })
      .then(() => this.setState({ metaIsLoading: false }));
  }

  render() {
    return (
      <div>
        <Grid container className="title">
          Ratings & Reviews
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={4} md={3} className="ratings">
            {(this.state.metaIsLoading)
              ? <p> Loading Ratings </p> : <OverallRating meta={this.state.meta} />}
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
          <Grid container item xs={12} sm={8} md={9}>
            <Grid container>
              {(this.state.listIsLoading)
                ? <p>loading</p> : <Feed data={this.state.list.results} prod_id={this.state.product_id}/>}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
