import React, {Component} from 'react';

import Book from './Book';

export default class List extends Component {

    render() {
        // Array of empty
        let items = [];

        this.props.books.forEach((value, index) => {
            items.push(
                <Book book={value} index={index} />
            )
        });

        return (
            <tr>
                {items}
            </tr>
        );
    }
}


