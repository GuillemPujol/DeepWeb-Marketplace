import React, {Component} from 'react';


export default class AddACategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: ""
        };

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    handleButtonClick(event) {
        event.preventDefault();
        this.props.onAddACategory = function (category) {

        }
        this.props.onAddACategory(this.state.category);
        this.setState({category: ""});
    }



    render() {

        return (
            <form>

                <div className="field">
                    <label className="label" htmlFor="CategoryName">Name:</label>
                    <input className="text" onChange={this.onChange} name="name"
                           value={this.state.category.name}
                           placeholder="Category"
                           id="CategoryName"/>
                </div>

                <div className="field">
                    <button className="button is-primary" onClick={this.handleInput} type="submit" id="CategoryButton">Add category</button>
                </div>
            </form>
        )
    };
}