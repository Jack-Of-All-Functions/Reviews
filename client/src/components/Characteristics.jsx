import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import { sizing } from '@material-ui/system';

const useStyles = makeStyles({
  root: {
    p: 2,
    bgcolor: 'grey.300',
    width: '25%',
    position: 'absolute',
    top: 0,
    zIndex: 'modal',
    display: 'flex',
    flexGrow: '1',
  },
  tile: {
    marginTop: '25px',
  },
});

const characteristicsDescriptions = {
  Size: ['Too Small', 'Prefect', 'Too Large'],
  Width: ['Too Narrow', 'Prefect', 'Too Wide'],
  Comfort: ['Uncomfortable', 'Prefect'],
  Quality: ['Poor', 'Prefect'],
  Length: ['Runs Short', 'Prefect', 'Runs Long'],
  Fit: ['Runs Tight', 'Prefect', 'Runs Loose'],
};

export default function Characteristics(props) {
  //console.log("char meta", props.meta);
  const classes = useStyles();
  return (
    <>
      {Object.keys(props.meta).map((characteristic) => {
        const arrowLoc = `${(props.meta[characteristic].value / 5) * 100}%`;
        //onsole.log(characteristic, arrowLoc);
        return (
          <Grid item container xs={12} my={3} py={3} className={classes.tile}>
            <Grid item xs={12} mt={3}><b>{characteristic}</b></Grid>
            <Grid item spacing={1} xs={12}>
              <Typography
                component="div"
                variant="body1"
                style={{ height: 30, width: '100%', position: 'relative' }}
              >
                <Box
                  p={0}
                  position="absolute"
                  top={0}
                  left={arrowLoc}
                  zIndex="tooltip"
                >
                  <ArrowDropDownIcon style={{ fontSize: 50 }} />
                </Box>
                <Box
                  p={1}
                  bgcolor="grey.300"
                  width="29%"
                  position="absolute"
                  top={10}
                  left="0%"
                  zIndex="modal"
                />
                <Box
                  p={1}
                  bgcolor="grey.300"
                  width="29%"
                  position="absolute"
                  top={10}
                  left="33%"
                  zIndex="modal"
                />
                <Box
                  p={1}
                  bgcolor="grey.300"
                  width="29%"
                  position="absolute"
                  top={10}
                  left="67%"
                  zIndex="modal"
                />
              </Typography>
            </Grid>
            <Grid item container sx={12} justify="space-between">
              {characteristicsDescriptions[characteristic].map((descriptor) => (
                <Grid item>{descriptor}</Grid>
              ))}
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}
