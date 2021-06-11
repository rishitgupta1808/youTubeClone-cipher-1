import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Signup from "./signup";
import Signin from './signin';
import { Link,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../redux/user/user-action";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  withUsername : {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    justifyContent : `flex-end`
  }

}));

 function Navbar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  <div>
    {
      (props.username)?(
        <div className={classes.withUsername} style={{diplay:`flex`,justifyContent:`flex-end`}}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
               
               <Tab label="Sign Out" style={{ color: "white"}} onClick={()=>props.setUser({username:null,userid:null})}  {...a11yProps(0)} />
    
          </Tabs>
        </AppBar>
        <TabPanel  value={value} index={0}>
        
        </TabPanel>
        
      </div>
      ):(
        <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          {/* <Link to='/signin' style={{textDecoration: "none"}}> */}
               
               <Tab label="Sign In" style={{ color: "white"}} onClick={()=>props.history.push('/signin')}  {...a11yProps(0)} />
          
               {/* </Link> */}
             
             {/* <Link to='/signup' style={{textDecoration: "none"}}> */}
               
             <Tab label="Sign Up" style={{ color: "white"}} onClick={()=>props.history.push('/signup')} {...a11yProps(1)} />
             {/* </Link> */}
             
    
          </Tabs>
        </AppBar>
        <TabPanel  value={value} index={0}>
        {/* <Signin/> */}
        </TabPanel>
        <TabPanel value={value}  index={1}>
          {/* <Signup/> */}
        </TabPanel>
        
      </div>
  
      )
    }
 </div>   
  );
}

const mapStateToProps = state =>({
  username : state.user.username
})

const mapDispatchToProps = dispatch =>({
  setUser : (userdata)=>dispatch(setUser(userdata))
});


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar));