import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleUser} from '../../ducks/reducer'
import {clearState} from '../../ducks/reducer'
import axios from 'axios'

class Nav extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }

    componentDidMount = () => {
        this.getUserById()
    }

    getUserById = async () => {
        let res = await axios.get('/api/auth/me')
        this.props.handleUser(res.data[0].username, res.data[0].profile_pic)
    }

    userLogout = async () => {
        await axios.post('/auth/logout')
        this.props.clearState()
    }

    render(){
        return(
            <div className="nav">
                This is Nav.
                <h2>{this.props.username}</h2>
                <img alt={this.props.username} src={this.props.profile_pic}/>
                <Link to='/dashboard'>
                    <button>Home</button>
                </Link>
                <Link to='/new'>
                    <button>New Post</button>
                </Link>
                <Link to='/'>
                    <button onClick={this.userLogout}>Logout</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {username, profile_pic} = reduxState
    return {username, profile_pic}
}

export default connect(mapStateToProps, {handleUser, clearState})(Nav)