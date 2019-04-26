import React, { Component } from 'react';
import './style.css'
import firebase from '../../firebase'
import TimerBox from '../TimerBox/Timerbox'
import { init } from 'events';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            connections: [],
            newTimer: {
                year: 0,
                month: 0,
                day: 0,
                hour: 0,
                min: 0
            }
         }
    }

    componentDidMount() {

        //const user = firebase.auth().currentUser
        //if(!user) this.props.history.push('/')

        const NOW = new Date() 

        this.setState({
            year: parseInt(NOW.getFullYear(), 10),
            month: parseInt(NOW.getMonth(), 10) + 1,
            day: parseInt(NOW.getDate(), 10),
            hour: parseInt(NOW.getHours(), 10) + 1,
            mins: 0
        })

        firebase.database().ref('/users/-LZBM37T1gd7DuLKgxQm').once('value')
        .then(snapshot => {

            const data = snapshot.val()
            if(!!data.connections) {

                const arr = []
                for(const c in data.connections) {
                    arr.push(data.connections[c])
                }
                this.setState({
                    connections: arr
                })

                localStorage['connections'] = JSON.stringify(arr)
            }
            
        })
        .catch(err => {
            this.setState({
                connections: JSON.parse(localStorage['connections'])
            })
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
                <button id="action-button">+</button>
                <div id="dialog-container">
                    <div id="dialog-background"></div>
                    <div id="dialog-box">
                        <h1>New Timer</h1>
                        <div className="styled-input button-input">
                            <button>+</button>
                            <input type="number" value={this.state.year} />
                            <button>-</button>
                            <span>Year</span>
                        </div>
                        <div className="styled-input button-input">
                            <button>+</button>
                            <input type="number" value={this.state.month} />
                            <button>-</button>
                            <span>Month</span>
                        </div>
                        <div className="styled-input button-input">
                            <button>+</button>
                            <input type="number" value={this.state.day} />
                            <button>-</button>
                            <span>Date</span>
                        </div>
                        <div className="styled-input button-input">
                            <button>+</button>
                            <input type="number" value={this.state.hour} />
                            <button>-</button>
                            <span>Hour</span>
                        </div>
                        <div className="styled-input button-input">
                            <button>+</button>
                            <input type="number" value={this.state.mins} />
                            <button>-</button>
                            <span>Minutes</span>
                        </div>
                        <div className="button-box" >
                            <button className="button-padding">Save</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Main;