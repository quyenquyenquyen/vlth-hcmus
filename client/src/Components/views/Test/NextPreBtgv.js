import React, { Component, useContext, useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Icon, Avatar, Col, Typography } from 'antd';
import { useAlert } from "react-alert";
import { AuthContext } from '../../../Context/AuthContext';
export default function NextPreBtgv(props) {

    const alert = useAlert();
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const [index, setIndex] = useState(parseInt(props.match.params.index))
    const [postId, setPostId] = useState(props.match.params.postId)
    const [blogs, setBlogs] = useState([])
    const [text, setText] = useState('')
    const [content, setContent] = useState('')
    const [id, setId] = useState('')
    const [nextTitle, setNextTitle] = useState('')
    const [preTitle, setPreTitle] = useState('')
    const [indexSet, setIndexSet] = useState(0)
    const [isDisplayNext, setIsDisplayNext] = useState(true)
    const [isDisplayPre, setIsDisplayPre] = useState(true)


    useEffect(() => {

        axios.get('/api/blog1/getBlogs')
            .then(response => {
                setBlogs(response.data.blogs1)
                
                setText(response.data.blogs1[index].title)
                setContent(response.data.blogs1[index].content)
                setId(response.data.blogs1[index]._id)

                if (index === response.data.blogs1.length - 1) {
                    setIsDisplayPre(false)
                    setNextTitle(response.data.blogs1[index-1].title)
                   
                } else if (index === 0) {
                    setIsDisplayNext(false)
                    setPreTitle(response.data.blogs1[index+1].title)
                   
                }
                else {
                    setIsDisplayNext(true)
                    setIsDisplayPre(true)
                    setNextTitle(response.data.blogs1[index-1].title)
                    setPreTitle(response.data.blogs1[index+1].title)
                }


            })
    }, [])



    const onDelete = () => {
        if (window.confirm('Are u sure to delete this post')) {
            axios.delete('/api/blog1/getBlogs/' + postId)
                .then(res => {
                    if (res) {
                        alert.success("delete successfully")
                        setTimeout(() => {
                            props.history.push('/blogpage')
                        }, 1000);
                    }
                })

        }
    }

    const goToNext = () => {
        setIndex(index - 1)
        setText(blogs[index - 1].title)
        setContent(blogs[index - 1].content)
        setId(blogs[index]._id)

    };

    const goToPre = () => {
        setIndex(index + 1)
        setText(blogs[index + 1].title)
        setContent(blogs[index + 1].content)
        setId(blogs[index]._id)

    };

    const renderButton = (
        isDisplayPre &&isDisplayNext ?
            <div >
                <button className="btn btn-light" style={{ float: "left",margin:"5px" }}><a href={`/blog1/post/detail/${id}/${index}`} onClick={goToPre}>Pre<p class="tooltiptext">{preTitle}</p></a></button>
                <button className="btn btn-light" style={{ float: "right" }}><a href={`/blog1/post/detail/${id}/${index}`} onClick={goToNext}>Next<p class="tooltiptext">{nextTitle} </p></a></button>
                {/* <a href={`/blog/post/detail/${id}/${index}`} style={{float:"right"}} onClick={goToNext}>Next<p class="tooltiptext">{nextTitle}</p></a> */}
            </div>
            : isDisplayNext === false ? <button className="btn btn-light" style={{ float: "left" }}><a href={`/blog1/post/detail/${id}/${index}`} onClick={goToPre}>Pre<p class="tooltiptext">{preTitle}</p></a></button>
                : isDisplayPre === false ? <button className="btn btn-light" style={{ float: "right" }}><a href={`/blog1/post/detail/${id}/${index}`} onClick={goToNext}>Next<p class="tooltiptext">{nextTitle}</p></a></button>
                    : <div>false</div>)


    return (
        <Wrapper>

            <div className="container">
                <h4 style={{ color: "red", textAlign: "center" }}>{text}</h4>
                <div style={{textAlign:"center"}}>
                {user.role === "admin" ? <button className="btn btn-outline-danger btn-sm" style={{margin:"0 5px"}} onClick={() => onDelete()}><i className="fa fa-trash"/></button> : ""}
                {user.role === "admin" ? < Link to={`/blog1/post/update/${postId}`}><button style={{margin:"0 5px"}} className="btn btn-outline-secondary btn-sm"><i className="fa fa-pencil"/></button></Link> : ''}
                </div>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: content }} />
                {renderButton}
               
                {/* <button className="btn btn-light" onClick={goToNext} style={{ float: "right" }}><a href={`/blog/post/detail/${id}/${index}`}>Next<p class="tooltiptext">{nextTitle}</p></a></button>
                    <button className="btn btn-light" onClick={goToPre} ><a href={`/blog/post/detail/${id}/${index}`}>Pre<p class="tooltiptext">{preTitle}</p></a></button> */}
            </div>

        </Wrapper>)

}

const Wrapper = styled.div`
a{
    font-size:1.0rem;
    width:150px;
}
.container {
    width: 1170px;
    max-width: 90%;
    margin: 0 auto;
    
  }
button {
    position: relative;
    display: inline-block;
  }
  
button .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
  
    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }
  
button :hover .tooltiptext {
    visibility: visible;
  }

`

