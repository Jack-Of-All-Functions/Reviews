import React from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import OverallRating from './OverallRating.jsx';
import Feed from './Feed.jsx';

const url = 'http://52.26.193.201:3000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 2,
      listIsLoading: true,
      metaIsLoading: true,
      list: [],
      meta: {},
      sortBy: 'relevant',
      prodData: {},
    };

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    axios.get(`${url}/reviews/${this.state.product_id}/list?count=100&sort=${this.state.sortBy}`)
      .then((res) => {
        this.setState({ list: res.data.results });
      })
      .then(() => this.setState({ listIsLoading: false }));

    axios.get(`${url}/reviews/${this.state.product_id}/meta?count=100`)
      .then((res) => {
        this.setState({ meta: res.data });
      })
      .then(() => this.setState({ metaIsLoading: false }));

    axios.get(`${url}/products/${this.state.product_id}`)
      .then((res) => {
        this.setState({ prodData: res.data });
      });
  }

  handleUpdate(event) {
    let sort;
    if (event) {
      sort = event.target.value;
    } else {
      sort = this.state.sortBy;
    }
    this.setState({ listIsLoading: true, sortBy: sort });
    setTimeout(() => {
      axios.get(`${url}/reviews/${this.state.product_id}/list?count=100&sort=${sort}`)
        .then((res) => {
          this.setState({ list: res.data.results });
        })
        .then(() => this.setState({ listIsLoading: false }));
    }, 250);
  }

  render() {
    return (
      <div>
        <Grid container direction="column">
          <Grid item xs={12} className="title">
            Ratings & Reviews
          </Grid>
          <Grid container spacing={5} direction="row">
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
            <Grid container item xs={12} sm={8} md={9} spacing={5}>
              {(this.state.listIsLoading) ? <p>loading</p>
                : (
                  <Typography gutterBottom>
                    <b>{this.state.list.length}</b>
                    <b> reviews, sorted by </b>
                    <b>
                      <select value={this.state.sortBy} onChange={this.handleUpdate}>
                        <option value="relevent">relevance</option>
                        <option value="helpful">helpful</option>
                        <option value="newest">newest</option>
                      </select>
                    </b>
                  </Typography>
                )}
              <Grid container>
                {(this.state.listIsLoading)
                  ? <p>loading</p>
                  : (
                    <Feed
                      data={this.state.list}
                      sortBy={this.state.sortBy}
                      prodData={this.state.prodData}
                      handleUpdate={this.handleUpdate}
                    />
                  )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
