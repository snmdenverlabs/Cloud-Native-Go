import React, { Component } from 'react';
import axios from 'axios';
import FeedbackDataTable from './feedback-data-table';

export default class Feedbacks extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            feedbacksCollection: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:7070/api/sessions')
            .then(res => {
                this.setState({ feedbacksCollection: res.data });
            }).catch((error) => {
                console.log(error);
            })
    }

    dataTable() {
        return this.state.feedbacksCollection.map((data, i) => {
            return <FeedbackDataTable obj={data} key={i} />;
        });
    }

    render() {
        return (
            <div className="wrapper-users">
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>Session ID</td>
                                <td>Session Date</td>
                                <td>Guest Speaker</td>
                                <td>Liked Most</td>
                                <td>Wish List Guest Speaker</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.dataTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
