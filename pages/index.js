import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Hero';
import Hero from '../components/Hero';
import AuthModal from '../components/modals/AuthModal';
import { useAuth } from '../context/AuthUserContext';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authUser } = useAuth();
  console.log(authUser)

  return (
    <div>
      <Header/>
      {isModalOpen && <AuthModal setIsModalOpen={setIsModalOpen}/>}
      <button onClick={()=>{setIsModalOpen(!isModalOpen)}}>login</button>
      <Hero/>
      <Footer/>
    </div>
  )
}
