import React, { Component, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import ReactQuill, { Quill } from 'react-quill';
import QuillEditor from '../../../editor/QuillEditor';
import { Typography, Button, Form, message, Input } from 'antd';
import { useAlert } from "react-alert";


const { Title } = Typography;

function CreatePage(props) {
    const postId = props.match.params.postId;
    const alert = useAlert();

    const [content, setContent] = useState('');
    // const [text, setText] = useState('');
    const [TitleValue, setTitleValue] = useState("")
    const [type, setType] = useState("")
    const [files, setFiles] = useState([])
    const [user, setUser] = useState('')


    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onTypeChange = (event) => {
        setType(event.currentTarget.value)
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    
    useEffect(() => {
        axios.get('user/authenticated')
            .then(response => {
                setUser(response.data.user)
            })
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();

        alert.info(type)

        if (TitleValue === '' | content === '' || type === '') {
            alert.error('Vui long nhap day du thong tin')
        }

        else {
            const variables = {
                content: content,
                title: TitleValue,
                type: type,
                username: user.username
            }

            if (type === "bantinchung") {
                axios.post(`/api/blog/createPost`, variables)
                    .then(response => {

                        if (response) {
                            alert.success("Post Created!");
                        } else {
                            alert.error('Couldnt get blog`s lists')
                        }
                    })
                setTimeout(() => {
                    props.history.push('/blogpage')
                }, 1000);
            } else if (type === "bantingiaovu") {
                axios.post(`/api/blog1/createPost`, variables)
                    .then(response => {

                        if (response) {
                            alert.success("Post Created!");
                        } else {
                            alert.error('Couldnt get blog`s lists')
                        }
                    })
                setTimeout(() => {
                    props.history.push('/blogpage')
                }, 1000);
            }
            else{
               alert.info('bantinchuyennganh not found')
            }
        }



    }



    return (

        <div style={{ textAlign: "center",padding:"0 5%",fontFamily:"Roboto" }}>

      
                <h3 style={{fontWeight:"bold",color:"#2a2a72",padding:"10px"}}>Create new post</h3>

            <div style={{ paddingBottom: "20px" }}>
                <Input
                    style={{ width: "100%" }}
                    placeholder={"Nhập tiêu đề"}
                    onChange={onTitleChange}
                    value={TitleValue}
                />
            </div>

            <div style={{ marginBottom: "20px" }}>
                <select class="custom-select"
                    value={type}
                    onChange={onTypeChange}>
                    <option selected>Type of post</option>
                    <option value="bantinchung">bantinchung</option>
                    <option value="bantingiaovu">bantingiaovu</option>
                    <option value="bantinchuyennganh">bantinchuyennganh</option>
                </select>
            </div>


            <QuillEditor
                placeholder={"Start Posting Something"}
                onFilesChange={onFilesChange}
                onEditorChange={onEditorChange}
                value={content} />

            <div style={{ textAlign: "right" }}><button className="btn btn-primary" onClick={onSubmit}>Post</button></div>

        </div>
//what sub
    )
}

export default CreatePage
