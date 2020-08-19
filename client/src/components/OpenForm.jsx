import React, { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Tooltip, FormControlLabel, Typography, Container, RadioGroup, Radio } from '@material-ui/core';
import { Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: 1,
    fontSize: 12,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cancel: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
}));

const overallStarLabels = {
  1: 'Poor',
  2: 'Fair',
  3: 'Average',
  4: 'Good',
  5: 'Great',
};

const characteristicTags = {
  Size: ['Too Small', 'Too Large'],
  Width: ['Too Narrow', 'Too Wide'],
  Comfort: ['Uncomfortable', 'Perfect'],
  Quality: ['Poor', 'Perfect'],
  Length: ['Runs Short', 'Runs Long'],
  Fit: ['Runs Tight', 'Runs Loose'],
};
const characteristicLabels = {
  Size: ['A size too small', '½ a size too small', 'perfect', '½ a size too big', 'A size too Too Large'],
  Width: ['Too Narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too Wide'],
  Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
  Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
  Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  Fit: ['Runs Tight', 'Runs slightly tight', 'Perfect', 'Runs slightly loose', 'Runs loose'],
};

export default function OpenForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit } = useForm();
  const [bodyLength, setBodyLength] = useState(0);
  const [summaryLength, setSummaryLength] = useState(0);
  const [value, setValue] = React.useState(null);
  const [hover, setHover] = React.useState(-1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValue(null);
  };

  const postToAPI = (data) => {
    axios.post(
      `http://52.26.193.201:3000/reviews/${props.prodData.id}`,
      data,
    )
      .then(() => {
        props.handleUpdate();
      })
      .then(() => {
        handleClose();
      });
  };

  const handleBodyChange = (event) => {
    setBodyLength(event.target.value.length);
  };

  const handleSummaryChange = (event) => {
    setSummaryLength(event.target.value.length);
  };

  // console.log('openForm props', props.meta);
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Review +
      </Button>
      {/* Setting up the dialog/modal */}
      <Dialog disableBackdropClick open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle id="title">Write A Review</DialogTitle>
        <DialogContent>
          <Typography>
            About the &nbsp
            <b>{props.prodData.name}</b>
            .
          </Typography>
        </DialogContent>
        <DialogContent>
          <Container component="main">
            <div className={classes.paper}>
              {/* Setting up the form and submit handler */}
              <form
                className={classes.form}
                onSubmit={handleSubmit((FormData) => {
                  FormData.rating = value;
                  FormData.rating = JSON.parse(FormData.rating);
                  FormData.recommend = JSON.parse(FormData.recommend);
                  FormData.photos = [];
                  console.log("formData", FormData);
                  const toAPI = { characteristics: {} };
                  Object.keys(FormData).forEach((key) => (['rating', 'summary', 'body', 'recommend', 'name', 'email', 'photos'].includes(key)) ? toAPI[key] = FormData[key] : toAPI.characteristics[`${key}`] = FormData[`${key}`]);

                  // console.log('API', toAPI, typeof toAPI.rating, typeof toAPI.recommend, typeof toAPI.characteristics[1]);

                  postToAPI(toAPI);
                })}
              >
                {/* overall Rating */}
                <DialogContentText>
                  Overall Rating Stars
                  <span style={{ color: 'red' }}>*</span>
                </DialogContentText>
                <FormControl
                  name="rating"
                  inputRef={register({ require: true })}
                  required
                  className={classes.root}
                >
                  <Rating
                    name="rating"
                    inputRef={register({ require: true })}
                    required
                    value={value}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                  />
                  {value !== null && <Box ml={2}>{overallStarLabels[hover !== -1 ? hover : value]}</Box>}
                  {(value === null) ? <Typography style={{ color: 'red' }} variant="caption">Please rate this product</Typography> : null}
                </FormControl>
                {/* recommend this product */}
                <DialogContentText>
                  Would you recommend this product?
                  <span style={{ color: 'red' }}>*</span>
                </DialogContentText>
                <RadioGroup row name="recommend" defaultValue="true" inputRef={register({ require: true })} required>
                  <FormControlLabel
                    value="false"
                    control={<Radio required color="primary" />}
                    label="no"
                    name="recommend"
                    labelPlacement="bottom"
                    inputRef={register({ require: true })}
                    required
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio required color="primary" />}
                    label="yes"
                    labelPlacement="bottom"
                    name="recommend"
                    inputRef={register({ require: true })}
                    required
                  />
                </RadioGroup>
                {/* Characteristics */}
                {(!props.meta) ? null : Object.keys(props.meta).map((characteristic, idx) => (
                  <Fragment key={idx.toString}>
                    <DialogContentText>
                      {characteristic}
                      <span style={{ color: 'red' }}>*</span>
                    </DialogContentText>
                    <RadioGroup
                      row
                      name={characteristic}
                      inputRef={register({ require: true })}
                      required
                      noWrap
                    >
                      <Grid container justify="space-between">
                        {characteristicLabels[characteristic].map((label, index) => (
                          <Tooltip title={label} placement="top" arrow key={index.toString}>
                            <FormControlLabel
                              value={`${index + 1}`}
                              control={<Radio required color="primary" />}
                              label={(index === 0) ? characteristicTags[characteristic][0] : (index === 4) ? characteristicTags[characteristic][1] : null}
                              name={props.meta[characteristic].id}
                              inputRef={register({ require: true })}
                              required
                              labelPlacement="bottom"
                            />
                          </Tooltip>
                        ))}
                      </Grid>
                    </RadioGroup>
                  </Fragment>
                ))}
                <DialogContentText>
                  Product Summary
                  <span style={{ color: 'red' }}>*</span>
                </DialogContentText>
                <TextField
                  inputRef={register({ require: true, maxLength: 60 })}
                  required
                  margin="normal"
                  fullWidth
                  id="summary"
                  label="Example: Best purchase ever!"
                  name="summary"
                  onChange={handleSummaryChange}
                  autoFocus
                />
                {(summaryLength > 60)
                  ? (
                    <Typography style={{ color: 'red' }} variant="caption">
                      <b>{summaryLength - 60}</b> characters over maximum character length:&nbsp;
                    </Typography>
                  )
                  : <p>{60 - summaryLength} characters left</p>}
                <DialogContentText>
                  Product Review
                  <span style={{ color: 'red' }}>*</span>
                </DialogContentText>
                <TextField
                  inputRef={register({ require: true, minLength: 50, maxLength: 1000 })}
                  required
                  margin="normal"
                  multiline
                  fullWidth
                  name="body"
                  label="Why did you like the product or not?"
                  id="body"
                  onChange={handleBodyChange}
                />
                {(bodyLength < 50)
                  ? (
                    <Typography style={{ color: 'red' }} variant="caption">
                      Minimum required characters left:&nbsp;
                      <b>{50 - bodyLength}</b>
                    </Typography>
                  )
                  : <p>Minimum reached</p>}
                <DialogContentText>
                  Name
                  <span style={{ color: 'red' }}>*</span>
                </DialogContentText>
                <TextField
                  inputRef={register({ require: true })}
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="Example: jackson11!"
                  id="name"
                />
                <p>For privacy reasons, do not use your full name or email addres</p>
                <DialogContentText>
                  Email
                  <span style={{ color: 'red' }}>*</span>
                </DialogContentText>
                <TextField
                  inputRef={register({ require: true })}
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Example: jackson11!"
                  id="email"
                />
                <Button type="submit" color="primary">
                  Submit
                </Button>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </form>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
}
