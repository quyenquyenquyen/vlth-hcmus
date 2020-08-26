import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const StyledSideNav = styled.div`
position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
height: 100%;
width: 200px;     /* Set the width of the sidebar */
z-index: 1;      /* Stay on top of everything */
top: 3.4em;      /* Stay at the top */
background-color: #222; /* Black */
overflow-x: hidden;     /* Disable horizontal scroll */
padding-top: 10px;
`

class SideNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activePath: '/',
            items: [
                {
                    path: '/changePass', /* path is used as id to check which NavItem is active basically */
                    name: 'Home',
                    css: 'fa fa-home',
                    key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
                },
                {
                    path: '/createSubject',
                    name: 'About',
                    css: 'fa fa-user',
                    key: 2
                },
                {
                    path: '/listSubject',
                    name: 'NoMatch',
                    css: 'fa fa-hashtag',
                    key: 3
                },
            ]
        }
    }

    onItemClick = (path) => {
        this.setState({
            activePath: path
        })
    }
    render() {
        const { items, activePath } = this.state
        return (
            <StyledSideNav>
                {
                    items.map((item) => {
                        return (
                            <NavItem
                                path={item.path}
                                name={item.name}
                                css={item.css}
                                onItemClick={this.onItemClick}
                                active={item.path === activePath} 
                                key={item.key} />
                        )
                    })
                }
            </StyledSideNav>
        )
    }
}

class NavItem extends React.Component {

    handleClick = () => {
        const { path, onItemClick } = this.props
        onItemClick(path)
    }
    render() {
        const { active } = this.props;
        return (
            <StyleNavItem active={active}>
                <Link to={this.props.path} className={this.props.css} onClick={this.handleClick}>
                    &nbsp;{this.props.name}
                    <NavIcon></NavIcon>
                </Link>
            </StyleNavItem>
        )
    }
}

const StyleNavItem = styled.div`
height: 70px;
width: 75px; /* width must be same size as NavBar to center */
text-align: center; /* Aligns <a> inside of NavIcon div */
margin-bottom: 0;   /* Puts space between NavItems */
a {
  font-size: 1.8rem;
  color: ${(props) => props.active ? "orange" : "#9FFFCB"};
  :hover {
    opacity: 0.7;
    text-decoration: none; /* Gets rid of underlining of icons */
  }  
}

`;

const NavIcon = styled.div`

`
export default class Sidebar extends React.Component {
    render() {
        return (
            <SideNav></SideNav>
        )
    }
}