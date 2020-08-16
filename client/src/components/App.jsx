import React from 'react';
import axios from 'axios';
import BarStat from './BarStat.jsx';
import { Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import OverallRating from './OverallRating.jsx';
import Feed from './Feed.jsx';
import Characteristics from './Characteristics.jsx';

const url = 'http://52.26.193.201:3000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 1,
      listIsLoading: true,
      metaIsLoading: true,
      list: [],
      meta: {},
      sortBy: 'relevant',
      prodData: {},
      filterByStarRating: null,
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleFilterByStarRating = this.handleFilterByStarRating.bind(this);
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
    const sort = (event) ? event.target.value : this.state.sortBy;
    this.setState({ listIsLoading: true, sortBy: sort });
    setTimeout(() => {
      axios.get(`${url}/reviews/${this.state.product_id}/list?count=100&sort=${sort}`)
        .then((res) => {
          this.setState({ list: res.data.results });
        })
        .then(() => this.setState({ listIsLoading: false }));
    }, 250);
  }

  handleFilterByStarRating(event) {
    this.setState({ filterByStarRating: Number(event.target.name) });
    console.log("clicked", event.target.name);
    event.preventDefault;
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12} className="title">
            Ratings & Reviews
          </Grid>
          <Grid container direction="column">
            <Grid container spacing={3} direction="row">
              <Grid item xs={12} md={4} className="ratings">
                {(this.state.metaIsLoading)
                  ? <p> Loading Ratings </p> : <OverallRating meta={this.state.meta} />}
                <Grid container direction="column">
                  {(this.state.metaIsLoading)
                    ? <p> Loading Ratings </p> : <BarStat ratings={this.state.meta} handleFilter={this.handleFilterByStarRating} />}
                </Grid>
                <Grid item className="characteristics">
                  {(this.state.metaIsLoading)
                    ? <p> Loading Ratings </p> : <Characteristics meta={this.state.meta.characteristics} />}
                </Grid>
              </Grid>
              <Grid container item xs={12} md={8}>
                <Grid item xs={12}>
                  {(this.state.listIsLoading) ? <p>Loading</p>
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
                </Grid>
                <Grid item xs={12}>
                  {(this.state.listIsLoading)
                    ? <p>loading</p>
                    : (
                      <Feed
                        data={this.state.list}
                        sortBy={this.state.sortBy}
                        prodData={this.state.prodData}
                        filter={this.state.filterByStarRating}
                        handleUpdate={this.handleUpdate}
                      />
                    )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
