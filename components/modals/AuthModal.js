import { useEffect, useState } from 'react'
import Signup from '../Signup'
import Login from '../Login'
import clsx from 'clsx'
import Logo from '../../assets/logo.png';

const AuthModal = ({ setIsModalOpen }) => {
    const [isSignup, setIsSignup] = useState(true)
  return (
    <div className="absolute h-screen flex bg-black backdrop-blur bg-opacity-30 w-screen justify-center items-center left-0 top-0">
        <div className="bg-white rounded-3xl relative transform h-[37rem] w-[30rem] flex flex-col items-center px-24 pt-20">
            <button onClick={()=>setIsModalOpen(false)} className="absolute top-0 right-0 px-4">x</button>
            <img className="w-32 pb-6" src={Logo.src}/>
            <div className="border w-full border-black flex text-center mb-8">
                <button className={clsx({'bg-black text-white': !isSignup}, 'w-full py-2')} onClick={()=>setIsSignup(false)}>Login</button>
                <button className={clsx({'bg-black text-white': isSignup}, 'w-full py-2')} onClick={()=>setIsSignup(true)}>Signup</button>
            </div>
            {isSignup && <Signup setIsModalOpen={setIsModalOpen} setMode={()=>setIsSignup(!isSignup)}/>}
            {!isSignup && <Login setIsModalOpen={setIsModalOpen} setMode={()=>setIsSignup(!isSignup)}/>}
        </div>
    </div>
  )
}

export default AuthModal