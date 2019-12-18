import React from 'react';
import './App.css';
import AddABook from "./AddABook";
import List from "./List";


class App extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      books: [
        { title: 'Title', category: 'Category' },
        { title: 'How to hack NASA', category: 'Hacking' },
        { title: 'Hacking Harvard', category: 'Hacking' },
      ]
    };}

    // Add a book function
  addABook(title) {
    const bookObject = {
      title: title,
      category: "false"
    };

    // This is setting a new state object with a new todoList
    this.setState({
      // old items + new items
      books: [...this.state.books, bookObject]
    });
  }

  render() {
    return (
        <div className="container">

              <h4 className="display-4">Book List</h4>
              <br/>
              <table>
                <List books={this.state.books}/>
              </table>
              <br/>
              <AddABook addABook={(title) => this.addABook(title)}/>
            </div>

    );}
}

export default App;


