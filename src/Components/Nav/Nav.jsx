import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

class Nav extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            profile_pic: ''
        }
    }

    componentDidMount = () => {
        this.getUserById()
    }

    getUserById = async () => {
        let res = await axios.get('/api/auth/me')
        const {username, profile_pic} = res.data[0]
        let user = {username, profile_pic}
        this.props.handleUser(user)
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
                         <i className="fas fa-power-off fa-3x" onClick={this.userLogout}></i>
                    </Link>
                </div>
            </div>
        )
    }
}

// const mapDispatchToProps = dispatch => {
//     // {handleUser, clearState}
//     return({
//         clearState: () => {dispatch(clearState())},
//         handleUser: () => {dispatch(handleUser())}
//     })
// }

const mapDispatchToProps = (dispatch) => {
    return {
        handleUser: (user) => {dispatch({type: 'HANDLE_USER', payload: user})},
        clearState: () => {dispatch({type: 'CLEAR_STATE'})}
    }
}



const mapStateToProps = reduxState => {
    const {username, profile_pic} = reduxState
    return {username, profile_pic}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)