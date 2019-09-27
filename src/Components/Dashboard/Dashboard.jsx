import React from 'react'
// import Post from '../Post/Post'
// import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            searchTerm: '',
            myPosts: true,
            posts: []
        }
    }

    componentDidMount = () => {
        this.getPosts()
    }

    handleChange = e => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    myPostsChange = e => {
        this.setState(prevState => ({
            myPosts: !prevState.myPosts 
        }))
    }

    resetSearch = async () => {
        const res = await axios.get(`/api/posts/?userposts=${this.state.myPosts}&search=`)
        this.setState({
            searchTerm: '',
            posts: res.data
        })
    }

    getPosts = async () => {
        const res = await axios.get(`/api/posts/?userposts=${this.state.myPosts}&search=${this.state.searchTerm}`)
        this.setState({
            posts: res.data
        })
    }

    render(){
        let posts = this.state.posts.map((el, i) => {
            return (
                <Link className="link" key={el.post_id} to={`/post/${el.post_id}`}>
                    <div className="post">
                        <h2>{el.title}</h2>
                        <div className="post-info">
                            <p>By: {el.username}</p>
                            {/* <img alt={el.username} src={el.profile_pic}/> */}
                            <div className="profile_pic" style={{
                                backgroundImage:`url(${el.profile_pic})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                width: "50px",
                                height: "50px",
                                borderRadius: "25px"
                            }}></div>
                        </div>
                    </div> 
                </Link>
            )
        })
        return(
            <div className="dashboard">
                <div className="dashboard-container">
                    <div className="search-bar-container">
                        <div className="search-bar">
                            <input placeholder="Search by Title" value={this.state.searchTerm} onChange={e => this.handleChange(e)}/>
                            <button onClick={this.getPosts}>Search</button>
                            <button onClick={this.resetSearch}>Reset</button>
                        </div>
                        <div className="search-bar-button">
                            My posts:<input onChange={e => this.myPostsChange(e)} checked={this.state.myPosts} type="checkbox"/>
                        </div>
                    </div>
                    <div className="posts">
                        {posts}
                    </div>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = reduxState => {
//     const {id} = reduxState
//     return {id}
// }

// export default connect(mapStateToProps)(Dashboard)
export default Dashboard