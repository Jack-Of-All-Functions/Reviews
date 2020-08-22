import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';

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
  Size: ['Too Small', 'Perfect', 'Too Large'],
  Width: ['Too Narrow', 'Perfect', 'Too Wide'],
  Comfort: ['Uncomfortable', 'Perfect'],
  Quality: ['Poor', 'Perfect'],
  Length: ['Runs Short', 'Perfect', 'Runs Long'],
  Fit: ['Runs Tight', 'Perfect', 'Runs Loose'],
};

export default function Characteristics(props) {
  //console.log("char meta", props.meta);
  const classes = useStyles();
  return (
    <>
      {Object.keys(props.meta).map((characteristic) => {
        const arrowLoc = `${(props.meta[characteristic].value / 5) * 100}%`;
        return (
          <Grid key={characteristic} item container xs={12} my={3} py={3} className={classes.tile}>
            <Grid item xs={12} mt={3}><b>{characteristic}</b></Grid>
            <Grid item xs={12}>
              <Typography
                component="div"
                variant="body1"
                style={{ height: 20, width: '100%', position: 'relative' }}
              >
                <Box
                  p={0}
                  position="absolute"
                  color='#1e88e5'
                  top={-25}
                  left={arrowLoc}
                  zIndex="1100"
                >
                  <ArrowDropDownIcon style={{ fontSize: 60 }} />
                </Box>
                <Box
                  p={.5}
                  bgcolor="#FFFFFF4D"
                  width="26%"
                  position="absolute"
                  top={0}
                  left="0%"
                  zIndex="mobile stepper"
                />
                <Box
                  p={.5}
                  bgcolor="#FFFFFF4D"
                  width="26%"
                  position="absolute"
                  top={0}
                  left="33.3%"
                  zIndex="mobile stepper"
                />
                <Box
                  p={.5}
                  bgcolor="#FFFFFF4D"
                  width="26%"
                  position="absolute"
                  top={0}
                  left="66.6%"
                  zIndex="mobile stepper"
                />
              </Typography>
            </Grid>
            <Grid item container sx={12} justify="space-between" style={{fontSize:12}}>
              {characteristicsDescriptions[characteristic].map((descriptor) => (
                <Grid key={descriptor} item>{descriptor}</Grid>
              ))}
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}
