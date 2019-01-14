import React, { Component } from 'react'
import Search from '../Search'
import './style.css'

class App extends Component {

    render() {
        return (
            <div>
                <div className='outside'>outside</div>
                <Search />
                <div className='outside'>outside</div>
            </div>
        )
    }
}

export default App