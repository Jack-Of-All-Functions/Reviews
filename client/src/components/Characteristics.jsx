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
});

export default function Characteristics(props) {
  console.log("char meta", props.meta);
  //const classes = useStyles();
  return (
    <>
      {Object.keys(props.meta).map((characteristic) => {
        const arrowLoc = `${(props.meta[characteristic].value / 5) * 100}%`;
        console.log(characteristic, arrowLoc);
        return (
          <Grid item container xs={12}>
            <Grid item xs={12}>{characteristic}</Grid>
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
                  width="25%"
                  position="absolute"
                  top={10}
                  left="0%"
                  zIndex="modal"
                />
                <Box
                  p={1}
                  bgcolor="grey.300"
                  width="25%"
                  position="absolute"
                  top={10}
                  left="34%"
                  zIndex="modal"
                />
                <Box
                  p={1}
                  bgcolor="grey.300"
                  width="25%"
                  position="absolute"
                  top={10}
                  left="68%"
                  zIndex="modal"
                />
              </Typography>
            </Grid>
            <Grid mb={20} item sx={12}>
              <Typography>
                hello all
            </Typography>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}
