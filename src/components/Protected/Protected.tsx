import React, { useEffect} from 'react';
import { verifyGroup } from '../../api';
import { createTodo } from '../../api/todo.api';
import { getLocalStorage } from "../../utils/manageLocalStorage";
import Dashboard from '../Pages/Dashboard/Dashboard';
import { Redirect } from 'react-router-dom';
import { Modal, makeStyles, Theme, createStyles, Button, Typography } from '@material-ui/core';

export interface IProtectedProps {
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
    title: {
        padding: 20
    }
  }),
  );
  
  export function Protected (props: IProtectedProps) {
    const token = getLocalStorage('token')
    const classes = useStyles()
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const data = await verifyGroup('wild project');
                /* const data = await createTodo('wild project', {
                    title: 'random Todo',
                    description: 'A generic description',
                })  
                console.log(data)
                 */
            } catch (error) {
                console.log(error)
            }
            
        }
        fetchData()
    }, [])

    const handleClose = () => {
        setOpen(false);
      };

      const handleOpen = () => {
        setOpen(true);
      };


    const body = (
        <div className={classes.paper}>
          <Typography variant="h6" className={classes.title}>Add New Member</Typography>
            <Button color="secondary" variant="contained" type="submit">Add</Button>
        </div>
      );

  return (
    <div>
        {/*  <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal> */}
        { (token) 
            ? <Dashboard/>
            : <Redirect to="/login"/>
        }
    </div>
  );
}
