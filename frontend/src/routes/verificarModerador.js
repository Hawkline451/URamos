import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AUTHSTATUS } from '../actions';




const mapStateToProps = state =>{
	

	return{
		isModerator: state.user.isModerator === true
	};
};


class VerificarModerador extends Component{
	constructor(props){
		super(props);
		console.log(props);
	}
	
	render(){
		if(this.props.isModerator){
			return (<this.props.comp {...this.props}/>);
		}else{
			return (<Redirect to='/'/>)
		}
	}
}


export default connect(mapStateToProps)(VerificarModerador);