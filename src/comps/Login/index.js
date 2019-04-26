import React, { Component } from 'react';
import firebase from '../../firebase'
import './style.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: ''
         }
    }

    login() {
        if(!this.state.email) alert("Your email can't be blank")
        else if (!this.state.password) alert("Your password can't be blank")
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
            this.props.history.push('/main')

        })
        .catch(err => {
            alert(err.message)
        }) 
    }

    signUp() {
        if(!this.state.username) alert("Your username can't be blank")
        else if(!this.state.password) alert("Your password can't be blank")
        else if(!this.state.email) alert("Your email can't be blank")

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            firebase.auth().currentUser.updateProfile({displayName: this.state.username})
            .then(() => {
                const newUser = firebase.auth().currentUser
    
                const toAdd = {
                    username: newUser.displayName,
                    connections: []
                }
    
                firebase.database().ref('/users').push(toAdd)
                this.props.history.push('/main')
            })
            .catch(err => {
                alert(err.message)
            })
        })
        .catch(err => alert(err.message))
    }

    update(feild, value) {
        this.setState({
            [feild]: value
        })
    }

    componentDidMount() {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {});
        if(firebase.auth().currentUser) this.history.push('/main')
    }

    render() { 
        return ( 
            <div>
                <div className="header">
                    <h1>Login</h1>
                </div>
                <div id="login-container">
                    <div className="styled-input" style={{marginBottom: "16px"}}>
                        <input value={this.state.email} onChange={(e) => this.update('email', e.target.value)} />
                        <span>Email</span>
                    </div>
                    <div className="styled-input" style={{marginBottom: "16px"}}>
                        <input value={this.state.password} type="password" onChange={(e) => this.update('password', e.target.value)} />
                        <span>Password</span>
                    </div>
                    <div className="styled-input">
                        <input value={this.state.username} onChange={(e) => this.update('username', e.target.value)} />
                        <span>Username</span>
                    </div>
                    <div id="login-buttons" >
                        <button className="button-padding" onClick={() => this.login()}>Login</button>
                        <button onClick={() => this.signUp()}>Sign Up</button>
                </div>
                </div>
            </div>
         );
    }
}
 
export default Login;