import React, {Component} from 'react';

export default class AddABook extends Component {

    constructor(props) {
        super(props);
        //set initial state
        this.state = {
            book: {
                title: "",
                author: "",
                price: "",
                seller: ""
            },
            categoryID: ""
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleButtonClick=this.handleButtonClick.bind(this);
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
        this.props.addBook(this.state.book, this.state.categoryID);
        this.setState({
            book: {
                title: "",
                author: "",
                price: "",
                sellerName: ""
            },
            categoryID: ""
        });
    }

    render() {
        let categoryList = this.props.categories.map(elm => (
            <option key={elm._id} value={elm._id}>
                {elm.categoryName}
            </option>
        ));
        return (
            <div className="card">
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <label>TITLE</label>
                            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <label>AUTHOR</label>
                            <input name="author" type="text" value={this.state.author} onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <label>PRICE</label>
                            <input name="price" type="number" value={this.state.price} onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <label>CATEGORY</label>
                            <select name="categoryID" onChange={this.handleChange} value={this.state.categoryID}>
                                {categoryList}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>SELLER</label>
                            <input name="seller" type="text" value={this.state.seller} onChange={this.handleChange} />
                        </div>

                        <button onClick={(event) => this.handleButtonClick(event)}
                                type="submit" id="submitItemBtn" className="btn btn-primary">Add Book
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}