import React, { Component } from 'react';
import './style.css'
import firebase from '../../firebase'
import TimerBox from '../TimerBox/Timerbox'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            connections: []
         }
    }

    componentDidMount() {
        firebase.database().ref('/users/-LZBM37T1gd7DuLKgxQm').once('value')
        .then(snapshot => {
            console.log(snapshot.val())

            const data = snapshot.val()
            if(!!data.connections) {

                const arr = []
                for(const c in data.connections) {
                    arr.push(data.connections[c])
                }
                this.setState({
                    connections: arr
                })
            }
            
        }) 
    }

    render() { 
        return ( 
            <div>
                <div className="header">
                    <h1>Timers</h1>
                </div>
                <div>
                    {
                        this.state.connections.map((connection, itr) => {
                            return <TimerBox data={connection} key={itr + '-con'}  />
                        })
                    }
                </div>
            </div>
         );
    }
}
 
export default Main;