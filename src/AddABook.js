import React, {Component} from 'react';

export default class AddTask extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: ""
        };
    }

    //
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    //
    handleButtonClick(event) {
        event.preventDefault();
        this.props.addBook(this.state.input);
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="itemText">Add Book</label>
                            <input type="text" className="form-control" id="itemText"
                                   placeholder=""
                                   onChange={(event) => this.handleChange(event)}
                            />
                        </div>
                        <button onClick={(event) => this.handleButtonClick(event)}
                                type="submit" id="submitItemBtn" className="btn btn-primary">Add Task
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}


