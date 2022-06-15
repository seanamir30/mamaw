import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Body from '../components/Body';
import { useAuth } from '../context/AuthUserContext';
import { useUserData } from '../context/userData';
import { doc, getDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { getFirestore } from '@firebase/firestore';
import { useRouter } from 'next/router';

export default function Home() {
  const [userData, setUserData] = useUserData();
  const [isAdmin, setIsAdmin] = useState(false);
  const [items, setItems] = useState([])
  const { authUser } = useAuth();
  const db = getFirestore();
  const router = useRouter();

  const handleDelete = (id) => {
    deleteDoc(doc(db,"items",id))
  }

  useEffect(() => {
    if(!!authUser){
      getDoc(doc(db, "users", authUser.uid))
      .then((res)=>{
        setUserData({
          uid: authUser.uid,
          email: authUser.email,
          ...res.data()
        })
        res.data().role === 'admin' ? setIsAdmin(true) : setIsAdmin(false)
      })

      getDocs(collection(db, 'items'))
      .then((res)=>{
        const arr = []
        res.forEach((doc) => {
          arr.push(doc.data())
        });
        setItems(arr)
      })

    } else {
      setUserData()
    }
  }, [authUser, handleDelete])

  const renderAdminTable = () => {
    return(
      <div className="w-screen flex justify-center items-center mt-16">
      <button className="bg-white rounded-xl h-[51px] w-[227px]" onClick={()=>router.push('/admin/add-item')}>Add Item</button>
      <div className="grid grid-cols-7 bg-white bg-opacity-50 absolute offset p-9 mt-56 rounded-xl">
            <div className="font-bold">cuid</div>
            <div className="font-bold">name</div>
            <div className="font-bold">description</div>
            <div className="font-bold">price</div>
            <div className="font-bold">quantity</div>
            <div className="font-bold">sold</div>
            <div className="font-bold">actions</div>
        {items.map((item)=>(
          <>
            <div>{item.cuid}</div>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>{item.price}</div>
            <div>{item.quantity}</div>
            <div>{item.sold ? item.sold : 0}</div>
            <div className="font-bold"><span className="cursor-pointer hover:underline" onClick={()=>{router.push({pathname:`item/${item.cuid}`,state: { detail: item }},`item/${item.cuid}`)}}>edit</span><span className="cursor-pointer hover:underline" onClick={()=>handleDelete(item.cuid)}> delete</span></div>
          </>

        ))}
      </div>
      </div>
    )
  }
  return (
    <div>
      <Header/>
      {isAdmin ? renderAdminTable() : <><Body/><Footer/></>}
    </div>
  )
}
