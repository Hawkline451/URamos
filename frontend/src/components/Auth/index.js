import React, {Component} from 'react';

class Auth extends Component {

	render(){
		console.log(this.props['ticket'])
		
		fetch('https://www.u-cursos.cl/upasaporte/login?servicio=uramos&ticket='+this.props['ticket']).
		.then((response) => {
    		return response.json()})
    	.then((data) => {
    		console.log(data)
    	})

	return(
			"holi"
			);
	}
}

export default Auth;