import { createContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export const UserContext = createContext({ createUser: () => {} })
export const provider = new GoogleAuthProvider()
export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({})
	const [error, setError] = useState('')
	const createUser = async (email, password, username) => {
		await createUserWithEmailAndPassword(auth, email, password)
		await updateProfile(auth.currentUser, {
			displayName: username,
		})
			.then(() => {
				console.log('Profile updated')
				setUser({ ...user, displayName: username })
			})
			.catch(error => {
				console.log('error found')
			})
	}
	const logout = () => signOut(auth)
	const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
	const googleLogin = () => signInWithPopup(auth, provider)
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			// console.log(currentUser)
			setUser(currentUser)
		})
		return () => unsubscribe()
	}, [])
	return <UserContext.Provider value={{ createUser, user, logout, login, setError, error, googleLogin }}>{children}</UserContext.Provider>
}
