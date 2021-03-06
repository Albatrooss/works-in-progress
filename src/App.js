import React, {
  useState,
  useEffect
} from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import './myStyles/App.css';
import './myStyles/myOutline.css'

import dotenv from 'dotenv';

import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer.jsx'

import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';
import About from './pages/About/About';
import Classes from './pages/Classes/Classes';
import Collabs from './pages/Classes/Collabs';
import MoveBD from './pages/Classes/MoveBD';
import MyClasses from './pages/Classes/MyClasses';
import Signup from './pages/Signup/Signup'
import Login from './pages/Signup/Login'
import Admin from './pages/admin/admin'
import AdminOneClass from './pages/admin/adminOnePage';
import ClassPage from './pages/ClassPage/ClassPage';
import LiveList from './pages/admin/LiveList';

import userService from './utils/userService';

dotenv.config();

function App() {
  let [user, setUser] = useState(null);

  const handleSignupLogin = () => {
    setUser(userService.getUser());
  }

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
              user ? <Classes user={user} history={history} /> : <Redirect to='/login' />
            )} />
            <Route path='/collabs' render={({ history }) => (
              user ? <Collabs user={user} history={history} /> : <Redirect to='/login' />
            )} />
            <Route path='/movement-breakdown' render={({ history }) => (
              user ? <MoveBD user={user} history={history} /> : <Redirect to='/login' />
            )} />
            <Route path='/my-classes' render={() => (
              user ? <MyClasses user={user} /> : <Redirect to='/login' />
            )} />
            <Route path='/settings' render={() => < Settings user={user} />} />
            <Route path='/signup' render={({ history }) => < Signup history={history} handleSignUp={handleSignupLogin} />} />
            <Route path='/login' render={({ history }) => < Login history={history} handleLogin={handleSignupLogin} />} />
            <Route path='/logout' render={({ history }) => {
              userService.logout();
              history.push('/');
            }} />
            <Route path='/class/:id' render={() => (
              user ? <ClassPage user={user} /> : <Redirect to='/login' />
            )
            } />
            {/* ===========================================
                  Admin
          =========================================== */}

            {user && <Route exact path='/admin' render={() => (
              process.env.REACT_APP_ADMINS.split(' ').includes(user._id) ?
                <Admin user={user} /> : <h1 className="red-text denied"> ACCESS DENIED </h1>
            )
            } />}
            {/* {user && <Route path='/admin/live' render={(props) => (
              process.env.REACT_APP_ADMINS.split(' ').includes(user._id) ?
                <AdminOneClass user={user} history={props.history} /> : <h1 className="red-text denied" > ACCESS DENIED </h1>
            )
            } />} */}
            {user && <Route path='/admin/live/:id' render={(props) => (
              process.env.REACT_APP_ADMINS.split(' ').includes(user._id) ?
                <LiveList user={user} history={props.history} /> : <h1 className="red-text denied" > ACCESS DENIED </h1>
            )
            } />}
            {user && <Route path='/admin/:id' render={(props) => (
              process.env.REACT_APP_ADMINS.split(' ').includes(user._id) ?
                <AdminOneClass user={user} history={props.history} /> : <h1 className="red-text denied" > ACCESS DENIED </h1>
            )
            } />}

          </Switch>
        </div>
        <Footer user={user} />
      </BrowserRouter>
    </>
  )
}

export default App;