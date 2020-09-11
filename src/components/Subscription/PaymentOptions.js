import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import {Link} from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
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
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function handleClick(){
  console.log("subsc clicked");
}

export default function PaymentOptions(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChangeSwitch = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  var packagename = props.location.state.data;
console.log("clicked package", props.location.state.data);
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="MPESA" {...a11yProps(0)} />
          <Tab label="VISA" {...a11yProps(1)} />
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
  <label>Plan: </label><h5>{packagename.plan}</h5>
        </Grid>
        <Grid container direction="row" justify="flex-start" alignItems="center">
  <label>Amount: </label><h5>{packagename.price}</h5>
        </Grid>
        <Grid
  container
  direction="row"
  justify="flex-end"
  alignItems="center"
><Button onClick={()=>props.history.push({pathname:"/subscriptionpackages"})}><h5>Change</h5></Button></Grid>
        
        <Grid container direction="row" justify="flex-start" alignItems="center">
            <PhoneIcon/>
            <TextField
            id="phoneno"
            label="Phone No"
            defaultValue={reactLocalStorage.getObject("userdata").phoneno}
            variant="outlined"
            />
        </Grid>
        <br/>
        <Grid container direction="row" justify="flex-start" alignItems="center">
            <p>Accept <Link>Terms and Conditions</Link></p>
            <Switch
                checked={state.checkedB}
                onChange={handleChangeSwitch}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </Grid>
        <br/>
        <Grid container direction="row" justify="flex-start" alignItems="center" >
            <Button variant="contained" size="large" color="primary" onClick={handleClick}>COMPLETE</Button>
        </Grid>
        
    
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Button variant="contained" color="primary">
        CONTINUE
      </Button>
      </TabPanel>
      
    </div>
  );
}