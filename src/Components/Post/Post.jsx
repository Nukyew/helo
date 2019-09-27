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
            <div className="post-component">
                <div className="post-component-container">
                    <div className="post-title">
                        <div className="post-title-top">
                            <h1>{this.state.title}</h1>
                            <div className="post-title-author">
                                <p>By: {this.state.username}</p>
                                <div className="profile_pic" style={{
                                    backgroundImage:`url(${this.state.profile_pic})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "25px"
                                }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="post-bottom">
                        <div style={{
                            backgroundImage:`url(${this.state.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width: "300px",
                            height: "300px",
                            alignSelf: "center"
                        }}/>
                        <div className="post-content">
                            <p>Content: {this.state.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post