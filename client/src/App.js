import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import Admin from './Components/Admin';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UploadFile from './Components/UploadFile';
import ImageItem from './Components/ImageItem';
import TextItem from './Components/TextItem';
import ChangePass from './Components/ChangePass';
import CreateSubject from './Components/CreateSubject';
import ListSubject from './Components/ListSubject'
import SubjectDetail from './Components/SubjectDetail';
import Test from './Components/Test';
import NavTest from './Components/NavTest';
import { NavigationBar } from './Components/NavigationBar'
import Sidebar from './Components/Sidebar'
import NavbarW3 from './Components/NavbarW3';
import TestUpload from './Components/TestUpload'
class App extends Component {
  render() {
    return (
      <Router >
        <Navbar />
        {/* <Sidebar/> */}
        <div style={{textAlign:"center"}}>
          {/* <Test/> */}
        </div>
        

        <div style={{ textAlign: "center", padding: '100px' }}>
          <Switch>

            <UnPrivateRoute path="/login" component={Login} />
            <UnPrivateRoute path="/register" component={Register} />
            <PrivateRoute path="/changePass" roles={["user", "admin"]} component={ChangePass} />
            <PrivateRoute path="/admin" roles={["admin"]} component={UploadFile} />
            <PrivateRoute path="/file/image/detail/:filename" roles={["admin"]} component={ImageItem} />
            <PrivateRoute path="/file/text/detail/:filename" roles={["admin"]} component={TextItem} />
            <PrivateRoute path="/createSubject" roles={["user", "admin"]} component={CreateSubject} />
            <PrivateRoute path="/listSubject" roles={["user", "admin"]} component={ListSubject} />
            <PrivateRoute path="/subject/detail/:id" roles={["admin"]} component={SubjectDetail} />
            {/* <PrivateRoute path="nav" roles={["admin"]} component={Navbar} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;



{/* <Navbar />

  <UnPrivateRoute path="/login" component={Login} />
  <UnPrivateRoute path="/register" component={Register} />
  <PrivateRoute path="/changePass" roles={["user", "admin"]} component={ChangePass} />
  <PrivateRoute path="/admin" roles={["admin"]} component={UploadFile} />
  <PrivateRoute path="/file/image/detail/:filename" roles={["admin"]} component={ImageItem} />
  <PrivateRoute path="/file/text/detail/:filename" roles={["admin"]} component={TextItem} />
  <PrivateRoute path="/createSubject" roles={["user", "admin"]} component={CreateSubject} />
  <PrivateRoute path="/listSubject" roles={["user", "admin"]} component={ListSubject} />
  <PrivateRoute path="/subject/detail/:id" roles={["admin"]} component={SubjectDetail} />
  <PrivateRoute path="/test" roles={["admin"]} component={Test} /> */}