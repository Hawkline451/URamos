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
	    	user: {'nickname':''},
	    	normal_user: {'first_name':'', 'last_name':''}
	    };

	}

	
	componentWillMount(){
		this.setState({'user':JSON.parse(localStorage.getItem('user')),
                            'normal_user':JSON.parse(localStorage.getItem('normal_user'))})
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



export default InfoUser;