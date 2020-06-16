import React from 'react'
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
    
}

const useStyles = makeStyles({
    root: {
        width: '809px',
        position: 'absolute',
        bottom: '20px'
    },
})

const Input = (props: Props) => {

    const classes = useStyles()

    return <form className={classes.root}>
        <TextField fullWidth={true}  variant="outlined" label="Add a new Todo" />
    </form>
}

export default Input
