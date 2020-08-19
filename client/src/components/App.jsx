import React from 'react';
import axios from 'axios';
import { Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import BarStat from './BarStat.jsx';
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
      rawList: [],
      listToRender: null,
      meta: {},
      sortBy: 'relevant',
      prodData: {},
      filterByStarRating: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      },
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleFilterByStarRating = this.handleFilterByStarRating.bind(this);
    this.getListAndSetState = this.getListAndSetState.bind(this);
    this.getMetaAndSetState = this.getMetaAndSetState.bind(this);
    this.getProdDataAndSetState = this.getProdDataAndSetState.bind(this);
  }

  componentDidMount() {
    this.getListAndSetState(this.state.sortBy);
    this.getMetaAndSetState();
    this.getProdDataAndSetState();
  }

  getListAndSetState(sort) {
    axios.get(`${url}/reviews/${this.state.product_id}/list?count=100&sort=${sort}`)
      .then((res) => {
        this.setState({ rawList: res.data.results });
      })
      .then(() => this.setState({ listIsLoading: false }));
  }

  getMetaAndSetState() {
    axios.get(`${url}/reviews/${this.state.product_id}/meta?count=100`)
      .then((res) => {
        this.setState({ meta: res.data });
      })
      .then(() => this.setState({ metaIsLoading: false }));
  }

  getProdDataAndSetState() {
    axios.get(`${url}/products/${this.state.product_id}`)
      .then((res) => {
        this.setState({ prodData: res.data });
      });
  }

  handleUpdate(event) {
    const curSort = (event) ? event.target.value : this.state.sortBy;
    if (event) {
      this.setState({ listIsLoading: true, sortBy: curSort });
      setTimeout(() => {
        this.getListAndSetState(curSort);
      }, 250);
    } else {
      this.setState({ listIsLoading: true, metaIsLoading: true, sortBy: curSort });
      setTimeout(() => {
        this.getListAndSetState(curSort);
        this.getMetaAndSetState();
      }, 250);
    }
  }

  // this needs attention!!!!
  handleFilterByStarRating(event) {
    const clickedKey = event.target.name;
    const updateFilter = {};
    Object.keys(this.state.filterByStarRating).forEach((filterKey) => {
      if (clickedKey === filterKey) {
        updateFilter[`${filterKey}`] = !(this.state.filterByStarRating[`${filterKey}`]);
      }
      if (clickedKey !== filterKey) {
        updateFilter[`${filterKey}`] = (this.state.filterByStarRating[`${filterKey}`]);
      }
    });
    this.setState({ filterByStarRating: updateFilter });
    const filterBy = [];
    Object.keys(updateFilter).forEach((starValue) => {
      if (updateFilter[`${starValue}`]) {
        filterBy.push(starValue);
      }
    });
    console.log(updateFilter, filterBy, "rawList", this.state.rawList);
    const filteredList = this.state.rawList.filter((review) => review.rating === 1);
    console.log(filteredList);
    const render = (filterBy.length === 0) ? this.state.rawList : filteredList;
    this.setState({ listToRender: render });
    event.preventDefault;
  }

  render() {
    //console.log("OG list", this.state.rawList);
    return (
      <div>
        <Grid container style={{ padding: '10px' }}>
          <Grid item xs={12} className="title">
            Ratings & Reviews
          </Grid>
          <Grid container direction="column">
            <Grid container spacing={3} direction="row">
              <Grid item xs={12} sm={4} md={3} className="ratings">
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
              <Grid container item xs={12} sm={8} md={9}>
                <Grid item xs={12}>
                  {(this.state.listIsLoading) ? <p>Loading</p>
                    : (
                      <Typography gutterBottom>
                        <b>{this.state.rawList.length}</b>
                        <b> reviews, sorted by </b>
                        <b>
                          <select value={this.state.sortBy} style={{ backgroundColor: '#FFFFFF4D', color: "white"}} onChange={this.handleUpdate}>
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
                        meta={this.state.meta.characteristics}
                        list={this.state.listToRender || this.state.rawList}
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
