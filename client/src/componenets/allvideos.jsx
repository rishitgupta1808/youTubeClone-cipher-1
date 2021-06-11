import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import Videodetail from "./videodetal";
import axios from 'axios';
import { Grid } from "@material-ui/core";
import { set } from 'mongoose';
import { Row } from "antd";
import { connect } from "react-redux";
import { Redirect,withRouter } from "react-router-dom";

const Allvideos = ({username}) => {

  const [videoDetails,setVideoDetails] = useState([])
  const [noVideos,setNoVideo] = useState(false)
  useEffect(()=>{

    axios.get('http://localhost:5001/api/video/getAllVideos')
    .then((result)=>{
        if(result.data.noData){
          setNoVideo(true)
        }else{
            setVideoDetails(result.data)
            console.log(videoDetails)
        }
    })
  },[])



    return (
        <div>
            {
                (username)?(
                    <div style={{marginLeft:`13em`,marginBottom:`3em`}}>
                    <div style={{marginLeft:`10px`,textAlign:`left`}}>
                       <h3 style={{fontWeight:`90`}}>All Videos By Category</h3>
                       <div style={{width:`20em`}}>
                       <hr />
                       </div>
                       {
                           (noVideos)?(
                               <div>No Videos Yet</div>
                           ):(
                         <div>
                         <div>
                            <h4 style={{fontWeight:`80`,color:`gray`}}>Film and Animations</h4>
                            <div style={{display:`flex`,flexDirection:`row`,justifyContent:`space-between`}}>
                            {
                               videoDetails.map((detail)=>{
                                   if(detail.catogory==="Film & Animation"){
                                      return <Videodetail createdate={detail.createdAt} duration={detail.duration} videoId ={detail._id}
                                      thumbnail ={detail.thumbnail} title={detail.title} username={detail.username} views={detail.views}/>
                                   }
                               }) 
                            }
                                
                            </div>
                           </div>
                           <div>
                            <h4 style={{fontWeight:`80`,color:`gray`}}>Education</h4>
                            <div style={{display:`flex`,flexDirection:`row`}}>
                            {
                               videoDetails.map((detail)=>{
                                   if(detail.catogory==="Education"){
                                      return <Videodetail createdate={detail.createdAt} duration={detail.duration} videoId ={detail._id}
                                      thumbnail ={detail.thumbnail} title={detail.title} username={detail.username} views={detail.views}/>
                                   }
                               }) 
                            }
                                
                            </div>
                           </div>
                           <div>
                            <h4 style={{fontWeight:`80`,color:`gray`}}>Music</h4>
                            <div>
                            {
                               videoDetails.map((detail)=>{
                                   if(detail.catogory==="Music"){
                                      return <Videodetail createdate={detail.createdAt} duration={detail.duration} videoId ={detail._id}
                                      thumbnail ={detail.thumbnail} title={detail.title} username={detail.username} views={detail.views}/>
                                   }
                               }) 
                            }
                            </div>
                           </div>
                           <div>
                            <h4 style={{fontWeight:`80`,color:`gray`}}>Gaming</h4>
                            <div>
                            {
                               videoDetails.map((detail)=>{
                                   if(detail.catogory==="Gaming"){
                                      return <Videodetail createdate={detail.createdAt} duration={detail.duration} videoId ={detail._id}
                                      thumbnail ={detail.thumbnail} title={detail.title} username={detail.username} views={detail.views}/>
                                   }
                               }) 
                            }
                            </div>
                           </div>
                           <div>
                            <h4 style={{fontWeight:`80`,color:`gray`}}>Sports</h4>
                            {
                               videoDetails.map((detail)=>{
                                   if(detail.catogory==="Sports"){
                                      return <Videodetail createdate={detail.createdAt} duration={detail.duration} videoId ={detail._id}
                                      thumbnail ={detail.thumbnail} title={detail.title} username={detail.username} views={detail.views}/>
                                   }
                               }) 
                            }
                          </div>
                          <div>
                            <h4 style={{fontWeight:`80`,color:`gray`}}>Other</h4>
                            {
                               videoDetails.map((detail)=>{
                                   if(detail.catogory==="Other"){
                                      return <Videodetail createdate={detail.createdAt} duration={detail.duration} videoId ={detail._id}
                                      thumbnail ={detail.thumbnail} title={detail.title} username={detail.username} views={detail.views}/>
                                   }
                               }) 
                            }
                          </div>
                          </div>   
                           )
                       }
                       
                       
                    </div>
                </div>
                ):(
                    <Redirect to="/signin"/>
                )
            }
        </div>
       
    );
};


const mapStateToProps = state =>({
    username : state.user.username,
    userid : state.user.userid
  })
  


export default withRouter(connect(mapStateToProps)(Allvideos));