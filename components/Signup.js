import { useState } from 'react';
import { useRouter } from 'next/router';
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from 'firebase/firestore'
import { useAuth } from '../context/AuthUserContext';

const Signup = ({ setMode }) => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  //Optional error handling
  const [error, setError] = useState(null);

  const { createUserWithEmailAndPassword } = useAuth();

  const db = getFirestore()

  const onSubmit = event => {
    setError(null)
    if(passwordOne === passwordTwo)
      createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        setDoc(doc(db,'users',authUser.user.multiFactor.user.uid),{
          role: 'client',
        })
        setMode('Login')
      })
      .catch(error => {
        setError(error.message)
      });
    else
      setError("Password do not match")
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
                  id="signUpEmail"
                  placeholder="Email" />
                <input
                  className="w-full border-b-1 h-10 mb-4 border-b-2"
                  type="password"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                  id="signUpPassword"
                  placeholder="Password" />
                <input
                  className="w-full border-b-1 h-10 mb-4 border-b-2"
                  type="password"
                  name="password"
                  value={passwordTwo}
                  onChange={(event) => setPasswordTwo(event.target.value)}
                  id="signUpPassword2"
                  placeholder="Confirm Password" />
               <button className="w-full text-white bg-black rounded-md py-2 mt-4">Sign Up</button>
          </form>
  )
}

export default Signup;