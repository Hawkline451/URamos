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
		var havent_user = localStorage.getItem('user') === null;
		if(havent_user){
			fetch('http://142.93.4.35:3000/user/', {
				headers: {
		        	Authorization: `JWT ${localStorage.getItem('token')}`
		        }
		    })
		    .then(res => res.json())
		    .then(json => {
          		localStorage.setItem('user', JSON.stringify(json));
		    	this.setState({user:json});
		    });
		}

		var havent_normal_user = localStorage.getItem('normal_user') === null;
		if(havent_normal_user){
			fetch('http://142.93.4.35:3000/auth/current_user/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')}`
				}
			})
			.then(res => res.json())
			.then(json => {
          		localStorage.setItem('user', JSON.stringify(json));

		    	this.setState({normal_user:json});

			});
		}
	}

	render(){
		return "holi"+this.state.normal_user.nickname;
	}

}

export default InfoUser;