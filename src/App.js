import React, {Component} from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

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
                <div className="table-header">
                    <span style={largeColumn}>TITLE</span>
                    <span style={midColumn}>AUTHOR</span>
                    <span style={smallColumn}>COMMENTS</span>
                    <span style={smallColumn}>POINTS</span>
                    <span style={smallColumn}>ACTION</span>
                </div>
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
            result: null,
            searchTerm: DEFAULT_QUERY,
        };

        this.setSearchTopstories = this.setSearchTopstories.bind(this);
        this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    setSearchTopstories(result) {
        this.setState({ result });
    }
    fetchSearchTopstories(searchTerm) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
            .then(response => response.json())
            .then(result => this.setSearchTopstories(result));
    }
    componentDidMount() {
        const { searchTerm } = this.state;
        this.fetchSearchTopstories(searchTerm);
    }

    onDismiss(id) {
        const updatedHits = this.state.result.hits.filter(item => item.objectID !== id);
        this.setState({
            result: Object.assign({}, this.state.result, { hits: updatedHits })
        });
    }

    onSearchChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    render() {
        const currentDeveloper = new Developer('Quang', 'Son');

        const { result, searchTerm } = this.state;

        console.log(this.state);

        if (!result) { return null; }

        return (
            <div className="page">
                <h1 className="center-text">{helloWorld} {currentDeveloper.getName()}!!!</h1>
                <div className="interactions">
                    <Search
                        onChange={this.onSearchChange}
                        value={searchTerm}
                    >
                        Input your search:
                    </Search>
                </div>

                <h2>Dynamic API Data Table</h2>
                <Table
                    searchTerm={searchTerm}
                    onDismiss={this.onDismiss}
                    list={result.hits}
                />
            </div>
        );
    }
}

export default App;
