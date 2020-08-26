import React, { Component } from 'react'
import styled from 'styled-components';
import Home from './Home';
import $ from 'jquery';
import { Grid } from '@material-ui/core'
import CreateSubject from './CreateSubject';
import App from '../App';


export default class NavbarW3 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }

    componentDidMount() {

    }
    render() {
        return (
            <Wrapper>
             <div class="sidebar">
                    <a class="active" href="/listSubject"><i className="fa fa-home"></i>Home</a>
                    <a href="#news">News</a>
                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>
                </div>
               
            </Wrapper>
        )
    }
}

const Wrapper = styled.nav`

  margin: 0;
  font-family: "Lato", sans-serif;


.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}
 
.sidebar a.active {
  background-color: #4CAF50;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
}
`
