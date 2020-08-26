import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default class UploadFile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            files: [],
            file:[]
          
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();

    }

    componentDidMount() {
        this.fetData()

    }

    handleSubmit(event) {
        axios.post('/up/upload',this.input.current.value)
      }

      handleChange =e=> {
        this.setState({ ...this.state, [e.target.name]: e.target.files[0] });
        console.log('file',e.target.name)
      }

  
    putSubject = (md5) => {
        const variable = {
            subjectName: 'Lap trinh reacts'
        }
        axios.put(`/up/subject/${md5}`, variable)
            .then(response => {
                if (response) {
                    alert('Put Created!');

                }
            })
    }

    fetData = () => {
        axios.get('/up/files')
            .then(response => {

                this.setState({
                    files: response.data
                })
            })
    }






    render() {
        const { files } = this.state
        const renderFile = files.map((file, index) => {

            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {

                return (
                    <div key={file._id} className="card card-body mb-3">
                        <div><Link to={`/file/image/detail/${file.filename}`}>{file.filename} </Link></div>
                        <img src={`/up/image/${file.filename}`} alt="Hinhanh" style={{ width: "200px" }} />
                        <form method="POST" action={`/up/files/${file._id}?_method=DELETE`} >
                            <button className="btn-danger btn-block mt-4">Delete</button>
                        </form>
                        {/* <button onClick={()=>{axios.put(`/up/subject/${file.md5}`,{subjectName:'caovonhaquyen'})}}>put</button> */}
                    </div>


                )
            } if (file.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {

                return (
                    <div key={file._id} className="card card-body mb-3">
                        <a href={`http://localhost:5000/up/document/${file.filename}`}>{file.filename}</a>
                        <form method="POST" action={`/up/files/${file._id}?_method=DELETE`} >
                            <button className="btn-danger btn-block mt-4">Delete</button>
                        </form>
                        <button onClick={() => { axios.put(`/up/subject/${file.md5}`, { subjectName: 'caovonhaquyen' }) }}>put</button>
                    </div>
                )
            }
        })



        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <h1 className="test-center display-4 my-4">Mongo File Upload</h1>

                        <form action="/up/upload" method="POST" encType="multipart/form-data">
                            <div className="custom-file mb-3">
                                <input type="file" name="file" id="file" className="custom-file-input" />
                                <label htmlFor="file" className="custom-file-label"> Choose File</label>
                                <button type="submit" value="Submit" className="btn btn-primary btn-block" >Submit</button>
                            </div>
                        </form>

                        <form action="/up/upload" method="POST" encType="multipart/form-data">
                            <div className="custom-file mb-3">
                                <input type="file" name="file" id="file" className="custom-file-input" />
                                <label htmlFor="file" className="custom-file-label"> Choose File</label>
                                <button type="submit" value="Submit" className="btn btn-primary btn-block" >Submit</button>
                            </div>
                        </form>

                      

                        <hr />
                        {renderFile}

                    </div>
                </div>
            </div>
        )
    }
}
