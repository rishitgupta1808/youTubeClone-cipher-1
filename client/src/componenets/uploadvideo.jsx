import React,{useState} from 'react';
import { connect } from "react-redux";
import { Redirect,withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Button,TextField,MenuItem} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import QueueIcon from '@material-ui/icons/Queue';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));


const Catogory = [
    { value: "Film & Animation", label: "Film & Animation" },
    { value: "Education", label: "Education" },
    { value: "Music", label: "Music" },
    { value: "Gaming", label: "Gaming" },
    { value: "Sports", label: "Sports" },
    { value: "Other", label: "Other" },
]

const Uploadvideo = ({username,userid,history}) => {

    const classes = useStyles();

    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Categories, setCategories] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [Thumbnail, setThumbnail] = useState("")


    const handleChangeTitle = ( event ) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        console.log(event.currentTarget.value)

        setDescription(event.currentTarget.value)
    }


    const handleChangeTwo = (event) => {
      
        setCategories(event.target.value)
        
    }

    const handleSubmit = () => {
        
      if(!(title===""||FilePath===""||Description===""))
      {
        axios.post('http://localhost:5001/api/video/saveVideo',{
        userid: userid,
        username:username,
        title: title,
        description: Description,
        filePath : FilePath,
        catogory: Categories,
        duration :Duration,
        thumbnail: Thumbnail
      })
      .then((result)=>{
        if(result.data.success){
          alert("Video is Uploaded")
          
          setTitle('')
          setThumbnail('')
          setFilePath('')
          setCategories('')
          setDuration('')
          setDescription('')
        
        }else{
          alert(result.data.err)
        }
      })
      }else{
        console.log("Fill all the Fields")
      }
    };
    
    const handleChange = (file) => {
        console.log(file)
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        
        formData.append("file", file[0])

        axios.post('http://localhost:5001/api/video/uploadfiles', formData, config)
        .then(response=> {
            if(response.data.success){

                let variable = {
                    filePath: response.data.filePath,
                    fileName: response.data.fileName
                }
                setFilePath(response.data.filePath)
                console.log(response.data)

                //gerenate thumbnail with this filepath ! 
                axios.post('http://localhost:5001/api/video/thumbnail', variable)
                .then(response => {
                    if(response.data.success) {
                        setDuration(response.data.fileDuration)
                        setThumbnail(response.data.thumbsFilePath)
                        console.log(Thumbnail)
                    } else {
                        alert('Failed to make the thumbnails');
                    }
                })
                
            } else {
                alert('failed to save the video in server')
            }
        })

    }



    return (
        
      <div style={{marginLeft:`12em`,marginBottom:`2em`}}>
           {
               (username)?(
            <div>
                <div style={{display:`flex`,flexDirection:`column`,marginLeft:`10em`,alignItems:`flex-start`}}>
                    <h1 style={{paddingRight:`10em`}}>Upload Video                              </h1>
              <div className={classes.root} style={{marginTop:`3em`,display:`flex`,flexDirection:`row`}}>
              <input
                accept="video/*"
                className={classes.input}
                id="contained-button-file"
                single
                type="file"
                onChange={(e)=>handleChange(e.target.files)}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label>
              <input accept="video/*" className={classes.input} id="icon-button-file" type="file" />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <QueueIcon />
                </IconButton>
              </label>
              {Thumbnail !== "" &&
                    <div style={{display:`flex`,flexDirection:`column`}}>
                        <img src={`http://localhost:5001/${Thumbnail}`} alt="haha" />
                        Thumbnail
                    </div>
                    
                }
                </div>
                
                
              <br/>
              <br/>
              <br/>
              
              <TextField id="outlined-basic" required  label="Enter Title"  value={title} onChange={(e)=>handleChangeTitle(e)}/><br/>
            <br/>
            <br/>
            
       
            <TextField
              id="outlined-multiline-static"
              label="Description"
              fullWidth
              value = {Description}
              onChange = {(e)=>handleChangeDecsription(e)}
              multiline
              rows={5}
              defaultValue="Default Value"
              variant="outlined"
              />
              <br/>
              <br/>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value={Categories}
                onChange={handleChangeTwo}
                helperText="Please select category of video"
                variant="outlined"
              >
                {Catogory.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
               </TextField>
              <br/>
              <br/>
                </div>
                <Button variant="contained" onClick={handleSubmit} size="large"  color="secondary">
                   Upload Video
                 </Button>
                </div>
               ):(
                <div>
                <Redirect to="/signin"/>
                </div>  
               )
                    }
        </div>
    );
};

const mapStateToProps = state =>({
    username : state.user.username,
    userid : state.user.userid
  })
  


export default withRouter(connect(mapStateToProps)(Uploadvideo));