import React,{useState,useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import { setUser } from "../redux/user/user-action";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));


const Signin = props => {
    const classes = useStyles();

    const [userName,setUserName] = useState('');

    const handleUserName = (name) => setUserName(name);

    const [password,setPassword] = useState('');

    const handlePassword = (name) => setPassword(name);


    const handleSubmit = () =>{

        if(!(userName===''||password==='')){


              axios.post('http://localhost:5001/api/user/getUser',{
         
                     username : userName,
                     password : password
                  
              }).then((response)=>{
                  if(response.data.success===true){
                    console.log(response.data)
                    let userdata ={
                      username : response.data.msg.username,
                      userid : response.data.msg._id 
                    }
                      props.setUser(userdata);
                       props.history.push('/allvideos')
                  }else if(response.data.success===false){
                    alert(response.data.msg)
                  }
              }).catch(err=>console.log(err))
           
        }else{
            alert('Fill all the Fields')
        }
    }

    return (
        <div style={{display:`flex`,flexDirection:`column`,justifyContent:`space-between`,alignItems:`center`,marginTop:`3em`}}>
           <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
           <h1>Enter your details for Sign In</h1>
                <br/>
              
               <TextField id="outlined-basic" type="email" required label="Enter UserName" value={userName} onChange={(e)=>handleUserName(e.target.value)} /><br/>
               <TextField id="outlined-basic" required type ="password" label="Enter Password"  value={password} onChange={(e)=>handlePassword(e.target.value)}/><br/>
               <br/>
               <Button variant="contained"  size="large"  color="secondary" onClick={handleSubmit}>
                Sign In
               </Button>
             </form> 
        </div>
    );
};


const mapDispatchToProps = dispatch =>({
    setUser : (userdata)=>dispatch(setUser(userdata))
});




export default connect(null,mapDispatchToProps)(Signin);
