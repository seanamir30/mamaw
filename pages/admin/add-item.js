import React,{useRef, useEffect} from 'react'
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { getFirestore } from 'firebase/firestore'
import cuid from 'cuid';
import Header from '../../components/Header';
import { useRouter } from 'next/router';

const AddItem = () => {
    const price = useRef(0)
    const name = useRef('Untitled')
    const description = useRef('Description')
    const quantity = useRef(0)
    const db = getFirestore()
    const id = cuid()
    const router = useRouter()
    // useEffect(() => {
    //     console.log(userData)
    //     if(userData.role !== 'admin') router.push('')
    // }, [userData])

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const userToken = localStorage.getItem('token')
            if(userToken){
                getDoc(doc(db, 'users', userToken))
                .then((res)=>{
                    if(res.data().role !== 'admin') router.push('/')
                })
            } else {
                router.push('/')
            }
        }
    }, [])
    

    const handleSubmit = (event) => {
        setDoc(doc(db,'items', id),{
            price: price.current.value,
            name: name.current.value,
            description: description.current.value,
            cuid: id,
            quantity: quantity.current.value
        })

        router.push('/shop')
        event.preventDefault()
    }
    return (
        <>
        <Header/>
        <button className='bg-white rounded-xl h-[51px] w-[227px]' onClick={()=>{router.push('/shop')}}>Back</button>
        <div className="flex justify-center items-center h-[calc(100vh-6rem)] overflow-hidden">
                <div className="bg-opacity-[0.35] py-20 px-16 rounded-md bg-white flex rounded-xl w-[91.5rem]">
                    <div className="h-[40rem] w-[31rem] p-6 rounded-md opacity-50 bg-white">
                        <div className="h-full w-full flex items-center justify-center bg-slate-600">
                            dummy photo
                        </div>
                    </div>
                    <div className="w-full ml-16">
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <input className="text-4xl font-medium" ref={name}/>
                            <div className="text-xs font-extralight mb-6">{cuid}</div>
                            <div className="flex justify-between w-full mb-9 font-light">
                                <div>0 Sold</div>
                                <input placeholder="quantity" ref={quantity}/>
                            </div>
                            <textarea className="h-[29rem] max-h-[29rem] whitespace-pre" ref={description}/>
                            <div className="flex justify-between">
                                <span className="text-4xl font-medium">Php<input ref={price}/></span>
                                <button className='bg-white rounded-xl h-[51px] w-[227px]' type="submit">Add Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddItem