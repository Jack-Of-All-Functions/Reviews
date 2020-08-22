import React, { Fragment } from 'react';
import { Grid, Box, Link, Typography } from '@material-ui/core';

export default function BarStat(props) {
  const ratings = {
    5: props.ratings.ratings['5'] || 0,
    4: props.ratings.ratings['4'] || 0,
    3: props.ratings.ratings['3'] || 0,
    2: props.ratings.ratings['2'] || 0,
    1: props.ratings.ratings['1'] || 0,
  };

  const numOfRatings = ratings['1'] + ratings['2'] + ratings['3'] + ratings['4'] + ratings['5'];
  const { starFilters } = props;
  starFilters.sort();

  return (
    <>
      {(starFilters.length === 0) ? null :
        (starFilters.length === 1) ? <Grid>{starFilters[0]} star reviews.</Grid> :
          (starFilters.length === 2) ? <Grid>{starFilters[0]}, {starFilters[1]} star reviews.</Grid> :
          (starFilters.length === 3) ? <Grid>{starFilters[0]}, {starFilters[1]}, and {starFilters[2]} star reviews.</Grid> :
            (starFilters.length === 4) ? <Grid>{starFilters[0]}, {starFilters[1]}, {starFilters[2]}, and {starFilters[3]} star reviews.</Grid> : <Grid>{starFilters[0]}, {starFilters[1]}, {starFilters[2]}, {starFilters[3]}, and {starFilters[4]} star reviews.</Grid>
      }
      {(starFilters.length > 0) ? (<><Link onClick={props.resetFilter} style={{ cursor: 'pointer' }}>Show all reviews</Link></>) : null}
      {Object.keys(ratings).map((rating) => {
        const percent = (ratings[rating] / numOfRatings) * 100;
        const percentString = `${percent}%`;
        const strRating = `${rating}`;
        return (
          <Grid key={`${rating} stars`} item container display="flex" alignItems="center">
            <Link onClick={props.handleFilter} style={{ cursor: 'pointer' }} name={strRating}>{rating} Stars</Link>
            <Box display="flex" p={1} flexGrow={1} bgcolor="background.paper">
              <Box my={1} height="85%" width={percentString} bgcolor="#FFB400" color="#FFB400" fontSize={12}>|</Box>
              <Box my={1} height="85%" flexGrow={1} bgcolor="#FFFFFF4D" textAlign="right" fontSize={12}>{ratings[rating]} reviews</Box>
            </Box>
            <Box width="6%"><Typography>{Math.round(percent)}%</Typography></Box>
          </Grid>
        );
      })}
    </>
  );
}
