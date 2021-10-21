import React from "react";
// import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

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
          <Autocomplete>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
