import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import queryString from 'query-string'

import "../styles.css";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import "../../node_modules/react-widgets/dist/css/react-widgets.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

momentLocalizer(moment);

export default class FeedBackForm extends Component {
    constructor(props) {
        super(props);

        this.onChangeGuestSpeaker = this.onChangeGuestSpeaker.bind(this);
        this.onChangeLikedMost = this.onChangeLikedMost.bind(this);
        this.onChangeWishListGuestSpeaker = this.onChangeWishListGuestSpeaker.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            date: '',
            guestSpeaker: '',
            likedMost: '',
            wishListGuestSpeaker: '',
            location: ''
        }
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        
        let dateParam = values.date;
        let locParam = values.loc;

        axios.get("http://localhost:7070/api/init?date="+dateParam+"&loc="+locParam)
            .then(res => {
                const initializeData = res.data;
                
                this.setState({ id: initializeData._id });
                this.setState({ date: initializeData.gchurcha_date });
                this.setState({ location: initializeData.gcharcha_loc });

            }).catch((error) => {
                console.log(error);
            })
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
            id: '',
            date: '',
            guestSpeaker: '',
            likedMost: '',
            wishListGuestSpeaker: '',
            location: ''
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const feedbackObject = {
            _id: this.state.id,
            gchurcha_date: this.state.date,
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
        });

        this.props.history.push('/thankyou');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="field">
                        <label>Session ID</label>
                        <input type="text" 
                            value={this.state.id}
                            readOnly />
                    </div>
                    
                    <div className="field">
                        <label>When was the Guru Churcha session held ?</label>
                        <input type="text" 
                            value={this.state.date === '' ? '' : 
                                    moment(new Date(this.state.date)).format('MMM DD, YYYY')}
                            readOnly />
                        { /* <DateTimePicker 
                            value = { this.state.date }
                            format = "MMM DD, YYYY"
                            time = {false}
                            readOnly
                            onChange={this.onChangeDate}
                        /> */ }
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