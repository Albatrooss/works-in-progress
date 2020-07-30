import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import dotenv from 'dotenv';

import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer.jsx'

import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';
import About from './pages/About/About';
import Classes from './pages/Classes/Classes';
import Collabs from './pages/Classes/Collabs';
import MyClasses from './pages/Classes/MyClasses';
import Signup from './pages/Signup/Signup'
import Login from './pages/Signup/Login'
import Admin from './pages/admin/admin'
import ClassPage from './pages/ClassPage/ClassPage';

import userService from './utils/userService';

dotenv.config();

function App() {
  let [user, setUser] = useState(null);
  console.log('admins', process.env.REACT_APP_ADMINS)

  // let [test, setTest] = useState({ name: 'test' })


  const handleSignupLogin = () => {
    setUser(userService.getUser());
  }

  // const testClick = async () => {
  //   setTest(await userService.test());
  // }

  useEffect(() => {
    setUser(userService.getUser());
  }, [])

  return (
    <>
      <BrowserRouter>
        <NavBar user={user} />
        <div className='main-body'>
          <Switch>
            <Route exact path='/' render={() => <Home user={user} />} />
            <Route exact path='/about' render={() => <About user={user} />} />
            <Route path='/classes' render={({ history }) => (
              userService.getUser() ?
                <Classes user={user} history={history} /> :
                <Redirect to='/login' />
            )} />
            <Route path='/collabs' render={({ history }) => (
              userService.getUser() ?
                <Collabs user={user} history={history} /> :
                <Redirect to='/login' />
            )} />
            <Route path='/my-classes' render={() => (
              userService.getUser() ?
                <MyClasses user={user} /> :
                <Redirect to='/login' />
            )} />
            <Route path='/settings' render={() => <Settings user={user} />} />
            <Route path='/signup' render={({ history }) => <Signup history={history} handleSignUp={handleSignupLogin} />} />
            <Route path='/login' render={({ history }) => <Login history={history} handleLogin={handleSignupLogin} />} />
            <Route path='/logout' render={({ history }) => {
              userService.logout();
              history.push('/');
            }} />
            <Route path='/class/:id' render={() => (
              userService.getUser() ?
                <ClassPage user={user} /> :
                <Redirect to='/login' />
            )} />

            {user &&
              <Route path='/admin' render={() => (
                process.env.REACT_APP_ADMINS.split(' ').includes(user.username) ?
                  <Admin user={user} /> :
                  <h1 className="red-text denied">ACCESS DENIED</h1>
              )} />}
          </Switch>
        </div>
        <Footer user={user} />
      </BrowserRouter>
    </>
  )
}

export default App;
