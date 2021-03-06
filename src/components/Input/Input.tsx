import React, { FunctionComponent } from 'react'
import { TextField, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
    onSubmit: (e: any)=>void;
    handleChange: (e: any)=>void;
}

const useStyles = makeStyles({
    root: {
        width: '40%',
        display: 'flex'
    },
    input: {
        backgroundColor: '#fff'
    }
})

const Input: FunctionComponent<Props> = ({ onSubmit, handleChange }) => {

    const classes = useStyles()

    return <form className={classes.root} onSubmit={e => onSubmit(e)}>
        <TextField 
            fullWidth={true}  
            variant="outlined" 
            label="Add a new Todo"
            className={classes.input}
            onChange={e => handleChange(e)}
            />
        <Button 
            type="submit" 
            variant="contained"
            color="primary"
        >
            <Add/>
        </Button>
    </form>
}

export default Input
