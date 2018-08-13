import React, { Component } from 'react';
import '../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css'
import { MenuItem, DropdownButton } from 'react-bootstrap'; 
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import Chip from '@material-ui/core/Chip';

import { connect } from 'react-redux';
import { AUTHSTATUS, setAuthStatus } from '../../actions';


class InfoUser extends Component {

	constructor(props){
		super(props);
	    this.state = { 
	    	user: {'nickname':''},
	    	normal_user: {'first_name':'', 'last_name':''}
	    };

	}

	componentDidMount(){
		this.props.set_auth_status(AUTHSTATUS.LOGGED_IN);
		console.log("aaaaaaaaaaaaaa");		
	}
	componentWillMount(){
		console.log("login: ")
		console.log(this.props.isLogged)
		var haveNotData = !this.props.isLoggedd;
		if(localStorage.getItem('normal_user') ){
			this.setState({
				user: JSON.parse(localStorage.getItem('user')),
				normal_user: JSON.parse(localStorage.getItem('normal_user'))
			})
			haveNotData = false;
			this.props.set_auth_status(AUTHSTATUS.LOGGED_IN);
		}
		if( !this.props.isLoggedd){
			fetch('http://142.93.4.35:3000/user/', {
				headers: {
		        	Authorization: `JWT ${localStorage.getItem('token')}`
		        }
		    })
		    .then(res => res.json())
		    .then(json => {
	      		localStorage.setItem('user', JSON.stringify(json));
		    	this.setState({user: json});
		    });
			fetch('http://142.93.4.35:3000/auth/current_user/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')}`
				}
			})
			.then(res => res.json())
			.then(json => {
	      		localStorage.setItem('normal_user', JSON.stringify(json));
	      		this.setState({normal_user: json});
			});
			
		}
		
	}

	render(){
		
		return (
			<DropdownButton
			bsStyle='success'
			bsSize="large"
			title= {
				<Chip
					style={{
						fontSize: 15
					}}
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

const mapStateToProps = (state) =>{
	return{
		isLogged: state.authStatus === AUTHSTATUS.LOGGED_IN,
	};
}

const mapDispatchToProps = dispatch => {
	return{
		set_auth_status: stats => dispatch(setAuthStatus(stats))
	}
  
}


export default connect(mapStateToProps, mapDispatchToProps)(InfoUser);