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
import ClassPage from './pages/ClassPage/ClassPage';
import Test from './pages/test';

import userService from './utils/userService';

function App() {
  let [user, setUser] = useState(null);

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
            <Route path='/classes' render={() => <Classes user={user} />} />
            <Route path='/collabs' render={() => <Classes user={user} />} />
            <Route path='/my-classes' render={() => <MyClasses user={user} />} />
            <Route path='/settings' render={() => <Settings user={user} />} />
            <Route path='/admin' render={() => <Admin user={user} />} />
            <Route path='/signup' render={({ history }) => <Signup history={history} handleSignUp={handleSignupLogin} />} />
            <Route path='/login' render={({ history }) => <Login history={history} handleLogin={handleSignupLogin} />} />
            <Route path='/logout' render={({ history }) => {
              userService.logout();
              history.push('/');
            }} />
            <Route path='/class/:id' render={() => <ClassPage user={user} />} />
            <Route path='/test' component={Test} />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
