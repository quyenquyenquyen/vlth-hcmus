import React, { Component } from 'react'
import styled from 'styled-components';
import Home from './Home';
import $ from 'jquery';
import {Grid} from '@material-ui/core'
import CreateSubject from './CreateSubject';
import {Link} from 'react-router-dom'


export default class NavbarW3 extends Component {

    componentDidMount() {
        const $button = document.querySelector('#sidebar-toggle');
        const $wrapper = document.querySelector('#wrapper');

        $button.addEventListener('click', (e) => {
            e.preventDefault();
            $wrapper.classList.toggle('toggled');
        });

    }
    render() {
        return (
            <Wrapper>
                <div id="wrapper">

                    <aside id="sidebar-wrapper">
                        <div class="sidebar-brand">
                            <h2>Hippo Alpha</h2>
                            <hr/>
                        </div>
                        <ul class="sidebar-nav">
                            <li >
                                <a href="#"><i class="fa fa-info"></i>About</a>
                            </li>
                            <li>
                                <a href="#"><i class="fa fa-upload"></i>Upload Report Guide</a>
                            </li>
                            <li>
                                <a href="#"><i class="fa fa-comment"></i>Feedback</a>
                            </li>
                            <li>
                                <a href="#"><i class="fa fa-ticket"></i>Request Ticket</a>
                            </li>
                            <li >
                            <Link to="/listSubject"><i class="fa fa-book"></i>Course</Link>
                            </li>
                            <li>
                                <Link to="/createSubject"><i class="fa fa-plus"></i>Create Subject</Link>
                            </li>
                            
                        </ul>
                    </aside>

                    <div id="navbar-wrapper">
                        <nav class="navbar navbar-inverse">
                            <div class="container-fluid">
                                <div class="navbar-header" style={{ height: "60px" }}>
                                    <a href="#" class="navbar-brand" id="sidebar-toggle">
                                        <i class="fa fa-bars" style={{marginTop:"15px"}}> &nbsp; Menu</i>
                                    </a>
                                    <a href="/logout" class="navbar-brand" id="sidebar-toggle">
                                        <i class="fa fa-sign-out" ></i>
                                    </a>
                                    <a href="/changePass" class="navbar-brand" id="sidebar-toggle">
                                        <i class="fa fa-user"></i>
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div>

                    {/* <section id="content-wrapper">
                        <Grid container>
                            <Grid xs={12}>
                                <h2 class="content-title">Test</h2>
                                <p>Lorem ipsum...</p>
                            </Grid>
                        </Grid>
                    </section> */}

                </div>
            </Wrapper>
        )
    }
}

const Wrapper = styled.nav`
body {
    padding-bottom: 30px;
    position: relative;
    min-height: 100%;
  }
  
  a {
    transition: background 0.2s, color 0.2s;
  }
  a:hover,
  a:focus {
    text-decoration: none;
  }
  
  #wrapper {
    padding-left: 0;
    transition: all 0.5s ease;
    position: relative;
  }
  
  #sidebar-wrapper {
    z-index: 1000;
    position: fixed;
    left: 250px;
    width: 0;
    height: 100%;
    margin-left: -250px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #222;
    transition: all 0.5s ease;
  }
  
  #wrapper.toggled #sidebar-wrapper {
    width: 250px;
  }

  .hr{
    color:white
  }
  
  .sidebar-brand {
    position: absolute;
    top: 0;
    width: 250px;
    text-align: center;
    padding: 20px 0;
  }
  .sidebar-brand h2 {
    margin: 0;
    font-weight: 600;
    font-size: 24px;
    color: #fff;
  }
  
  .sidebar-nav {
    position: absolute;
    top: 75px;
    width: 250px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .sidebar-nav > li {
    text-indent: 10px;
    line-height: 42px;
  }
  .sidebar-nav > li a {
    display: block;
    text-decoration: none;
    color: #757575;
    font-weight: 600;
    font-size: 18px;
  }
  .sidebar-nav > li > a:hover,
  .sidebar-nav > li.active > a {
    text-decoration: none;
    color: #fff;
    background: #F8BE12;
  }
  .sidebar-nav > li > a i.fa {
    font-size: 24px;
    width: 60px;
  }
  
  #navbar-wrapper {
      width: 100%;
      position: absolute;
      z-index: 2;
  }
  #wrapper.toggled #navbar-wrapper {
      position: absolute;
      margin-right: -250px;
  }
  #navbar-wrapper .navbar {
    border-width: 0 0 0 0;
    background-color: #eee;
    font-size: 24px;
    margin-bottom: 0;
    border-radius: 0;
  }
  #navbar-wrapper .navbar a {
    color: #757575;
  }
  #navbar-wrapper .navbar a:hover {
    color: #F8BE12;
  }
  
  #content-wrapper {
    width: 100%;
    position: absolute;
    padding: 0px;
    top: 100px;
  }
  #wrapper.toggled #content-wrapper {
    position: absolute;
    margin-right: -250px;
  }
  
  @media (min-width: 992px) {
    #wrapper {
      padding-left: 250px;
    }
    
    #wrapper.toggled {
      padding-left: 60px;
    }
  
    #sidebar-wrapper {
      width: 250px;
    }
    
    #wrapper.toggled #sidebar-wrapper {
      width: 60px;
    }
    
    #wrapper.toggled #navbar-wrapper {
      position: absolute;
      margin-right: -190px;
  }
    
    #wrapper.toggled #content-wrapper {
      position: absolute;
      margin-right: -190px;
    }
  
    #navbar-wrapper {
      position: relative;
    }
  
    #wrapper.toggled {
      padding-left: 60px;
    }
  
    #content-wrapper {
      position: relative;
      top: 0;
    }
  
    #wrapper.toggled #navbar-wrapper,
    #wrapper.toggled #content-wrapper {
      position: relative;
      margin-right: 60px;
    }
  }
  
  @media (min-width: 768px) and (max-width: 991px) {
    #wrapper {
      padding-left: 60px;
    }
  
    #sidebar-wrapper {
      width: 60px;
    }
    
  #wrapper.toggled #navbar-wrapper {
      position: absolute;
      margin-right: -250px;
  }
    
    #wrapper.toggled #content-wrapper {
      position: absolute;
      margin-right: -250px;
    }
  
    #navbar-wrapper {
      position: relative;
    }
  
    #wrapper.toggled {
      padding-left: 250px;
    }
  
    #content-wrapper {
      position: relative;
      top: 0;
    }
  
    #wrapper.toggled #navbar-wrapper,
    #wrapper.toggled #content-wrapper {
      position: relative;
      margin-right: 250px;
    }
  }
  
  @media (max-width: 767px) {
    #wrapper {
      padding-left: 0;
    }
  
    #sidebar-wrapper {
      width: 0;
    }
  
    #wrapper.toggled #sidebar-wrapper {
      width: 250px;
    }
    #wrapper.toggled #navbar-wrapper {
      position: absolute;
      margin-right: -250px;
    }
  
    #wrapper.toggled #content-wrapper {
      position: absolute;
      margin-right: -250px;
    }
  
    #navbar-wrapper {
      position: relative;
    }
  
    #wrapper.toggled {
      padding-left: 250px;
    }
  
    #content-wrapper {
      position: relative;
      top: 0;
    }
  
    #wrapper.toggled #navbar-wrapper,
    #wrapper.toggled #content-wrapper {
      position: relative;
      margin-right: 250px;
    }
  }
`
