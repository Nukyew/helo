import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Nav extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }

    render(){
        console.log(this.props)
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
                    <button>Logout</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {username, profile_pic} = reduxState
    return {username, profile_pic}
}

export default connect(mapStateToProps)(Nav)