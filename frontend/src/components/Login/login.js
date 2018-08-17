import React from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { JWTSTATUS, setJWTStatus, AUTHSTATUS, setAuthStatus, setUser, setNormalUser} from '../../actions';


const Login = (props)=>{
  var token = props.match.params.jwt
  localStorage.setItem('token', token)
  props.set_jwt_status(JWTSTATUS.JWT_UPDATED)
  var usr=null;

	fetch('http://142.93.4.35:3000/user/', {
      headers: {
            Authorization: `JWT ${token}`
          }
      })
      .then(res => res.json())
      .then(json => {
          localStorage.setItem('user', JSON.stringify(json));
          usr = json;
          props.set_user(json)
      });
  
  fetch('http://142.93.4.35:3000/auth/current_user/', {
    headers: {
      Authorization: `JWT ${token}`
    }
  })
  .then(res => res.json())
  .then(json => {
        localStorage.setItem('normal_user', JSON.stringify(json));
        props.set_normal_user(json);
  });

  props.set_auth_status(AUTHSTATUS.LOGGED_IN);

  if(usr.isTeacher){
    var url = "/profesor/"+usr.teacherName.toString();
    return <Redirect to={url} />;
  }


  return <Redirect to='/'/>;
};

const mapDispatchToProps = dispatch => {
  return{
    set_jwt_status: stats => dispatch(setJWTStatus(stats)),
    set_auth_status: stats => dispatch(setAuthStatus(stats)),
    set_user: user => dispatch(setUser(user)),
    set_normal_user: normalUser => dispatch(setNormalUser(normalUser))
  }
}

export default connect(()=>{}, mapDispatchToProps)(Login);