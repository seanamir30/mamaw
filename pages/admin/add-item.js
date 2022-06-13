import React,{useRef, useEffect} from 'react'
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from 'firebase/firestore'
import cuid from 'cuid';

const AddItem = () => {
    const price = useRef()
    const name = useRef()
    const description = useRef()
    const db = getFirestore()

    // useEffect(() => {
    //     console.log(userData)
    //     if(userData.role !== 'admin') router.push('')
    // }, [userData])

    const handleSubmit = (event) => {
        const id = cuid()
        setDoc(doc(db,'items', id),{
            price: price.current.value,
            name: name.current.value,
            description: description.current.value,
            cuid: id

        })
        event.preventDefault()
    }
    return (
        <form onSubmit={handleSubmit}>
            <input ref={price}/>
            <input ref={name}/>
            <input ref={description}/>
            <button className='bg-white text-slate-800 hover:opacity-70 rounded-full p-2 px-4 h-10 m-2 cursor-pointer' type="submit">Post</button>
        </form>
    )
}

export default AddItem