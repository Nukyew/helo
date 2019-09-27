import React from 'react'
import axios from 'axios'

class Post extends React.Component{
    constructor(){
        super()
        this.state = {
            title: '',
            image: '',
            content: '',
            username: '',
            profile_pic: ''
        }
    }
    
    componentDidMount = () => {
        this.getOnePost()
    }

    getOnePost = async () => {
        const res = await axios.get(`/api/post/${this.props.match.params.postid}`)
        this.setState({
            title: res.data[0].title,
            image: res.data[0].img,
            content: res.data[0].content,
            username: res.data[0].username,
            profile_pic: res.data[0].profile_pic
        })
    }

    render(){
        return(
            <div>
                This is Post.
                <h2>Title: {this.state.title}</h2>
                <img src={this.state.image} alt={this.state.title}/>
                <p>Content: {this.state.content}</p>
                <h3>Author: {this.state.username}</h3>
                <img src={this.state.profile_pic} alt={this.state.username}/>
            </div>
        )
    }
}

export default Post