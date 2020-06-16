import React from 'react'
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface Props {
    task: string
}

const styles = makeStyles({
    root: {
        width: '80%',
        height: '12%',
        margin: '4vmin 0',
        textAlign: 'left'
    }
})

const MyCard = (props: Props) => {

    const classes = styles()
    const { task } = props

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5">
                    { task }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MyCard
