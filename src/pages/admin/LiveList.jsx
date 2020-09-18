import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import classService from '../../utils/classService'

export default function LiveList() {

  const { id } = useParams();
  const [live, setLive] = useState({});
  const [userList, setUserList] = useState([{ username: 'Tim', createdAt: 'Jan-20-2020', classNum: 3, email: 't@t' }]);
  const [errMsg, setErrMsg] = useState('');

  const tabledUsers = userList.map(user =>
    (<tr>
      <th>{user.username}</th>
      <th>{user.numOfClasses}</th>
      <th>{new Date(user.createdAt).toDateString()}</th>
      <th>{user.email}</th>
    </tr>))

  const emaillist = userList.map(user => user.email);

  useEffect(() => {
    async function oneTime() {
      try {
        let resp = await classService.getLive(id);
        console.log('response: ', resp.live);
        setLive(resp.live);
        setUserList(resp.users);
      } catch (err) {
        setErrMsg(err);
      }
    }
    oneTime();
  }, [])
  return (
    <div>
      {live.name ? <h1>{live.name} Subscribers</h1> : <h1>Live Class Subscribers</h1>}
      <p>{errMsg}</p>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th># of Classes Enrolled</th>
            <th>Signed up</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {tabledUsers}
        </tbody>
      </table>
      <a href={`mailto:${emaillist.join(',')}`} target="_blank">Email Blast</a>
    </div>
  )
}
