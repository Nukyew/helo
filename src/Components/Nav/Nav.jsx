import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleUser, clearState} from '../../ducks/reducer'
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
                <div className="profile_pic" style={{
                        backgroundImage:`url(${this.props.profile_pic})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        width: "80px",
                        height: "80px",
                        borderRadius: "40px"
                    }}></div>
                <p>{this.props.username}</p>
                <div className="nav-buttons">
                    <Link to='/dashboard'>
                        <i className="fas fa-home fa-3x"></i>
                    </Link>
                    <Link to='/new'>
                        <i className="fas fa-plus-square fa-3x"></i>
                    </Link>
                    <Link to='/'>
                         <i className="fas fa-power-off fa-3x"></i>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {handleUser, clearState}

const mapStateToProps = reduxState => {
    const {username, profile_pic} = reduxState
    return {username, profile_pic}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)