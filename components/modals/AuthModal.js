import { useEffect, useState } from 'react'
import Signup from '../Signup'
import Login from '../Login'

const AuthModal = ({ setIsModalOpen }) => {
    const [mode, setMode] = useState('Signup')
  return (
    <div>
        <button onClick={() => mode == 'Signup' ? setMode('Login') : setMode('Signup')}>{mode}</button>
        {mode == 'Signup' && <Signup setIsModalOpen={setIsModalOpen} setMode={setMode}/>}
        {mode == 'Login' && <Login setIsModalOpen={setIsModalOpen} setMode={setMode}/>}
    </div>
  )
}

export default AuthModal