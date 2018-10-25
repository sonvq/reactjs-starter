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

class App extends Component {
    render() {
        const helloWorld = 'Hello, welcome to React,';
        let username = 'sonvq';
        return (
            <div className="App">
                <h2>{helloWorld} {username}!!!</h2>
                <ul>
                {list.map(function (item) {
                    return (
                        <li>
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
