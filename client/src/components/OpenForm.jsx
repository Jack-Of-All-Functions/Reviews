import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
}));

export default function OpenForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit } = useForm();
  const [bodyLength, setBodyLength] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Review +
      </Button>
      <Dialog disableBackdropClick open={open} onClose={handleClose}>
        <DialogTitle id="title">Write A Review</DialogTitle>
        <DialogContent>
          <Typography fontSize="5">
            About the <b>{props.prodData.name}</b>.
          </Typography>
        </DialogContent>
        <DialogContent>
          <Container component="main">
            <div className={classes.paper}>
              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit((postData) => {
                  postData.rating = JSON.parse(postData.rating);
                  postData.recommend = JSON.parse(postData.recommend);
                  postData.characteristics = {};
                  postData.photos = [];
                  console.log(props.prodData.id, postData);
                  postToAPI(postData);
                })}
              >
                <DialogContentText>
                  Overall Rating
                </DialogContentText>
                <RadioGroup row labelPlacement="top" name="rating" inputRef={register({ require: true })}>
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="poor"
                    labelPlacement="top"
                    name="rating"
                    inputRef={register}
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio color="primary" />}
                    label="fair"
                    labelPlacement="top"
                    name="rating"
                    inputRef={register}
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio color="primary" />}
                    label="average"
                    labelPlacement="top"
                    name="rating"
                    inputRef={register}
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio color="primary" />}
                    label="good"
                    labelPlacement="top"
                    name="rating"
                    inputRef={register}
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio color="primary" />}
                    label="great"
                    labelPlacement="top"
                    name="rating"
                    inputRef={register}
                  />
                </RadioGroup>
                {/* recommend this product */}
                <DialogContentText>
                  Do you recommend this product?
                </DialogContentText>
                <RadioGroup row name="recommend" defaultValue="true" inputRef={register({ require: true })} required>
                  <FormControlLabel
                    value="false"
                    control={<Radio color="primary" />}
                    label="no"
                    name="recommend"
                    labelPlacement="top"
                    inputRef={register}
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio color="primary" />}
                    label="yes"
                    labelPlacement="top"
                    name="recommend"
                    inputRef={register}
                  />
                </RadioGroup>
                <DialogContentText>
                  Product Summary
                </DialogContentText>
                <TextField
                  inputRef={register({ maxLength: 60 })}
                  margin="normal"
                  required
                  fullWidth
                  id="summary"
                  label="Example: Best purchase ever!"
                  name="summary"
                  autoFocus
                />
                <DialogContentText>
                  Product Review
                </DialogContentText>
                <TextField
                  inputRef={register({ minLength: 50, maxLength: 1000 })}
                  margin="normal"
                  multiline
                  required
                  fullWidth
                  name="body"
                  label="Why did you like the product or not?"
                  id="body"
                  onChange={handleBodyChange}
                />
                {(bodyLength < 50)
                  ? <p>Minimum required characters left: {50 - bodyLength}</p>
                  : <p>Minimum reached</p>}
                <DialogContentText>
                  Name
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
                <Button onClick={handleClose} className={classes.submit}>
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
