import React, { useEffect, useState } from 'react'
import { collection ,getDocs, getDoc, doc, getFirestore } from "firebase/firestore"; 
import { useRouter } from 'next/router';
import Header from '../components/Header';

const Shop = () => {
    const [items,setItems] = useState([])
    const db = getFirestore()
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        getDocs(collection(db, 'items'))
        .then((res)=>{
          const arr = []
          res.forEach((doc) => {
            arr.push(doc.data())
          });
          setItems(arr)
        })

        if(typeof window !== 'undefined') {
            const userToken = localStorage.getItem('token')
            if(userToken){
                getDoc(doc(db, 'users', userToken))
                .then((res)=>{
                    res.data().role === 'admin' ? setIsAdmin(true) : setIsAdmin(false)
                })
            }
        }
    }, [])
    console.log(items)
    
    return (
        <div>
            <Header/>
            {isAdmin &&
                <button className="bg-white rounded-xl h-[51px] w-[227px]" onClick={()=>{router.push('/admin/add-item')}}>Add item</button>
            }
            <div className="grid grid-cols-3 gap-y-11 justify-items-center bg-white bg-opacity-[0.35]">
                {items.map((item)=>(
                    <div 
                    className="h-80 p-[13px] cursor-pointer hover:bg-opacity-60 bg-white bg-opacity-50 drop-shadow-2xl rounded-lg flex flex-col" 
                    onClick={()=>{router.push({pathname:`item/${item.cuid}`,state: { detail: item }},`item/${item.cuid}`)}} 
                    key={item.cuid}>
                        <div className="h-48 w-60 mb-4 bg-slate-500 flex justify-center items-center">dummy photo</div>
                        <p className="font-medium mb-11">{item.name} </p>
                        <p className="font-medium text-xs mb-2">Php {item.price}</p>
                        {
                            isAdmin ? (
                                <div className="flex justify-between">
                                    <p className="font-light text-xs">0 Sold</p>
                                    <p className="font-light text-xs">{item.quantity} Remaining</p>
                                </div>
                            )
                            :<p className="font-light text-xs">0 Sold</p>
                        }
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Shop