
import './App.css';
import Navbar from "./componenets/navbar";
import { Route, Switch} from "react-router-dom";
import Signup from "./componenets/signup";
import Signin from "./componenets/signin";
import Homepage from './pages/Homepage';
import { connect } from "react-redux";
import Sidebar from "./componenets/sidebar";
import Uploadvideo from './componenets/uploadvideo';
import EachVideo from "./componenets/eachVideo";
import Allvideos from "./componenets/allvideos";

function App({username}) {
  return (
    <div className="App">
      {
        (username)?(
          <div>
             <Navbar/>
             <div style={{position:`sticky`,zIndex:`1`,position:`fixed`,overflowX:`hidden`,top:`80px`,left:`0px`}}>
             <Sidebar/>
             </div>
            </div>
        ):(
          <div>
          <Navbar/>
          </div>
        )
      }
       

       <Switch>
       <Route exact path="/signin" component={Signin} />
       <Route exact path="/signup" component={Signup} />
       <Route exact path="/" component={Homepage} />
       <Route exact path="/uploadvideo" component={Uploadvideo} />
       <Route exact path="/allvideos" component={Allvideos} />
       <Route exact path="/video/:vedioId" component={EachVideo} />
       </Switch>
    </div>
  );
}

const mapStateToProps = state =>({
  username : state.user.username
})


export default connect(mapStateToProps)(App);
