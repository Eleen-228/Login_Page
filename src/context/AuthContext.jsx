import { createContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
	GoogleAuthProvider,
	signInWithPopup,
	deleteUser,
	updateEmail,
	updatePassword,
} from 'firebase/auth'

export const UserContext = createContext({ createUser: () => {} })
export const provider = new GoogleAuthProvider()
export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [errors, setError] = useState({
		acctCreateErr: '',
		profileUpdateErr: '',
		chgeUsernameErr: '',
		loginErr: '',
		invalidPassword: '',
		timeoutErr: '',
		emailErr: '',
	})

	const createUser = async (email, password, username) => {
		await createUserWithEmailAndPassword(auth, email, password)
		try {
			await updateProfile(auth.currentUser, { displayName: username })
			setUser({ ...user, displayName: username })
			console.log('Profile updated')
			setError({ ...errors, profileUpdateErr: '' })
		} catch (error) {
			console.log('fail to update profile')
			setError({ ...errors, profileUpdateErr: error.message })
		}
	}
	const changeUsername = async username => {
		try {
			await updateProfile(auth.currentUser, { displayName: username })
			setUser({ ...user, displayName: username })
			console.log('Username Updated')
		} catch (error) {
			console.log('Fail to update username')
			setError({ ...errors, chgeUsernameErr: error.message })
		}
	}
	const changeEmail = async email => {
		try {
			await updateEmail(auth.currentUser, email)
			setUser({ ...user, email })
			console.log('Email Changed')
		} catch (error) {
			console.log('Fail to update email', error.message)
			setError({ ...errors, emailErr: error.message })
			console.log(errors)
		}
	}
	const changePassword = async newPassword => {
		try {
			await updatePassword(auth.currentUser, newPassword)
			setUser({ ...user, password: newPassword })
			console.log('Password Changed')
		} catch (error) {
			console.log('Fail to update password', error.message)
			setError({ ...errors, invalidPassword: error.message })
			console.log(errors)
		}
	}

	const logout = () => signOut(auth)
	const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
	const googleLogin = () => signInWithPopup(auth, provider)
	const removeAccount = () => deleteUser(user)
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			console.log(currentUser)
			setUser(currentUser)
		})
		return () => unsubscribe()
	}, [])
	return (
		<UserContext.Provider value={{ createUser, user, logout, login, setError, errors, googleLogin, removeAccount, changeEmail, changePassword, changeUsername }}>
			{children}
		</UserContext.Provider>
	)
}
