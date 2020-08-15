import React from 'react';
import { Grid, Box } from '@material-ui/core';

export default function BarStat(props) {
  const ratings = {
    5: props.ratings.ratings['5'] || 0,
    4: props.ratings.ratings['4'] || 0,
    3: props.ratings.ratings['3'] || 0,
    2: props.ratings.ratings['2'] || 0,
    1: props.ratings.ratings['1'] || 0,
  };

  const numOfRatings = ratings['1'] + ratings['2'] + ratings['3'] + ratings['4'] + ratings['5'];

  //console.log(props, ratings, numOfRatings);

  return (
    Object.keys(ratings).map((rating) => {
      const percent = `${(ratings[rating] / numOfRatings) * 100}%`;
      return (
        <Grid item container display="flex" alignItems="center">
          <Box>{rating} Stars</Box>
          <Box height="20" display="flex" p={1} flexGrow={1} bgcolor="background.paper">
            <Box p={1} height="20" width={percent} bgcolor="green" />
            <Box p={1} height="20" flexGrow={1} bgcolor="grey.300" />
          </Box>
        </Grid>
      );
    })
  );
}
