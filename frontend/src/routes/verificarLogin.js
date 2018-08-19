import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AUTHSTATUS } from '../actions';




const mapStateToProps = state =>{
	return{
		isLogged: state.authStatus === AUTHSTATUS.LOGGED_IN
	};
};


class VerificarLogin extends Component{
	
	render(){
		if(this.props.isLogged){
			return (<this.props.comp/>);
		}else{
			return (<Redirect to='/'/>);
		}
	}
}


export default connect(mapStateToProps)(VerificarLogin);