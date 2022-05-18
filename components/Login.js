import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthUserContext';

export default function Login({ setMode, setIsModalOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = event => {
    setError(null)
    signInWithEmailAndPassword(email, password)
    .then(authUser => {
      setIsModalOpen(false);
    })
    .catch(error => {
      setError(error.message)
    });
    event.preventDefault();
  };

  return (
        <>
          <h2>Login</h2>
          <form onSubmit={onSubmit}>
            { error && <alert color="danger">{error}</alert>}
                <label for="loginEmail">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    id="loginEmail"
                    placeholder="Email" />
                <label for="loginPassword">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    id="loginPassword"
                    placeholder="Password" />
                <button>Login</button>
                No account? <button onClick={()=>setMode('Signup')}>Create one</button>
            </form>
    </>
  )
}
