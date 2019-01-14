import React, { Component } from 'react'
import ModalForm from '../ModalForm'
import './style.css'

class UserItem extends Component {

    state = {
        showModal: false
    }

    userItemOnClickHandle = () => {
        const { user } = this.props;
        this.setState({ showModal: true });
        console.log('UserItem clicked to user', user);
    }
    
    render() {
        const { user } = this.props;
        return (
            <div onClick={this.userItemOnClickHandle} className='userItem'>
                {user.users_first_name} {user.user_last_name}
                {this.state.showModal && < ModalForm closeHandle={this.modalCloseHandle.bind(this)} user={user}/>}
            </div>
        )
    }

    modalCloseHandle() {
        this.setState({ showModal: false })
        console.log('hi from modalCloseHandle', this.setState({ showModal:false }))
    }
}

export default UserItem