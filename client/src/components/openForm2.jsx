import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function OpenForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Review
      </Button>
      <Dialog disableBackdropClick open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Write A Review</DialogTitle>
        <DialogContent>
          <Container component="main">
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                About the {props.prodData.name}.
              </Typography>
              <Typography component="h2" variant="h6">
                Description: {props.prodData.description}
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit((data) => console.log(data))}
              >
                <DialogContentText>
                  Overall Rating
                </DialogContentText>
                <RadioGroup row labelPlacement="top" name="overallRating" inputRef={register} required>
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
                <RadioGroup row name="recommend" defaultValue="yes" inputRef={register} required>
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
                  Product Summary
                </DialogContentText>
                <TextField
                  inputRef={register}
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
                  inputRef={register}
                  margin="normal"
                  required
                  fullWidth
                  name="body"
                  label="Why did you like the product or not?"
                  id="body"

                />
                <DialogContentText>
                  Your nickname
                </DialogContentText>
                <TextField
                  inputRef={register}
                  margin="normal"
                  required
                  fullWidth
                  name="nickname"
                  label="Example: jackson11!"
                  id="nickname"
                />
                <p>For privacy reasons, do not use your full name or email addres</p>
                <DialogContentText>
                  Email
                </DialogContentText>
                <TextField
                  inputRef={register}
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
        <DialogActions>
        </DialogActions>
      </Dialog>
    </>
  );
}
