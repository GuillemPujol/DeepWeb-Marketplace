import React, {Component} from 'react';

export default class Task extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.book.title}</td>
                <td>{this.props.book.category}</td>
            </tr>
        );
    }
}