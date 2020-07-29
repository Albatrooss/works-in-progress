import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer.jsx'

import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';
import About from './pages/About/About';
import Classes from './pages/Classes/Classes';
import MyClasses from './pages/Classes/MyClasses';
import Signup from './pages/Signup/Signup'
import Login from './pages/Signup/Login'
import Admin from './pages/admin/admin'
import Test from './pages/test';

import userService from './utils/userService';

// const schedule = [
//   [null, null, 'Tango'],
//   [null, null, 'Ballroom'],
//   ['Child Jazz', 'Child Tap', 'Child Ballet'],
//   [null, null, 'Tap'],
//   ['Musical Theatre', 'Heels', 'Jazz'],
//   ['Ballet', null, 'null'],
//   ['Tap', null, 'Jazz'],
// ]

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function App() {
  let [user, setUser] = useState(null);
  let [dropped, setDropped] = useState(false);

  // let [test, setTest] = useState({ name: 'test' })

  const handleDrop = () => {
    setDropped(!dropped);
  }

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
      <NavBar dropped={dropped} handleClick={handleDrop} user={user} />
      <div className='main-body'>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/classes' component={Classes} />
            <Route path='/collabs' component={Classes} />
            <Route path='/my-classes' component={MyClasses} />
            <Route path='/settings' component={Settings} />
            <Route path='/admin' component={Admin} />
            <Route path='/signup' render={({ history }) => <Signup history={history} handleSignUp={handleSignupLogin} />} />
            <Route path='/login' render={({ history }) => <Login history={history} handleLogin={handleSignupLogin} />} />
            <Route path='/logout' render={({ history }) => {
              userService.logout();
              history.push('/');
            }} />
            <Route path='/test' component={Test} />
          </Switch>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  )
}

export default App;
