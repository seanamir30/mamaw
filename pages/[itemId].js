import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { getFirestore } from '@firebase/firestore';
import Header from '../components/Header';

const Item = () => {
    const [userData, setUserData] = useState();
    const [token,setToken] = useState();
    const db = getFirestore();
    const [cuid, setCuid] = useState()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const router = useRouter();
    const {itemId} = router.query;
    useEffect(() => {
        if(typeof window !== 'undefined') {
            const userToken = localStorage.getItem('token')
            setToken(userToken)
            if(userToken){
                getDoc(doc(db, 'users', userToken))
                .then((res)=>{
                    setUserData(res.data())
                })
            }
            if(!!itemId){
                getDoc(doc(db, 'items', itemId))
                .then((res)=>{
                    setCuid(res.data().cuid)
                    setName(res.data().name)
                    setDescription(res.data().description)
                    setPrice(res.data().price)
                    setQuantity(res.data().quantity)
                })
            }
        }
    }, [itemId])
    const deleteItem = (event) => {
        deleteDoc(doc(db,"items",itemId))
        .then(()=>{
            router.push({pathname:'/admin', query: {itemDeleted: item?.cuid}})
        })
        event.preventDefault()
    }

    const handleSubmit = (event) => {
        const docData = {
            cuid: cuid ?? '',
            name: name ?? '',
            description: description ?? '',
            price: price ?? '',
            quantity: quantity ?? '',
        }
        console.log(docData)
        setDoc(doc(db, 'items', itemId),docData)
        event.preventDefault()
    }

    const isAdmin = () => {
        return(
            <form onSubmit={handleSubmit}>
                <button onClick={()=>{router.push({pathname: '/admin'})}} type="button">back</button>
                <button onClick={deleteItem} type="button">delete</button>
                <div>item id:{cuid}</div>
                <input onChange={()=>setName(event.target.value)} value={name}/>
                <input onChange={()=>setDescription(event.target.value)} value={description}/>
                <input onChange={()=>setPrice(event.target.value)} value={price}/>
                <input onChange={()=>setQuantity(event.target.value)} value={quantity}/>
                <button type="submit">save changes</button>
            </form>
        )
    }

    const isClient = () => {
        return(
            <div>
                <button onClick={()=>{router.push({pathname: '/admin'})}}>back</button>
                <button onClick={deleteItem}>delete</button>
                <div>item id:{cuid}</div>
                <div>item name:{name}</div>
                <div>item description:{description}</div>
                <div>item price:{price}</div>
                <div>item quantity:{quantity}</div>
            </div>
        )
    }
    console.log(userData)
    return (
        <>
            <Header/>
            {userData?.role === 'admin' ? isAdmin() : isClient()}
        </>
    )
}

export default Item