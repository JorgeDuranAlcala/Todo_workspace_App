import React, { FunctionComponent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography, TextField, Button } from '@material-ui/core';
import { addNewGroups } from '../../api';

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

interface IProps {
    sendMessage: (message: string | null, err: string | null) => void
}

 const  SimpleModal: FunctionComponent<IProps> = ({ sendMessage }) => {
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
      const { value } = e.target  
      setInput(value)
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setOpen(false)
        const { message } = await addNewGroups(input)
        if(message) {
          sendMessage(message, null)
        }
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h4" className={classes.title}>Create work space group</Typography>
     {/* <h2 id="simple-modal-title">Create work spce group</h2> */}
      <form className={classes.form} onSubmit={onSubmit} >
        <TextField className={classes.fiels} name="groupName" onChange={e=>handleChange(e)} label="Group Name" variant="outlined"/>
        <Button color="primary" variant="contained" type="submit">Create Group</Button>
      </form>
    </div>
  );

  return (
    <>
      <Button 
        type="button" 
        className={classes.btn} 
        variant="contained" 
        color="primary" 
        onClick={handleOpen}
        >
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
    </>
  );
}

export default SimpleModal