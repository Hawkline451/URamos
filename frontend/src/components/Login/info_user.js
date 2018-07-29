import React, { Component } from 'react';

class InfoUser extends Component {

	constructor(props){
		super(props);
	    this.state = { 
	    	user: localStorage.getItem('user'),
	    	normal_user: localStorage.getItem('normal_user')
	    };

	}

	componentDidMount(){
		var have_user = localStorage.getItem('user') ? true : false;
		if(!have_user){
			fetch('http://142.93.4.35:3000/user/', {
				headers: {
		        	Authorization: `JWT ${localStorage.getItem('token')}`
		        }
		    })
		    .then(res => res.json())
		    .then(json => {
		    	localStorage.setItem('user', json);
		    	this.setState({user:json});
		    });
		}

		var have_normal_user = localStorage.getItem('normal_user') ? true : false;
		if(!have_normal_user){
			fetch('http://142.93.4.35:3000/auth/current_user/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')}`
				}
			})
			.then(res => res.json())
			.then(json => {
				localStorage.setItem('normal_user',json);
			});
		}
	}

	render(){
		console.log(this.state.user);
		return "holi";
	}

}

export default InfoUser;