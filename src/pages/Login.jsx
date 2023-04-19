import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
const Login = () => {
	const theme = useTheme()
	const [visible, setVisible] = useState(false)
	const navigate = useNavigate()
	const { login, error, setError } = useContext(UserContext)
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
			console.log('Form submitted', values)
		} catch (e) {
			console.log(e.message)
			setError(e.message)
		}
	}
	const toggleVisibility = e => {
		setVisible(!visible)
	}
	//mousedown on an input field leads to focusing in it, and the focus event. If we prevent the mousedown event, there's no focus.
	const handleMouseDownPassword = e => {
		e.preventDefault()
	}
	return (
		<Box
			boxShadow={theme.shadows}
			width="45%"
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
							{error === 'Firebase: Error (auth/wrong-password).' && <Typography color="error.main">Wrong email or password</Typography>}
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
				<IconButton>
					<GoogleIcon />
				</IconButton>
			</Box>
		</Box>
	)
}
export default Login
