import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import { useUserData } from '../context/userData';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import { collection ,getDocs,getFirestore } from "firebase/firestore"; 

const Admin = () => {
  const [userData, setUserData] = useUserData();
  const [items, setItems] = useState([]);
  const router = useRouter()
  const {authUser} = useAuth()
  const db = getFirestore()
  const {itemDeleted} = router.query;

  useEffect(() => {
    getDocs(collection(db, 'items'))
    .then((res)=>{
      const arr = []
      res.forEach((doc) => {
        arr.push(doc.data())
      });
      setItems(arr)
    })
  }, [])
  

  useEffect(() => {
    if (userData?.role !== 'admin') router.push('/')
  }, [authUser])
  
  return (
    <div>
      <div>{itemDeleted} has been deleted</div>
      <Header/>
      <button onClick={()=>{router.push('/admin/add-item')}}>add</button>
      {items.map((item)=>(
        <div onClick={()=>{router.push({pathname:`/${item.cuid}`,state: { detail: item }},`/${item.cuid}`)}} key={item.cuid}>{item.name}</div>
      ))}
    </div>
  )
}

export default Admin