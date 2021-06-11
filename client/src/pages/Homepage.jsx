import React from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Navbar from "../componenets/navbar";
import Sidebar from "../componenets/sidebar";

const Homepage = ({username}) => {
    return (
        <div>
        {(username)?(
           <div>
           
          </div>   
        ):(
        <div>
          
            <Redirect to="/signin"/>
        </div>
        )}
         
        </div>
    );
};

const mapStateToProps = state =>({

    username : state.user.username
})

export default connect(mapStateToProps)(Homepage);