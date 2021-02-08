import React from 'react'
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    root: {
      backgroundColor: "#BC986A",
    },
  });

function Header() {
    const classes = useStyles();
    return (
        <div>
            <CardHeader 
            className={classes.root}
            subheader="Talk Less! Read More!"
            title="Book Store App"
            />
        </div>
    )
}

export default Header
