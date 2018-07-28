import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import {login} from  '../../actions/auth'
import {authErrors, isAuthenticated} from '../../reducers'

const mapStateToProps = (state) => ({
	  errors: authErrors(state),
	  isAuthenticated: isAuthenticated(state)
	});



class Auth extends Component{
	state = {
		rut: null
	}

	

	componentDidMount(){
		this.setState({rut: this.props.match.params.rut});
		var rut = this.props.match.params.rut

		const mapStateToProps = (state) => ({
		  errors: authErrors(state),
		  isAuthenticated: isAuthenticated(state)
		});


		const mapDispatchToProps = (dispatch) => {
		    dispatch(login(rut, rut))
		}
		connect(mapStateToProps, mapDispatchToProps)	
	}

	render(){
		const {rut} = this.state;
		return(
			rut
		);
	}
}

export default Auth;

