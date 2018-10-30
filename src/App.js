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

const largeColumn = {
    width: '40%',
};
const midColumn = {
    width: '30%',
};
const smallColumn = {
    width: '10%',
};

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

class Button extends Component {
    render() {
        const {
            onClick,
            className = "",
            children,
        } = this.props;
        return (
            <button
                onClick={onClick}
                className={className}
                type="button"
            >
                {children}
            </button>
        );
    }
}

class Search extends Component {
    render() {
        const {value, onChange, children} = this.props;
        return (
            <form>
                {children} <input
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
            <div className="table">
                {list.filter(isSearched(searchTerm)).map(item =>
                    <div key={item.objectID} className="table-row">
                        <span style={largeColumn}>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span style={midColumn}>
                            {item.author}
                        </span>
                        <span style={smallColumn}>
                            {item.num_comments}
                        </span>
                        <span style={smallColumn}>
                            {item.points}
                        </span>
                        <span style={smallColumn}>
                            <Button onClick={() => onDismiss(item.objectID)}>
                                Dismiss
                            </Button>
                        </span>
                    </div>
                )}
            </div>
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
            <div className="page">
                <h2>{helloWorld} {firstname} {lastname}!!!</h2>
                <h3>List of users are: {userOne}, {userTwo}, {userThree}</h3>
                <div className="interactions">
                    <Search
                        onChange={this.onSearchChange}
                        value={searchTerm}
                    >
                        Input your search:
                    </Search>
                </div>
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
