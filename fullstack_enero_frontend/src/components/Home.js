import React from 'react'
import axios from 'axios'
const url = "http://localhost:3000/imageProfile" 
const serviceUpload  = axios.create({url, withCredentials: true})

class Home extends React.Component {
    state = {
        privateInfo: {},
        authorized: false,
        profilePic: {},
        respo: {}
    }

    componentDidMount() {
        this.getPrivateData()
    }


    getPrivateData = () => {
        let url = "http://localhost:3000/private"
        axios.get(url, { withCredentials: true })
            .then(res => {
                console.log(res)
                this.setState({ privateInfo: res.data, authorized: true })
            })
            .catch(e => {
                console.log(e)
                this.props.history.push('/login')
            })
    }

    handleChange = (e) => {
        this.setState({profilePic: e.target.files[0]})
    }

    handleSubmit = () => {
        this.subeImagen(this.state.profilePic, url)
            .then(res => this.setState({profilePic: res.profilePic}))
    }

    subeImagen = (file, url) => {
        const formData = new FormData()
        formData.append('picture', file)
        return serviceUpload.post(url, formData, {headers: {
            'Content-Type': 'multipart/form-data',
          },})
          .then( (res) => res.data )
          .catch( e => console.log(e))
        }
    

    render() {
        let { privateInfo } = this.state
        if(this.state.authorized) {
            return(
                <div>
                    <h2>{privateInfo.message}</h2>
                    <h1>{privateInfo.name}</h1>
                    <img src={privateInfo.photo} alt=""/>
                    <label >Deseas cambiar tu foto de perfil</label>
                    <input type="file" onChange={this.handleChange}/>
                    <button onClick={this.handleSubmit}>Vamos pues!</button>
                </div>
            )
        }else {
            return (
                <div>
                    <h1>Home</h1>
                    <p>Loggeate primero bro</p>
                </div>
            )
        }
    }
}

export default Home