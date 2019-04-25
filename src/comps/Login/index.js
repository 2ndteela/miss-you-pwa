import React, { Component } from 'react';
import './style.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    checkLogin() {
        this.props.history.push('/main')
    }

    render() { 
        return ( 
            <div>
                <div className="header">
                    <h1>Login</h1>
                </div>
                <div id="login-container">
                    <div className="styled-input" style={{marginBottom: "16px"}}>
                        <input />
                        <span>Email</span>
                    </div>
                    <div className="styled-input">
                        <input hidden />
                        <span>Password</span>
                    </div>
                    <div id="login-buttons" >
                        <button className="button-padding" onClick={() => this.checkLogin()}>Login</button>
                        <button onClick={() => this.checkLogin()}>Sign Up</button>
                </div>
                </div>
            </div>
         );
    }
}
 
export default Login;