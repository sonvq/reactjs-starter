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

const user = {
    firstname: 'quang',
    lastname: 'son'
};

const users = [
    'Robin',
    'Mary',
    'Jane'
];

const isSearched = (searchTerm) => (item) => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

class Developer {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    getName() {
        return this.firstname + ' ' + this.lastname;
    }
}

class Search extends Component {
    render() {
        const {value, onChange} = this.props;
        return (
            <form>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </form>
        );
    }
}

class Table extends Component {
    render() {
        const {list, searchTerm, onDismiss} = this.props;
        return (
            <ul>
                {list.filter(isSearched(searchTerm)).map(item =>
                    <li key={item.objectID}>
                        <span>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span>{item.author}</span>
                        <span>{item.num_comments}</span>
                        <span>{item.points}</span>
                        <span>
                            <button onClick={() =>
                                onDismiss(item.objectID)
                            }>
                                Dismiss
                            </button>
                        </span>
                    </li>
                )}
            </ul>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list,
            searchTerm: '',
        };

        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onDismiss(id) {
        const updatedList = this.state.list.filter(item => item.objectID !== id);
        this.setState({
            list: updatedList
        });
    }

    onSearchChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    render() {
        const robin = new Developer('Robin', 'Wieruch');
        console.log(robin.getName());

        const helloWorld = 'Hello, welcome to React,';
        const {firstname, lastname} = user;
        const [userOne, userTwo, userThree] = users;
        const {list, searchTerm} = this.state;

        return (
            <div className="App">
                <h2>{helloWorld} {firstname} {lastname}!!!</h2>
                <h3>List of users are: {userOne}, {userTwo}, {userThree}</h3>
                <Search
                    onChange={this.onSearchChange}
                    value={searchTerm}
                />

                <Table
                    searchTerm={searchTerm}
                    onDismiss={this.onDismiss}
                    list={list}
                />
            </div>
        );
    }
}

export default App;
