import React from 'react'
// import {connect} from 'react-redux'
import axios from 'axios'

class Form extends React.Component{
    constructor(){
        super()
        this.state = {
            title: '',
            image_url: '',
            content: ''
        }
    }

    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }

    addPost = async () => {
        let {title, image_url, content} = this.state
        await axios.post(`/api/post/new/`, {title, image_url, content})
        this.props.history.push('/dashboard')
    }

    render(){
        return(
            <div>
                This is Form.
                {!this.state.image_url ? <></> : <img src={this.state.image_url} alt={this.state.title}/>}
                Title: <input onChange={e => this.handleChange(e, 'title')} />
                Image URL: <input onChange={e => this.handleChange(e, 'image_url')} />
                Content: <input onChange={e => this.handleChange(e, 'content')} />
                <button onClick={this.addPost}>Post</button>
            </div>
        )
    }
}

// const mapStateToProps = reduxState => {
//     const {id} = reduxState
//     return {id}
// }

// export default connect(mapStateToProps)(Form)
export default Form