import React, {Component} from 'react';
import {Link} from "@reach/router";
import AddACategory from "./AddACategory";


export default class Admin extends Component {
    render() {
        if (this.props.admin) {
            return (
                <React.Fragment>
                    <h3>Categories from admin</h3>
                    <ol>
                        {this.props.categories.map(category =>
                            <li key={category._id}>
                                <Link to={`/category/${category._id}`}>{category.category}</Link>
                                <button onClick={(event) => this.removeCategory()}>Delete category</button>
                            </li>
                        )}
                    </ol>
                    <div className="container">
                        <AddACategory onAddACategory={this.props.onAddACategory} />
                    </div>

                    <Link to="/">Go back</Link>
                </React.Fragment>
            )
        } else {
            return (
            <React.Fragment>
                <h2>Please, Login as administrator</h2>

                <Link to="/">Go back</Link>)
        </React.Fragment>)
        }
}}
