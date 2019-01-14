import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'

class ModalForm extends Component {

    render() {
        const { user } = this.props;
        user.vk_link = `https://vk.com/${user.user_domain}`;
        return (
            <div className="modal" tabIndex="-1" onClick={this.modalOutsideClickHandle}>
                <div className="modal-dialog" onClick={this.modalInsideClickHandle}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Card of user <a href={user.vk_link} target="_blank" rel='noreferrer noopener'>
                                    {user.users_first_name} {user.user_last_name}(id:{user.user_vk_id})
                                </a>
                            </h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="first-name" className="col-sm-3 col-form-label">First name</label>
                                    <div className="col-sm-9">
                                        <input
                                            id="first-name"
                                            type="text"
                                            className="form-control-plaintext"
                                            value={user.users_first_name} disabled/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="last-name" className="col-sm-3 col-form-label">Last name</label>
                                    <div className="col-sm-9">
                                        <input
                                            id="last-name"
                                            type="text"
                                            className="form-control-plaintext"
                                            value={user.user_last_name} disabled />
                                    </div>
                                </div>
                                
                            </form>
                        </div>
                        <div className="modal-footer">modalochka footer</div>
                    </div>                
                </div>    
            </div>
        )
    }

    closeModal = () => {
        if (this.props.closeHandle) this.props.closeHandle()
    }

    modalOutsideClickHandle = (event) => {
        event.stopPropagation();
        this.closeModal();        
    }

    modalInsideClickHandle = (event) => {
        event.stopPropagation();
    }

}

export default ModalForm