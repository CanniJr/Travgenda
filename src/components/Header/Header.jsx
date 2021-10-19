import React from "react";
// import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          Travgenda
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Options
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
