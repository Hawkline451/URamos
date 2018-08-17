import React, { Component } from 'react';
import '../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css'
import { MenuItem, DropdownButton } from 'react-bootstrap'; 
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux'



class InfoUser extends Component {

	constructor(props){
		super(props);
	    this.state = { 
	    	user: {'nickname':''},
	    	normal_user: {'first_name':'', 'last_name':''}
	    };

	}

	componentDidMount(){
		console.log(this.props)
		this.setState({
			user:this.props.user,
			normal_user:this.props.normalUser
		})
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			user:nextProps.user,
			normal_user:nextProps.normalUser
		})
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
const mapStateToProps = state =>{
	return{
		user:state.user,
		normalUser:state.normalUser
	};
};


export default connect(mapStateToProps) (InfoUser);
