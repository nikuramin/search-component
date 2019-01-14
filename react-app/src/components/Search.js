import React, { Component } from 'react'
import UserList from './UserList'
import { setTimeout } from 'timers';
import 'bootstrap/dist/css/bootstrap.css'

class Search extends Component {

    state = {
        htmlId:'searchComponent',
        dataPath: 'http://localhost:48703/searchUser?',
        searchDelay: 700,
        minSearchStrLen: 3,
        searchStrInput: ''
    }
        
    render() {
        return (
            <div className="form-group" id={this.state.htmlId}>                
                <input type="text"
                    value={this.state.searchStrInput}
                    onChange={this.searchInputOnChange}
                    placeholder="start enter user name"
                    className="form-control"/>
                {
                    this.state.searchError &&
                    <div className="alert alert-danger">{this.state.searchError}</div>
                }
                {this.state.searchResults && <UserList userList={this.state.searchResults} />}
            </div>
        )
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClickOutside, false);
    }

    handleClickOutside = (event) => { 

        let me = document.getElementById(this.state.htmlId);

        if ((!me || !me.contains(event.target)) && event.target.className !== 'modal') {
            this.setState({
                searchStrInput: '',
                searchResults: [],
                searchError: null 
            });
        }
    }

    searchInputOnChange = (event) => {
        this.setState({ searchStrInput: event.target.value });
        if (event.target.value.length >= this.state.minSearchStrLen) {
            clearTimeout(this.searchTimerId);
            this.searchTimerId = setTimeout((prevStr) => {
                if (prevStr === this.state.searchStrInput)
                    this.searchQuery();
            }, this.state.searchDelay, event.target.value);
        }
        if (event.target.value.length === 0) this.setState({ searchResults: [], searchError: null });
    }

    searchQuery = () => {
        let currentSearchStr = this.state.searchStrInput;
        fetch(`${this.state.dataPath}q=${this.state.searchStrInput}`)
            .then(response => { return response.json() })
            .then(data => {
                if (currentSearchStr === this.state.searchStrInput)
                    if (data.error)
                        this.setState({ searchResults: [], searchError: data.error });
                    else
                        this.setState({ searchResults: data, searchError: null });
            });        
    }
}

export default Search