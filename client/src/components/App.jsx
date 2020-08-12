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
      product_id: 1,
      listIsLoading: true,
      metaIsLoading: true,
      nubOfProducts: null,
      prodDataIsLoading: true,
      list: [],
      meta: {},
      sortBy: 'relevant',
      prodData: {},
    };

    this.handleChangeSort = this.handleChangeSort.bind(this);
  }

  handleChangeSort(event) {
    this.setState({ sortBy: event.target.value })
    const { list } = this.state
    this.setState({
      list: list.sort((a, b) => a.date > b.date)
    })
  }

  componentDidMount() {
    axios.get(`${url}/reviews/${this.state.product_id}/list?count=100&sort=${this.state.sortBy}`)
      .then((res) => {
        this.setState({ list: res.data.results, nubOfProducts: res.data.product });
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
      })
      .then(() => this.setState({ prodDataIsLoading: false }));
  }

  render() {
    console.log("prod data", this.state.prodData)
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
            {(this.state.listIsLoading) ? <p>loading</p>
              : (
                <Typography gutterBottom>
                  <b>{this.state.list.length}</b>
                  <b> reviews, sorted by </b>
                  <b>
                    <select value={this.state.sortBy} onChange={this.handleChangeSort}>
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
                  />
                )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
