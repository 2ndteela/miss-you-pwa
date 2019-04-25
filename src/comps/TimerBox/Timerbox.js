import React, { Component } from 'react';
import './style.css'

class TimerBox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            display: false,
            end: null,
            months: 0,
            days: 0,
            hours: 0,
            mins: 0,
            sec: 30
         }
    }

    calculatePixles(num) {
        const width = window.innerWidth
        const pixles = (num/100) * width
        return pixles + 'px'
    }

    checkSecs() {
        let secs = this.state.sec

        if(secs < 1) this.checkMins()
        else {
            secs--
            this.setState({sec: secs})
        } 
    }
    checkMins() {
        let Mins = this.state.mins
        if(Mins < 1) this.checkHours()
        else {
            Mins--
            this.setState({
                mins: Mins,
                sec: 59
            })
        }
    }
    checkHours() {
        let Hours = this.state.hours
        if(Hours < 1) this.checkDays()
        else {
            Hours--
            this.setState({
                hours: Hours,
                mins: 59,
                sec: 59
            })
        }
    }
    checkDays() {
        let Dayz = this.state.days

        if(Dayz < 1) this.checkMonths()
        else {
            Dayz--
            this.setState({
                days: Dayz,
                hours: 23,
                mins: 59,
                sec: 59
            })
        }

    }
    checkMonths() {
        let Months = this.state.Months 

        if(Months < 1) this.setState({display: false})
        else {
            Months--
            let Dayz = 31
            const NOW = new Date()
            if(NOW.getMonth() === 1) {
                if(NOW.getFullYear % 4 !== 0) Dayz = 28
                else Dayz = 29
            }
            else if(NOW.getMonth() === 8 || NOW.getMonth() === 3 || NOW.getMonth() === 5 || NOW.getMonth === 10 ) Dayz = 30

            this.setState({
                months: Months,
                days: Dayz,
                hours: 23,
                mins: 59,
                sec: 59
            })
        }
    }

    tick() {
        this.checkSecs()
    }

    setCount(time) {
        const NOW = new Date()

        let Months = time.getMonth() - NOW.getMonth()
        let Days = time.getDate() - NOW.getDate() 
        let Hours =  time.getHours() - NOW.getHours() 
        let Mins = time.getMinutes() - NOW.getMinutes()

        if(Days < 0) {
            Months--
            Days += 30
        }
        if(Hours < 0) {
            Days--
            Hours += 24
        }
        if(Mins < 0) {
            Hours--
            Mins += 60
        }

        this.setState({
            months: Months,
            days: Days,
            hours: Hours,
            mins: Mins,
            end: time
        })

        setInterval(() => this.tick(), 1000)
    }

    componentDidMount() {
        const timeSplit = this.props.data.exp.split('-')
        const whatDay = new Date(timeSplit[0], timeSplit[1], timeSplit[2], timeSplit[3], timeSplit[4], 0)
        const NOW = new Date()
        const diff = whatDay - NOW
        if(parseInt(diff, 10) > 0) {
            this.setState({ display: true, end: whatDay }, this.setCount(whatDay))
        }
    }

    render() { 
        if(this.state.display)
        return ( 
                <div className="timer-box-card" >
                    <div className="timer-clock">
                        <h2>{this.props.data.recipient}</h2>
                        <div className="timer-time" >
                            <div><span>{this.state.days}</span> <span>Days</span> </div>
                            <div><span>{this.state.hours}</span> <span>Hours</span> </div>
                            <div><span>{this.state.mins}</span> <span>Minutes</span> </div>
                            <div><span>{this.state.sec}</span> <span>Seconds</span>  </div>
                        </div>
                    </div>
                    {/* <svg width={this.calculatePixles(60)} height={this.calculatePixles(60)}>
                        <circle id="circle" class="circle_animation" r={this.calculatePixles(30)} cy={this.calculatePixles(30)} cx={this.calculatePixles(36)} stroke-width="8" stroke="#6fdb6f" fill="none"/>
                    </svg> */}
                    <div className="card-options">
                        <button className="no-border" >Edit</button>
                        <button className="no-border" >Message</button>
                    </div> 
                </div> 
         );

         return null
    }
}
 
export default TimerBox;