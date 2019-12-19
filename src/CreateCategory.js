import React, { Component } from "react";

class CreateCategory extends Component {
    constructor(props) {
        super(props);
        // Initial state
        this.state = {
            category: ""
        };
        this.handleInput = this.handleInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleInput(event) {
        event.preventDefault();
        this.props.onCreateCategory(this.state.category);
        this.setState({ category: "" });
    }

    onChange(event) {
        this.setState({
            category: event.target.value
        });
    }

    render() {
        return (
            <form>
                <div className="field">
                    <label className="label" htmlFor="CategoryonInput">
                        Category name
                    </label>
                    <input
                        onChange={this.onChange}
                        name="category"
                        value={this.state.category}
                        placeholder="Category name"
                        id="CategoryonInput"
                    />
                </div>
                <div className="field">
                    <button
                        className="button is-primary"
                        onClick={this.handleInput}
                        type="submit"
                        id="CategoryButton"
                    >
                        Create new category
                    </button>
                </div>
            </form>
        );
    }
}
