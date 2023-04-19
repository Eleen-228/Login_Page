import { createContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'

export const UserContext = createContext({ createUser: () => {} })
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
				console.log(error)
			})
	}
	const logout = () => signOut(auth)
	const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			console.log(currentUser)
			setUser(currentUser)
		})
		return () => unsubscribe()
	}, [])
	return <UserContext.Provider value={{ createUser, user, logout, login, setError, error }}>{children}</UserContext.Provider>
}
