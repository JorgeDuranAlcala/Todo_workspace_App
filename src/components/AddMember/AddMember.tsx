import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography, TextField, Button } from '@material-ui/core';
import { addNewMember } from '../../api';
import { getLocalStorage } from '../../utils/manageLocalStorage';

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
    },
    btn: {
      marginRight: '2vmin'
    }
  }),
);

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value }  = e.target;
        setInput(value)
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOpen(false)
    const groupName = getLocalStorage('currGroup')
    if (groupName)  { 
      const data = await addNewMember(groupName, input) 
      console.log(data)
    }
}

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h4" className={classes.title}>Add New Member</Typography>
     {/* <h2 id="simple-modal-title">Create work spce group</h2> */}
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField className={classes.fiels} name="groupName" onChange={e=>handleChange(e)} label="Group Name" variant="outlined"/>
        <Button color="secondary" variant="contained" type="submit">Add</Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button type="button" className={classes.btn} variant="outlined" color="secondary" onClick={handleOpen}>
        Add Members
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
