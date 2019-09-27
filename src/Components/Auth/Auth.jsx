import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {handleUser} from '../../ducks/reducer'

class Auth extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }

    registerUser = async () => {
        const {username, password} = this.state
        const res = await axios.post('/auth/register', {username, password})
        if (res.data.username){
            this.props.history.push('/dashboard')
            this.props.handleUser(res.data.id, res.data.username, res.data.profile_pic)
        } else {
            alert(`${res.data.message}`)
        }
    }

    loginUser = async () => {
        const {username, password} = this.state
        const res = await axios.post('/auth/login', {username, password})
        if (res.data.username){
            this.props.handleUser(res.data.username, res.data.profile_pic)
            this.props.history.push('/dashboard')
        } else {
            alert(`${res.data.message}`)
        }
    }

    render(){
        return(
            <div>
                This is Auth.
                <input onChange={e => this.handleChange(e, 'username')}/>
                <input onChange={e => this.handleChange(e, 'password')}/>
                <button onClick={this.loginUser}>Login</button>
                <button onClick={this.registerUser}>Register</button>
            </div>
        )
    }
}

export default connect(null, {handleUser})(Auth)