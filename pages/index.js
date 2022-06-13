import { useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Body from '../components/Body';
import { useAuth } from '../context/AuthUserContext';
import { useUserData } from '../context/userData';
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from '@firebase/firestore';
import { useRouter } from 'next/router';

export default function Home() {
  const [userData, setUserData] = useUserData();
  const { authUser } = useAuth();
  const db = getFirestore();
  const router = useRouter();

  useEffect(() => {
    if(!!authUser){
      getDoc(doc(db, "users", authUser.uid))
      .then((res)=>{
        setUserData({
          uid: authUser.uid,
          email: authUser.email,
          ...res.data()
        })
        if(res.data().role == 'admin') router.push('/admin');
      })
    } else {
      setUserData()
    }
  }, [authUser])
  return (
    <div>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  )
}
