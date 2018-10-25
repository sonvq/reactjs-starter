import React, {Component} from 'react';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

class Developer {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    getName() {
        return this.firstname + ' ' + this.lastname;
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list,
            searchTerm: '',
        };

        this.dismissItem = this.dismissItem.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.isSearched = this.isSearched.bind(this);
    }

    dismissItem(id) {
        const updatedList = this.state.list.filter(item => item.objectID !== id);
        this.setState({
            list: updatedList
        });
    }

    isSearched = (searchTerm) => (item) => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

    onSearchChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    render() {
        const robin = new Developer('Robin', 'Wieruch');
        console.log(robin.getName());

        const helloWorld = 'Hello, welcome to React,';
        let username = 'sonvq';
        return (
            <div className="App">
                <h2>{helloWorld} {username}!!!</h2>
                <form>
                    <input
                        type="text"
                        onChange={this.onSearchChange}
                    />

                </form>
                <ul>
                    {this.state.list.filter(this.isSearched(this.state.searchTerm)).map(item =>
                        <li key={item.objectID}>
                            <span>
                                <a href={item.url}>{item.title}</a>
                            </span>
                            <span>{item.author}</span>
                            <span>{item.num_comments}</span>
                            <span>{item.points}</span>
                            <span>
                                <button onClick={() =>
                                    this.dismissItem(item.objectID)
                                }>
                                    Dismiss
                                </button>
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default App;
