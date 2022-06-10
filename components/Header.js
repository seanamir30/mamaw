import { useState } from 'react'
import AuthModal from '../components/modals/AuthModal';
import { useAuth } from '../context/AuthUserContext';
import Logo from '../assets/logo.png';
import UserIcon from '../assets/user-icon.svg';
import { useUserData } from '../context/userData';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { authUser,signOut } = useAuth();
    const [userData, setUserData] = useUserData();

    const loggedInButtons = () => {
        return(
            <div>
                <span onClick={()=>signOut()}>{authUser.email}</span>
                <button onClick={()=>{setIsModalOpen(true)}}><img src={UserIcon.src} className="h-5 w-5"/></button>
            </div>
        )
    }

    const defaultButtons = () => {
        return(
            <div>
                <button>Shop</button>
                <button onClick={()=>{setIsModalOpen(!isModalOpen)}}>Signup</button>
            </div>
        )
    }
    console.log(userData)
    return (
        <div className="border-b-2 flex border-black px-96 justify-between items-center w-screen">
            <img src={Logo.src} className="h-16 my-2"/>
            {isModalOpen && <AuthModal setIsModalOpen={setIsModalOpen}/>}
            {authUser ? loggedInButtons() : defaultButtons()}
        </div>
    )
}

export default Header