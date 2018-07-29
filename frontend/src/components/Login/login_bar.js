import React, { Component } from 'react';
import InfoUser from './info_user';

class LoginBar extends Component{

	componentDidMount(){
		const s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
	    s.src = "https://www.u-cursos.cl/upasaporte/javascript?servicio=uramos";
	    this.instance.appendChild(s);
	}
	render(){
		return (localStorage.getItem('isLogged') === 'true') ? (<InfoUser />): (<div ref={el => (this.instance = el)} />)
	}
}



export default LoginBar;
