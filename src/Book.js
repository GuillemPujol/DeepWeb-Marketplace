import React, {Component} from 'react';

export default class Book extends Component {

    render() {


        return (
            <tr>
                <td>{this.props.book.title}</td>
                <td>{this.props.book.author}</td>
                <td>{this.props.book.price}</td>
                <td>{this.props.book.category}</td>
                <td>{this.props.book.seller}</td>
            </tr>
        );
    }
}