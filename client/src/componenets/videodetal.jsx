import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import { Col } from "antd";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './videodetail.css';

const Videodetail = ({createdate,duration,thumbnail,title,username,views,videoId,history}) => {

    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration - minutes * 60);
    console.log(username)
    
    const videoClicked = () =>{
        axios.post('http://localhost:5001/api/video/inreaseViews',{
            videoId:videoId,
            views:views+1
        })
        .then((result)=>{
           console.log("liked")})
        .catch((err)=>console.log(err))

           history.push(`/video/${videoId}`)
    }

    return (
        <div style={{marginLeft:`2em`}}>
            
            {
                (username)?(
                
                
            <div >
            <button style={{cursor:`pointer`,border:`0px`}} onClick={videoClicked}>
                <div style={{ position: 'relative' }}>
                <div>
                  <span>{title}</span>  
                </div>
                
                    <img style={{ width: `225px`,height:`130px` }} alt="thumbnail" src={`http://localhost:5001/${thumbnail}`} />
                       
                    <div className=" duration"
                        style={{bottom:`3px`, right:`0px`, position: 'absolute', margin: '4px', 
                        color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                        padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                        fontWeight:'500', lineHeight:'12px' }}>
                        <span>{minutes}:{seconds}</span>
                    </div>
                </div>
                
                <div style={{fontWeight:`60`,fontSize:`13px`}}>
                <span>{username}</span><br />
                <span> {views} views</span>
                 <span  style={{ marginLeft: '9em' }}>
                    {moment(createdate).format("MMM Do YY")} 
                    </span> 
                </div>
                </button>
              
                
            </div>
            
        
                ):(
                    <div style={{color:`gray`,fontWeight:`90`,fontSize:`32px`}}>
                    </div>
                )
            }
            
        </div>
        
    );
};


export default withRouter(Videodetail);