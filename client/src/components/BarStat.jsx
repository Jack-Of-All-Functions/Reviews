import React from 'react';
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
  console.log(starFilters);

  const filterBreakDown = function(filter) {
    if (filter.length === 0) {
      return null;
    } else if (filter.length === 1) {
      return (
        <Grid>
          Showing {filter[0]} star ratings. <Link>See all reviews</Link>
        </Grid>
      )
    }
  };

  return (
    Object.keys(ratings).map((rating) => {
      const percent = (ratings[rating] / numOfRatings) * 100;
      const percentString = `${percent}%`;
      const strRating = `${rating}`;
      return (
        <Grid item container display="flex" alignItems="center">
          <Link onClick={props.handleFilter} style={{ cursor: 'pointer' }} name={strRating}>{rating} Stars</Link>
          <Box display="flex" p={1} flexGrow={1} bgcolor="background.paper">
            <Box my={1} height="85%" width={percentString} bgcolor="#FFB400" color="#FFB400" fontSize={12}>|</Box>
            <Box my={1} height="85%" flexGrow={1} bgcolor="#FFFFFF4D" textAlign="right" fontSize={12}>{ratings[rating]} reviews</Box>
          </Box>
          <Box width="6%"><Typography>{Math.round(percent)}%</Typography></Box>
        </Grid>
      );
    })
  );
}
