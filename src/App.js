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
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss(id) {
        const updatedList = this.state.list.filter(item => item.objectID !== id);
        this.setState({
            list: updatedList
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
                <ul>
                    {list.map(item =>
                        <li key={item.objectID}>
                            <span>
                                <a href={item.url}>{item.title}</a>
                            </span>
                            <span>{item.author}</span>
                            <span>{item.num_comments}</span>
                            <span>{item.points}</span>
                            <span>
                                    <button onClick={() =>
                                        this.onDismiss(item.objectID)
                                    }>
                                        Dismiss
                                    </button>
                                </span>
                        </li>)}
                </ul>
                <ul>
                    {this.state.list.map(function (item) {
                        return (
                            <li key={item.objectID}>
                                <span>
                                    <a href={item.url}>{item.title}</a>
                                </span>
                                <span>{item.author}</span>
                                <span>{item.num_comments}</span>
                                <span>{item.points}</span>
                            </li>
                        );
                    })}
                </ul>

                <ul>
                    {list.map(item => {
                        return (
                            <li key={item.objectID}>
                                <span>
                                    <a href={item.url}>{item.title}</a>
                                </span>
                                <span>{item.author}</span>
                                <span>{item.num_comments}</span>
                                <span>{item.points}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default App;
