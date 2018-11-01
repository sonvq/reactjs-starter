import React, {Component} from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const helloWorld = 'Hello, Welcome to React, ';

const largeColumn = {
    width: '40%',
};
const midColumn = {
    width: '30%',
};
const smallColumn = {
    width: '10%',
};

// const isSearched = (searchTerm) => (item) => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

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
        const {value, onChange, onSubmit, children} = this.props;
        return (
            <form onSubmit={onSubmit}>
                {children} <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
                <button type="submit">
                    Search
                </button>
            </form>
        );
    }
}

class Table extends Component {
    render() {
        const {list, onDismiss} = this.props;
        return (
            <div className="table">
                <div className="table-header">
                    <span style={largeColumn}>TITLE</span>
                    <span style={midColumn}>AUTHOR</span>
                    <span style={smallColumn}>COMMENTS</span>
                    <span style={smallColumn}>POINTS</span>
                    <span style={smallColumn}>ACTION</span>
                </div>
                {list.map(item =>
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
            result: null,
            searchTerm: DEFAULT_QUERY,
        };

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.setSearchTopstories = this.setSearchTopstories.bind(this);
        this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
        event.preventDefault();
    }

    setSearchTopstories(result) {
        const { hits, page } = result;
        const oldHits = page !== 0
            ? this.state.result.hits
            : [];
        const updatedHits = [
            ...oldHits,
            ...hits
        ];
        this.setState({
            result: { hits: updatedHits, page }
        });
    }
    fetchSearchTopstories(searchTerm, page) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopstories(result));
    }
    componentDidMount() {
        const { searchTerm } = this.state;
        this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    }

    onDismiss(id) {
        const updatedHits = this.state.result.hits.filter(item => item.objectID !== id);
        this.setState({
            // result: Object.assign({}, this.state.result, { hits: updatedHits })
            result: { ...this.state.result, hits: updatedHits }
        });
    }

    onSearchChange(event) {
        this.fetchSearchTopstories(event.target.value, DEFAULT_PAGE);
        this.setState({
            searchTerm: event.target.value
        });
    }

    render() {
        const currentDeveloper = new Developer('Quang', 'Son');

        const { result, searchTerm } = this.state;
        const page = (result && result.page) || 0;

        console.log(this.state);

        return (
            <div className="page">
                <h1 className="center-text">{helloWorld} {currentDeveloper.getName()}!!!</h1>
                <div className="interactions">
                    <Search
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                        value={searchTerm}
                    >
                        Input your search:
                    </Search>
                </div>

                <h2>Dynamic API Data Table</h2>
                { result &&
                    <Table
                        onDismiss={this.onDismiss}
                        list={result.hits}
                    />
                }
                <div className="interactions">
                    <Button onClick={() => this.fetchSearchTopstories(searchTerm, page + 1)}>
                        More
                    </Button>
                </div>
            </div>
        );
    }
}

export default App;
