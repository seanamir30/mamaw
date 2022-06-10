import { useState } from 'react';
import { useRouter } from 'next/router';
import { getFirestore } from 'firebase/firestore'
import { useAuth } from '../context/AuthUserContext';
import { useUserData } from '../context/userData';

export default function Login({ setMode, setIsModalOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();
  const [userData, setUserData] = useUserData();
  const db = getFirestore();

  const onSubmit = (event) => {
    setError(null)
    signInWithEmailAndPassword(email, password)
    .then(() => {
      if(userData.client == 'admin') 
      setIsModalOpen(false);
    })
    .catch(error => {
      setError(error.message)
    });
    event.preventDefault();
  };

  return (
          <form onSubmit={onSubmit}>
            { error && <alert color="danger">{error}</alert>}
                <input
                    className="w-full border-b-1 h-10 mb-4 border-b-2"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    id="loginEmail"
                    placeholder="Email" />
                <input
                    className="w-full border-b-1 h-10 mb-4 border-b-2"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    id="loginPassword"
                    placeholder="Password" />
                <button className="w-full text-white bg-black rounded-md py-2 mt-4">Login</button>
            </form>
  )
}
