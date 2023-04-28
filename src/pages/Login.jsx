import { useState, useContext } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { TextField, Button, InputAdornment, Typography, Box, IconButton, useTheme } from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import GoogleIcon from '@mui/icons-material/Google'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Formik } from 'formik'
import * as yup from 'yup'
import { UserContext } from '../context/AuthContext'
import { ResponsiveContext } from '../context/ResponsiveContext'

const Login = () => {
	const theme = useTheme()
	const [visible, setVisible] = useState(false)
	const navigate = useNavigate()
	const { login, errors, setError, googleLogin, user } = useContext(UserContext)
	const { isMobile } = useContext(ResponsiveContext)
	const { loginErr } = errors
	const initialValues = {
		email: '',
		password: '',
	}
	const signInSchema = yup.object().shape({
		email: yup.string().required('required'),
		password: yup.string().required('required'),
	})
	const handleFormSubmit = async (values, { resetForm }) => {
		try {
			await login(values.email, values.password)
			resetForm()
			navigate('/user_center')
			setError({ ...errors, loginErr: '' })
			// console.log('Form submitted', values)
		} catch (e) {
			console.log(e.message)
			setError({ ...errors, loginErr: e.message })
		}
	}
	const toggleVisibility = e => {
		setVisible(!visible)
	}
	//mousedown on an input field leads to focusing in it, and the focus event. If we prevent the mousedown event, there's no focus.
	const handleMouseDownPassword = e => {
		e.preventDefault()
	}
	const handleGoogleLogin = async () => {
		try {
			await googleLogin()
		} catch (e) {
			console.log('error', e.message)
		}
	}

	return (
		<>
			{user ? (
				<Navigate to="/user_center" />
			) : (
				<Box
					boxShadow={theme.shadows}
					width={isMobile ? '100%' : '45%'}
					height="500px"
					borderRadius="10px"
					textAlign="center"
					display="flex"
					flexDirection="column"
					backgroundColor={theme.palette.background.main}>
					<Formik onSubmit={handleFormSubmit} validationSchema={signInSchema} initialValues={initialValues}>
						{({ values, errors, touched, handleBlur, handleSubmit, handleChange }) => (
							<form onSubmit={handleSubmit}>
								<Box p="40px 40px 20px">
									<Typography variant="h2" p={4} fontWeight={600}>
										Login
									</Typography>
									<Box mb={2} height="60px">
										<TextField
											type="text"
											label="Email"
											variant="filled"
											fullWidth
											name="email"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.email}
											error={!!touched.email && !!errors.email}
											helperText={touched.email && errors.email}
											color="secondary"
										/>
									</Box>
									<Box mb={2} height="60px">
										<TextField
											type={visible ? 'text' : 'password'}
											label="Password"
											variant="filled"
											fullWidth
											name="password"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.password}
											error={!!touched.password && !!errors.password}
											helperText={touched.password && errors.password}
											color="secondary"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton onClick={toggleVisibility} onMouseDown={handleMouseDownPassword}>
															{visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
									</Box>
									<Box p={3}>
										<Button variant="contained" size="large" color="success" type="submit" sx={{ fontWeight: '600' }}>
											LOGIN
											<LockOpenIcon />
										</Button>
									</Box>
									{loginErr === 'Firebase: Error (auth/wrong-password).' && <Typography color="error.main">Wrong email or password</Typography>}
									{loginErr === 'Firebase: Error (auth/user-not-found).' && <Typography color="error.main">User Not Found</Typography>}
									{loginErr ===
										'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).' && (
										<Typography color="error.main">Too many failed attempts, please sign in later</Typography>
									)}
									<Box>
										<Link to="/register" style={{ color: '#fffafa', textDecoration: 'none', fontSize: '14px' }} className="underline">
											Register an Account
										</Link>
									</Box>
								</Box>
							</form>
						)}
					</Formik>
					<Typography>Or Sign Up Using</Typography>
					<Box>
						<IconButton>
							<FacebookIcon />
						</IconButton>
						<IconButton>
							<TwitterIcon />
						</IconButton>
						<IconButton onClick={handleGoogleLogin}>
							<GoogleIcon />
						</IconButton>
					</Box>
				</Box>
			)}
		</>
	)
}
export default Login
