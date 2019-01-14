import React, { Component } from 'react'
import UserItem from '../UserItem'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'

class UserList extends Component {
    render() {
        const { userList } = this.props;
        return (
            <ul className="userList list-group w100">
                {
                    userList &&
                    userList.map(user => {
                        return <li key={user.user_id} className="list-group-item">
                            <UserItem user={user} />
                        </li>
                    })
                }
            </ul>
        )
    }
}

export default UserList