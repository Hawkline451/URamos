import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { JWTSTATUS, setJWTStatus, AUTHSTATUS, setAuthStatus, setUser, setNormalUser} from '../../actions';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      redirect: '/',
      done: false
    }
  }

  componentWillMount(){
  var token = this.props.match.params.jwt
  localStorage.setItem('token', token)
  this.props.set_jwt_status(JWTSTATUS.JWT_UPDATED)
  
  
  fetch('http://142.93.4.35:3000/auth/current_user/', {
    headers: {
      Authorization: `JWT ${token}`
    }
  })
  .then(res => res.json())
  .then(json => {
        localStorage.setItem('normal_user', JSON.stringify(json));
        this.props.set_normal_user(json);
  });

  fetch('http://142.93.4.35:3000/user/', {
      headers: {
            Authorization: `JWT ${token}`
          }
      })
      .then(res => res.json())
      .then(json => {
          localStorage.setItem('user', JSON.stringify(json));
          this.props.set_user(json)
          this.props.set_auth_status(AUTHSTATUS.LOGGED_IN);
          if(json.isTeacher){
            var ans = '/profesor/'+json.teacherName;
            this.setState({redirect:ans, done:true});
          }else{
            if(json.isLocked){
              this.setState({redirect:'/', done:true});
            }else{
              this.setState({redirect:'/evaluacion', done:true}); 
            }
            
          }
      });

  }

  render(){
    if(this.state.done){
      return <div><Redirect to={this.state.redirect }/></div>;
    }else{
      return <div> </div>;
    }
    
  }

}


const mapDispatchToProps = dispatch => {
  return{
    set_jwt_status: stats => dispatch(setJWTStatus(stats)),
    set_auth_status: stats => dispatch(setAuthStatus(stats)),
    set_user: user => dispatch(setUser(user)),
    set_normal_user: normalUser => dispatch(setNormalUser(normalUser))
  }
}

export default connect(()=>{}, mapDispatchToProps)(Login);