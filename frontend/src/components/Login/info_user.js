import React, { Component } from 'react';
import '../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css'
import { MenuItem, DropdownButton } from 'react-bootstrap'; 
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import Chip from '@material-ui/core/Chip';


class InfoUser extends Component {

	constructor(props){
		super(props);
	    this.state = { 
	    	user: localStorage.getItem('user'),
	    	normal_user: localStorage.getItem('normal_user')
	    };

	}

	componentDidMount(){
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

		fetch('http://142.93.4.35:3000/auth/current_user/', {
			headers: {
				Authorization: `JWT ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(json => {
      		localStorage.setItem('normal_user', JSON.stringify(json));

	    	this.setState({normal_user:json});

		});
	}

	render(){
		return (
			<DropdownButton
			bsStyle='success'
			bsSize="large"
			title= {
			     <Chip
			        avatar={
			          <Avatar>
			            <FaceIcon />
			          </Avatar>
			        }
			        label={this.state.normal_user.first_name+" "+this.state.normal_user.last_name}
     			/>

			}
			id="drop-session"
			>	
				<MenuItem >{this.state.user.nickname}</MenuItem>
				<MenuItem href="/logout/">Cerrar sesión</MenuItem>
			</DropdownButton>
			);
	}

}

export default InfoUser;