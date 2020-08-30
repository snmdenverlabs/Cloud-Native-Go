import React, { Component } from 'react';

class FeedbackDataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.gchurcha_date}
                </td>
                <td>
                    {this.props.obj.guest_speaker}
                </td>
                <td>
                    {this.props.obj.liked_most}
                </td>
                <td>
                    {this.props.obj.wish_list_gspeaker}
                </td>
            </tr>
        );
    }
}

export default FeedbackDataTable;