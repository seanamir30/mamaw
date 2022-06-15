import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { getFirestore } from '@firebase/firestore';
import Header from '../../components/Header';

const Item = () => {
    const [userData, setUserData] = useState();
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
            <div>
                <button onClick={deleteItem}>delete</button>
                <form className="w-full pl-16 flex flex-col" onSubmit={handleSubmit}>
                    <input className="text-4xl font-medium" onChange={()=>setName(event.target.value)} value={name}/>
                    <div>item id:{cuid}</div>
                    <div className="flex justify-between w-full mb-9 font-light">
                        <div>0 Sold</div>
                        <div><input onChange={()=>setQuantity(event.target.value)} value={quantity}/> Stock</div>
                    </div>
                    <textarea className="h-[29rem] max-h-[29rem]" onChange={()=>setDescription(event.target.value)} value={description}/>
                    <div className="flex justify-between">
                        <input className="text-4xl font-medium" onChange={()=>setPrice(event.target.value)} value={price}/>
                        <button className="bg-white rounded-xl h-[51px] w-[227px]" type="submit">save changes</button>
                    </div>
                </form>
            </div>
        )
    }

    const isClient = () => {
        return(
            <div className="w-full pl-16 flex flex-col">
                <div className="text-4xl font-medium">{name?name:'Untitled'}</div>
                <div className="text-xs font-extralight mb-6">{cuid}</div>
                <div className="flex justify-between w-full mb-9 font-light">
                    <div>0 Sold</div>
                    <div>{quantity ? quantity : 0} Stock</div>
                </div>
                <div className="h-[29rem] max-h-[29rem]">{description}</div>
                <div className="flex justify-between">
                    <div className="text-4xl font-medium">Php {price ? price : 0}</div>
                    <button className="bg-white rounded-xl h-[51px] w-[227px]">Add to Cart</button>
                </div>
            </div>
        )
    }
    console.log(userData)
    return (
        <>
            <Header/>
            <div className="flex justify-center items-center h-[calc(100vh-6rem)] overflow-hidden">
                <div className="bg-opacity-[0.35] py-20 px-16 rounded-md bg-white flex rounded-xl w-[91.5rem]">
                    <div className="h-[40rem] w-[31rem] p-6 rounded-md opacity-50 bg-white">
                        <div className="h-full w-full flex items-center justify-center bg-slate-600">
                            dummy photo
                        </div>
                    </div>
                    {userData?.role === 'admin' ? isAdmin() : isClient()}
                </div>
            </div>
        </>
    )
}

export default Item