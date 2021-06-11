
import React,{useState,useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const Signup = props => {
    const classes = useStyles();

    const [name,setName] = useState('');

    const handleName = (name) => setName(name);

    const [userName,setUserName] = useState('');

    const handleUserName = (name) => setUserName(name);

    const [password,setPassword] = useState('');

    const handlePassword = (name) => setPassword(name);

    const [repass,setRepass] = useState('');

    const handleRepass = (name) => setRepass(name);

    const handleSubmit = () =>{

        if(!(name===''||userName===''||password===''||repass==='')){
           if(password===repass){

              axios.post('http://localhost:5001/api/user',{
                  
                     name:name,
                     username : userName,
                     password : password
                  
              }).then((response)=>{
                  if(response.data==="UserName already exist"){
                       alert("UserName already exist")
                  }else if(response.data.success===true){
                    props.history.push('/signin');
                  }
              }).catch(err=>console.log(err))

           }else{
               alert('Password Does not match')
           }
        }else{
            alert('Fill all the Fields')
        }
    }

    return (
        <div style={{display:`flex`,flexDirection:`column`,justifyContent:`space-between`,alignItems:`center`,marginTop:`3em`}}>
           <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
           <h1>Enter your details for Sign Up</h1>
                <br/>
               <TextField id="outlined-basic" required label="Enter Your Name" value={name} onChange={(e)=>handleName(e.target.value)} /><br/>
               <TextField id="outlined-basic" type="email" required label="Enter UserName" value={userName} onChange={(e)=>handleUserName(e.target.value)} /><br/>
               <TextField id="outlined-basic" required type ="password" label="Enter Password"  value={password} onChange={(e)=>handlePassword(e.target.value)}/><br/>
               <TextField id="outlined-basic" required type ="password" label="Re-enter Password" value={repass} onChange={(e)=>handleRepass(e.target.value)}/><br/><br/><br/>
               <Button variant="contained"  size="large"  color="secondary" onClick={handleSubmit}>
                Create Account
               </Button>
             </form> 
        </div>
    );
};

export default Signup;