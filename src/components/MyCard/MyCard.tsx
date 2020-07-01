import React, { FunctionComponent, useState } from 'react'
import { Card, CardContent, Radio, Checkbox } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Trash from "@material-ui/icons/RestoreFromTrash"
import { updateTodo } from '../../api/todo.api';

interface Props {
    task: string;
    isDone?: boolean;
    onClickToDelete: () => void
    onClickToUpdate: (isDone: boolean) => void
}

const styles = makeStyles({
    root: {
        width: '80%',
        height: '12%',
        margin: '4vmin 0',
        textAlign: 'left',
        position: 'relative'
    },
     trashIcon: {
         position: 'absolute',
         right: 20,
         top: 10,
         fontSize: '2.5em',
         color: '#ff6050',
         cursor: 'pointer'
     },
     check: {
         position: 'absolute',
         left: 4,
         top: '20%',
         borderRadius: '50%'
     },
     txt: {
        margin: '0 6vmin',
     }
})

const MyCard: FunctionComponent<Props> = ({ task, onClickToDelete, onClickToUpdate, isDone }) => {

    const classes = styles()
    const [checked, setChecked] = useState(isDone)
    const [LineThrough, setLineThrough] = useState(isDone)

    const handleChange = () => {
        onClickToUpdate(!checked)
        setChecked(!checked)
        setLineThrough(!checked)
    }

    return (
        <Card className={classes.root} >
            <Checkbox 
                onChange={handleChange} 
                checked={checked} 
                color="primary"
                className={classes.check}
                />
            <CardContent>
                <Typography variant="h5" style={{textDecoration: LineThrough ? 'line-through' : '' }} className={classes.txt}>
                    { task }
                </Typography>
            </CardContent>
                <Trash className={classes.trashIcon} onClick={onClickToDelete}/>
        </Card>
    )
}

export default MyCard
