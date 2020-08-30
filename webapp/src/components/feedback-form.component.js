import React, { Component } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment'

import "../styles.css";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import "../../node_modules/react-widgets/dist/css/react-widgets.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

momentLocalizer(moment);

export default class FeedBackForm extends Component {
    constructor(props) {
        super(props);

        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeGuestSpeaker = this.onChangeGuestSpeaker.bind(this);
        this.onChangeLikedMost = this.onChangeLikedMost.bind(this);
        this.onChangeWishListGuestSpeaker = this.onChangeWishListGuestSpeaker.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            date: null,
            guestSpeaker: '',
            likedMost: '',
            wishListGuestSpeaker: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:7070/api/sessions/07162020-01')
            .then(res => {
                const initializeData = res.data;
                
                this.setState({ id: initializeData._id });
                this.setState({ date: new Date(initializeData.gchurcha_date) });

            }).catch((error) => {
                console.log(error);
            })
    }

    onChangeId(e) {
        this.setState({ id: e.target.value });
    }

    onChangeDate(selectedDate) {
        //console.log(moment(selectedDate).format('MMM DD, YYYY'));
        this.setState({ date: selectedDate });
    }

    onChangeGuestSpeaker(e) {
        this.setState({ guestSpeaker: e.target.value });
    }

    onChangeLikedMost(e) {
        this.setState({ likedMost: e.target.value });
    }

    onChangeWishListGuestSpeaker(e) {
        this.setState({ wishListGuestSpeaker: e.target.value });
    }

    onReset(e) {   
       this.setState({
            guestSpeaker: '',
            likedMost: '',
            wishListGuestSpeaker: ''
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const feedbackObject = {
            _id: this.state.id,
            gchurcha_date: moment(this.state.date).format('MM/DD/YYYY'),
            guest_speaker: this.state.guestSpeaker,
            liked_most: this.state.likedMost,
            wish_list_gspeaker: this.state.wishListGuestSpeaker
        }

        var config = {
            method: 'post',
            url: 'http://localhost:7070/api/sessions',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(feedbackObject)
          };

        /*axios.post('http://192.168.99.105:9090/api/sessions', feedbackObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });*/

        axios(config)
        .then((res) => {
                console.log(JSON.stringify(res.data));
        }).catch((error) => {
            console.log(error);
        });

        this.setState({
            guestSpeaker: '',
            likedMost: '',
            wishListGuestSpeaker: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="field">
                        <label>Session ID</label>
                        <input type="text" 
                            value={this.state.id}
                            onChange={this.onChangeId} />
                    </div>
                    
                    <div className="field">
                        <label>When was the Guru Churcha session held ?</label>
                        <DateTimePicker 
                            value = { this.state.date }
                            format = "MMM DD, YYYY"
                            time = {false}
                            readOnly
                            onChange={this.onChangeDate}
                        />
                    </div>
                    
                    <div className="field">
                        <label>Who was the Guest Speaker - Name, Location ?</label>
                        <input type="text" value={this.state.guestSpeaker} onChange={this.onChangeGuestSpeaker}/>
                    </div>
                    
                    <div className="field">
                        <label>What did you like the most ?</label>
                        <input type="text" value={this.state.likedMost} onChange={this.onChangeLikedMost} />
                    </div>
                    
                    <div className="field">
                        <label>Who would you like to invite if you know anybody from past as Guest Speaker ?</label>
                        <input type="text" value={this.state.wishListGuestSpeaker} onChange={this.onChangeWishListGuestSpeaker} />
                    </div>
                    
                    <div>
                        <input type="submit" value="Submit" className="btn btn-success" />&nbsp;&nbsp;
                    </div>
                </form>
            </div>
        )
    }
}