import { useState, useContext } from 'react'
import { Box, Typography, TextField, Button, FormControlLabel, Checkbox, Link, InputAdornment, IconButton, FormHelperText, useTheme } from '@mui/material'
import { Link as ReactLink, useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'
import EmailIcon from '@mui/icons-material/Email'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { UserContext } from '../context/AuthContext'

const Register = () => {
	const theme = useTheme()
	const navigate = useNavigate()
	const [visible, setVisible] = useState(false)
	const { createUser, setError, error } = useContext(UserContext)
	const toggleVisibility = () => {
		setVisible(!visible)
	}
	const handleFormSubmit = async (values, { resetForm }) => {
		// console.log(values)
		try {
			await createUser(values.email, values.password, values.username)
			await resetForm()
			await navigate('/user_center')
		} catch (error) {
			setError(error.message)
			// console.log(error.message)
		}
	}
	const initialValues = {
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
		passwordConfirmation: '',
		termsAndConditions: false,
	}
	const registrationSchema = yup.object().shape({
		firstName: yup.string().required('required'),
		lastName: yup.string(),
		username: yup.string().required('required'),
		email: yup.string().email('Invalid email').required('required'),
		password: yup
			.string()
			.matches(/^[a-zA-Z0-9!@#$%^&*]{8,16}$/, 'Password can only be 8 to 16 characters')
			.min(8)
			.required('required'),
		passwordConfirmation: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords must match')
			.required('required'),
		termsAndConditions: yup.boolean().oneOf([true]),
	})
	return (
		<Box
			sx={{
				boxShadow: theme.shadows,
				width: '60%',
				borderRadius: '10px',
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: theme.palette.background.main,
			}}>
			<Formik initialValues={initialValues} validationSchema={registrationSchema} onSubmit={handleFormSubmit}>
				{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
					return (
						<form onSubmit={handleSubmit}>
							<Box sx={{ p: '40px 40px 20px' }}>
								<Typography variant="h2" p={4} fontWeight={600}>
									Register An Account
								</Typography>
								<Box sx={{ mb: 2, height: '400px' }}>
									<TextField
										sx={{ width: '49%', mr: '2%', height: '80px' }}
										type="text"
										label="First Name"
										variant="outlined"
										name="firstName"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.firstName}
										error={!!touched.firstName && !!errors.firstName}
										helperText={touched.firstName && errors.firstName}
										color="secondary"
									/>
									<TextField
										sx={{ width: '49%', height: '80px' }}
										type="text"
										label="Last Name (Optional)"
										variant="outlined"
										name="lastName"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.lastName}
										error={!!touched.lastName && !!errors.lastName}
										helperText={touched.lastName && errors.lastName}
										color="secondary"
									/>
									<TextField
										sx={{ height: '80px' }}
										type="text"
										label="Username"
										variant="outlined"
										fullWidth
										name="username"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.username}
										error={!!touched.username && !!errors.username}
										helperText={touched.username && errors.username}
										color="secondary"
									/>
									<TextField
										sx={{ height: '80px' }}
										type="text"
										label="Email"
										variant="outlined"
										fullWidth
										name="email"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.email}
										error={!!touched.email && !!errors.email}
										helperText={touched.email && errors.email}
										color="secondary"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<EmailIcon />
												</InputAdornment>
											),
										}}
									/>
									<TextField
										sx={{ height: '80px' }}
										type={visible ? 'text' : 'password'}
										label="Password"
										variant="outlined"
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
													<IconButton onClick={toggleVisibility}>{visible ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton>
												</InputAdornment>
											),
										}}
									/>
									<TextField
										sx={{ height: '80px' }}
										type={visible ? 'text' : 'password'}
										label="Confirm Password"
										variant="outlined"
										fullWidth
										name="passwordConfirmation"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.passwordConfirmation}
										error={!!touched.passwordConfirmation && !!errors.passwordConfirmation}
										helperText={touched.passwordConfirmation && errors.passwordConfirmation}
										color="secondary"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton onClick={toggleVisibility}>{visible ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</Box>
								<Box sx={{ mb: 2 }}>
									<FormControlLabel
										control={<Checkbox />}
										label={
											<Typography variant="h6">
												Yes, I've read and agree with the{' '}
												<Link variant="h5" underline="none" sx={{ color: 'info.dark', fontWeight: 600 }}>
													Term and Condition
												</Link>
											</Typography>
										}
										name="termsAndConditions"
										onChange={handleChange}
										value={values.termsAndConditions}
									/>
									<FormHelperText sx={{ textAlign: 'center', fontSize: theme.typography.h6 }} error={!values.termsAndConditions}>
										You must accept the terms and conditions
									</FormHelperText>
								</Box>
								<Box sx={{ mb: 2 }}>
									<Button variant="contained" size="large" sx={{ fontWeight: '600' }} type="submit">
										Submit
									</Button>
								</Box>
								<Typography color="error.dark">
									{error === 'Firebase: Error (auth/email-already-in-use).' ? 'An account already exist with this email' : undefined}
								</Typography>
								<ReactLink style={{ color: '#fffafa', textDecoration: 'none', fontSize: '14px' }} to="/login" className="underline">
									Already have an Account
								</ReactLink>
							</Box>
						</form>
					)
				}}
			</Formik>
		</Box>
	)
}
export default Register
