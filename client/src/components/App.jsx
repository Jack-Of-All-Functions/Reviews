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
      meta: {},
      sortBy: 'relevant',
      prodData: {},
      filterByStarRating: [],
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleFilterByStarRating = this.handleFilterByStarRating.bind(this);
    this.getListAndSetState = this.getListAndSetState.bind(this);
    this.getMetaAndSetState = this.getMetaAndSetState.bind(this);
    this.getProdDataAndSetState = this.getProdDataAndSetState.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
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

  handleFilterByStarRating(event) {
    const { filterByStarRating } = this.state;
    const clickedKey = Number(event.target.name);
    const indexOfClicked = filterByStarRating.indexOf(clickedKey);
    let updateFilter;
    if (indexOfClicked === -1) {
      updateFilter = [clickedKey, ...filterByStarRating];
    } else if (indexOfClicked > -1) {
      updateFilter = [];
      filterByStarRating.forEach((el) => {
        if (el !== clickedKey) {
          updateFilter.push(el);
        }
      });
    }
    this.setState({ filterByStarRating: updateFilter });
    event.preventDefault;
  }

  resetFilter(event) {
    this.setState({ filterByStarRating: [] });
  }

  render() {
    const { meta, metaIsLoading, listIsLoading, rawList, sortBy, filterByStarRating } = this.state;
    return (
      <div>
        <Grid container style={{ padding: '10px' }}>
          <Grid item xs={12} className="title">
            Ratings & Reviews
          </Grid>
          <Grid container direction="column">
            <Grid container spacing={3} direction="row">
              <Grid item xs={12} sm={4} md={3} className="ratings">
                {(metaIsLoading)
                  ? <p> Loading Ratings </p> : <OverallRating meta={meta} />}
                <Grid container direction="column">
                  {(metaIsLoading)
                    ? <p> Loading Ratings </p>
                    :
                    (
                      <BarStat
                        ratings={meta}
                        resetFilter={this.resetFilter}
                        handleFilter={this.handleFilterByStarRating}
                        starFilters={this.state.filterByStarRating}
                      />
                    )
                  }
                </Grid>
                <Grid item className="characteristics">
                  {(metaIsLoading)
                    ? <p> Loading Ratings </p> : <Characteristics meta={meta.characteristics} />}
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={8} md={9}>
                <Grid item xs={12}>
                  {(listIsLoading) ? <p>Loading</p>
                    : (
                      <Typography gutterBottom>
                        <b>{rawList.length}</b>
                        <b> reviews, sorted by </b>
                        <b>
                          <select value={sortBy} style={{ backgroundColor: '#FFFFFF4D', color: "white" }} onChange={this.handleUpdate}>
                            <option value="relevent">relevance</option>
                            <option value="helpful">helpful</option>
                            <option value="newest">newest</option>
                          </select>
                        </b>
                      </Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                  {(listIsLoading)
                    ? <p>loading</p>
                    : (
                      <Feed
                        meta={meta.characteristics}
                        list={
                          (filterByStarRating.length === 0)
                            ? rawList
                            :
                            (rawList.filter(review => filterByStarRating.includes(review.rating)))
                        }
                        sortBy={sortBy}
                        prodData={this.state.prodData}
                        filter={filterByStarRating}
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
