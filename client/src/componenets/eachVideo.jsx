import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import moment from "moment";



const EachVideo = ({match}) => {
    
    const videoId = match.params.vedioId
    const [videodata,setvideodata] = useState()
    const [likes,setlikes] = useState(0)

    useEffect(()=>{
      
        axios.post('http://localhost:5001/api/video/eachVideo',{videoId})
        .then((result)=>{
            if(result.data.success){
                setvideodata(result.data.video)
                setlikes(result.data.video.likes)
                console.log(result.data.video)
                
            }else{
                alert("No video Found")
            }})
        .catch((err)=>console.log(err))

    },[])

    const increaseLike = () =>{
       console.log("like")
       setlikes(likes+1)
        axios.post('http://localhost:5001/api/video/inreaseLike',{
            videoId:videoId,
            likes:videodata.likes+1
        })
        .then((result)=>{
           console.log("liked")})
        .catch((err)=>console.log(err))

    }

    return (
        <div style={{marginLeft:`13em`}}>
         {
             (videodata)?(
                <div style={{padding:`3em`}}>
                {
                    (videodata)?(
                           <div>
                               <video src={`http://localhost:5001/${videodata.filePath}`} controls style={{width:`100%`,marginBottom:`1em`}}/> 
                            </div>
                    ):(
                        <div></div>
                    )
                }
                  
                  <div style={{textAlign:`left`}}>
                    <div style={{display:`flex`,flexDirection:`row`,justifyContent:`space-between`}}>
                      <div>
                      <span style={{fontSize:`28px`}}>{videodata.title}</span><br/>
                      <span style={{color:`gray`}}>{videodata.views} views - 
                      {moment({videodata}).format("MMM Do YY")} 
                      </span>
                      </div>
                    <div style={{textAlign:`right`}}>
                    <span style={{color:`gray`}}>{likes} likes</span><br/>
                    <button onClick={increaseLike}>Like</button>
                  </div>
                  </div>
                    <hr/>
                    <span style={{fontSize:`20px`}}>{videodata.username}</span>
                    <br/>
                    <span style={{fontSize:`15px`,color:`gray`}}>{videodata.description}</span>
                  </div>
                  
                  
                  <hr/>
                  
               </div>
             ):(
                 <div></div>
             )
         }   
          
        </div>
    );
};



export default withRouter(EachVideo);