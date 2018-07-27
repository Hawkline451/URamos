import React, { Component } from 'react';

class Login extends Component{

	componentDidMount(){
		const s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
	    s.src = "https://www.u-cursos.cl/upasaporte/javascript?servicio=uramos";
	    this.instance.appendChild(s);
	}
	render(){
		return (
			<div ref={el => (this.instance = el)} />
			);
	}
}

export default Login;
