import React, { useState, useEffect, Fragment, useForm } from 'react';
// import useForm from 'react-hook-form';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function OpenForm(props) {
  const [open, setOpen] = React.useState(false);
  // const [prodReviewData, setProdReviewData] = useState({ id: '', img: '', description: '' });

  // console.log('prodData from form', props);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { handleSubmit } = useForm();

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Review
      </Button>
      <Dialog disableBackdropClick open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <Typography variant="h5">
            Write A Review
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form className="form" onSubmit={handleSubmit((data) => console.log(data))}>
            <Grid container>
              <Grid item>
                <Typography variant="h6">
                  About the {props.prodData.name}.
                </Typography>
              </Grid>
              <Grid item padding={3}>
                Description: {props.prodData.description}
              </Grid>
            </Grid>
            {/* overall rating future project: stars */}
            <DialogContentText>
              Overall Rating
            </DialogContentText>
            <RadioGroup row labelPlacement="top" name="overallRating">
              <FormControlLabel
                value="poor"
                control={<Radio color="primary" />}
                label="poor"
                labelPlacement="top"
              />
              <FormControlLabel
                value="fair"
                control={<Radio color="primary" />}
                label="fair"
                labelPlacement="top"
              />
              <FormControlLabel
                value="average"
                control={<Radio color="primary" />}
                label="average"
                labelPlacement="top"
              />
              <FormControlLabel
                value="good"
                control={<Radio color="primary" />}
                label="good"
                labelPlacement="top"
              />
              <FormControlLabel
                value="great"
                control={<Radio color="primary" />}
                label="great"
                labelPlacement="top"
              />
            </RadioGroup>
            {/* recommend this product */}
            <DialogContentText>
              Do you recommend this product?
            </DialogContentText>
            {/* ref={register({ required: true})} */}
            <RadioGroup row name="overallRating" defaultValue="yes" >
              <FormControlLabel
                value="no"
                control={<Radio color="primary" />}
                label="no"
                labelPlacement="top"
              />
              <FormControlLabel
                value="yes"
                control={<Radio color="primary" />}
                label="yes"
                labelPlacement="top"
              />
            </RadioGroup>
            <DialogContentText>
              Review Summary
            </DialogContentText>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="summary"
                label="Example: Best purchase ever!"
                // ref={register({ required: true, minLength: 2 })}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
