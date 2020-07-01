import React, { FunctionComponent, useState } from 'react'
import classes from "./ChangeGroup.module.css";
import { Button, Modal, Typography, TextField } from '@material-ui/core';
import { User } from '../../interfaces/responseTodo';
import { setLocalStorage } from '../../utils/manageLocalStorage';

interface Props {
    user: User;
}

const ChangeGroup: FunctionComponent<Props> = ({ user }) => {

       const [open, setOpen] = useState(false)

    const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const groupName = e.currentTarget.textContent as string;
        setLocalStorage('currGroup', groupName)
        console.log(groupName)
        setOpen(false);
    };
      
    const handleOpen = () => {
        setOpen(true)
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        
    }


    const body = (
        <div className={classes.paper}>
            { 
                user?.groups?.map(groupName => {
                return <Button variant="outlined" color="primary"  onClick={e => handleClose(e)}>
                    {groupName}
                </Button>
                })
            }
        </div>
    )

    return (
        <div >
            <Button type="button" 
                className={classes.btn} 
                variant="contained" 
                color="secondary" 
                onClick={handleOpen}
                >
            Change Group
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
        >
            {body}
        </Modal>
        </div>
    )
}

export default ChangeGroup
