import React, { FunctionComponent } from 'react';
import { Drawer, Typography, Divider, List, ListItem, ListItemText, AppBar, IconButton, Menu } from '@material-ui/core/';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

interface Props {
    
}

const drawerWidth = 250

const useStyles = makeStyles({
  main: {
    width: `calc(100% - ${drawerWidth}px)`,
    maxHeight: 'auto',
    height: '100vh'
  },
  drawer: {
    width: drawerWidth,
    height: '100%'
  }
});

const drawer = (
  <>
    <Divider />
    <List>
        <ListItem button >
            <Link to="/login">Log In</Link>
        </ListItem>
        <ListItem button >
            <Link to="/register">Sign Up</Link>
        </ListItem>
        <ListItem button >
            <Link to="/">Protected Route</Link>
        </ListItem>
    </List>
    <Divider />
   {/*  <List>
        <ListItem button >
          <ListItemText>
            <Link to="/">Dashboard</Link>
          </ListItemText>
        </ListItem>
    </List> */}
  </>
)


const Layout: FunctionComponent<Props> = ({ children }) => {
  const classes = useStyles();

    return <> 
        <AppBar className={classes.drawer} >
          <Typography variant="h6">Todo List App</Typography>
            { drawer }
        </AppBar>
        <main className={classes.main}>
          {children}
        </main>
      </>
  }

export default Layout