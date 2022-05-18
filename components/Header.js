import { useState } from 'react'
import AuthModal from '../components/modals/AuthModal';
import { useAuth } from '../context/AuthUserContext';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { authUser,signOut } = useAuth();

    const loggedInButtons = () => {
        return(
            <>
                <span>{authUser.email}</span>
                <button onClick={signOut}>Signout</button>
            </>
        )
    }
    return (
        <>
        {isModalOpen && <AuthModal setIsModalOpen={setIsModalOpen}/>}
        {authUser ? loggedInButtons() : <button onClick={()=>{setIsModalOpen(!isModalOpen)}}>login</button>}
        </>
    )
}

export default Header