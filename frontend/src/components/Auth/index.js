import React, {Component} from 'react';

class Auth extends Component {

	render(){
		console.log(this.props['ticket'])
		fetch('https://www.u-cursos.cl/upasaporte/login?servicio=uramos&ticket='+this.props['ticket'])
		return(
			"holi"
			);
	}
}

export default Auth;