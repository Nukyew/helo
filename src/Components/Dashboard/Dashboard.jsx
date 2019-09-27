import React from 'react'
// import Post from '../Post/Post'
import {connect} from 'react-redux'
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
        const res = await axios.get(`/api/posts/${this.props.id}?userposts=${this.state.myPosts}&search=`)
        console.log(res.data)
        this.setState({
            searchTerm: '',
            posts: res.data
        })
    }

    getPosts = async () => {
        const res = await axios.get(`/api/posts/${this.props.id}?userposts=${this.state.myPosts}&search=${this.state.searchTerm}`)
        this.setState({
            posts: res.data
        })
    }

    render(){
        let posts = this.state.posts.map((el, i) => {
            return (
                <Link  key={el.post_id} to={`/post/${el.post_id}`}>
                    <div className="post">
                        <h2>{el.title}</h2>
                        <p>{el.username}</p>
                        <img alt={el.username} src={el.profile_pic}/>
                    </div> 
                </Link>
            )
        })
        console.log(this.state.posts)
        return(
            <div>
                This is Dashboard.
                <input value={this.state.searchTerm} onChange={e => this.handleChange(e)}/>
                <button onClick={this.getPosts}>Search</button>
                <button onClick={this.resetSearch}>Reset</button>
                My posts:<input onChange={e => this.myPostsChange(e)} checked={this.state.myPosts} type="checkbox"/>
                {posts}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {id} = reduxState
    return {id}
}

export default connect(mapStateToProps)(Dashboard)