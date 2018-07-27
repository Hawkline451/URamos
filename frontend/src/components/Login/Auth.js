import React, { Component } from 'react';


class Auth extends Component{
	state = {
		rut: null
	}

	componentDidMount(){
		this.setState({rut: this.props.match.params.rut});
		
	}

	render(){
		const {rut} = this.state;
		return(
			rut
		);
	}
}

export default Auth;

