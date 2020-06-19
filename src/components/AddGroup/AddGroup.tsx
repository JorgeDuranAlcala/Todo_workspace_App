import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography, TextField, Button } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    fiels: {
        margin: '1vmin 0 2.5vmin 0',
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      padding: '2.5vmin 0'
    }
  }),
);

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.target.value)
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h4" className={classes.title}>Create work space group</Typography>
     {/* <h2 id="simple-modal-title">Create work spce group</h2> */}
      <form className={classes.form}>
        <TextField className={classes.fiels} name="groupName" onChange={e=>handleChange(e)} label="Group Name" variant="outlined"/>
        <Button color="primary" variant="contained" type="submit">Create Group</Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button type="button" variant="outlined" color="primary" onClick={handleOpen}>
        Create Group
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}