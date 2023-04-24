import { useState } from 'react'
import { Container, Typography, Button, Box, TextField, InputAdornment, IconButton } from '@mui/material'
import TopBar from '../components/TopBar'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
const Profile = ({ user, changeEmail, changePassword, changeUsername, errors, setError }) => {
	const [values, setValues] = useState({ username: '', email: '', password: '' })
	const [ableUsername, setAbleUsername] = useState(true)
	const [ableEmail, setAbleEmail] = useState(true)
	const [ablePassword, setAblePassword] = useState(true)
	const [visible, setVisible] = useState(false)
	const { emailErr, invalidPassword } = errors

	const allowUsernameEdit = () => {
		setAbleUsername(false)
	}
	const disallowUsernameEdit = () => {
		setAbleUsername(true)
	}
	const allowEmailEdit = () => {
		setAbleEmail(false)
	}
	const disallowEmailEdit = () => {
		setAbleEmail(true)
		if (/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(values.email)) {
			setError({ ...errors, emailErr: '' })
		}
	}
	const allowPasswordEdit = () => {
		setAblePassword(false)
	}
	const disallowPasswordEdit = () => {
		setAblePassword(true)
		if (values.password.length >= 6) {
			setError({ ...errors, invalidPassword: '' })
		}
	}

	const handleVisibility = () => {
		setVisible(!visible)
	}
	const handleUsernameChange = e => {
		e.preventDefault()
		values.username && changeUsername(values.username)
	}
	const handleEmailChange = e => {
		e.preventDefault()
		values.email && changeEmail(values.email)
	}
	const handlePasswordChange = e => {
		e.preventDefault()
		values.password && changePassword(values.password)
	}

	return (
		<Container>
			<TopBar children="Profile" />
			<Box display="grid" mt={5}>
				<form>
					<Box display="grid" gridTemplateColumns="2fr 2fr 0.5fr 0.5fr 2fr" mb={2} alignItems="center" textAlign="left">
						<Typography>Username:</Typography>
						<TextField
							label={user.displayName}
							disabled={ableUsername}
							value={values.username}
							onBlur={disallowUsernameEdit}
							onChange={e => setValues({ ...values, username: e.target.value })}
						/>
						<EditIcon onClick={allowUsernameEdit} cursor="pointer" />
						<Button variant="contained" onClick={handleUsernameChange}>
							Save
						</Button>
					</Box>
					<Box display="grid" gridTemplateColumns="2fr 2fr 0.5fr 0.5fr 2fr" mb={2} alignItems="center" textAlign="left">
						<Typography>Email: </Typography>
						<TextField
							type="email"
							label={user.email}
							disabled={ableEmail}
							value={values.email}
							onBlur={disallowEmailEdit}
							onChange={e => setValues({ ...values, email: e.target.value })}
						/>
						<EditIcon onClick={allowEmailEdit} cursor="pointer" />
						<Button variant="contained" onClick={handleEmailChange}>
							Save
						</Button>
						{emailErr === 'Firebase: Error (auth/requires-recent-login).' && <Typography color="error">Please login in again for email update</Typography>}
						{emailErr === 'Firebase: Error (auth/invalid-email).' && <Typography color="error">Invalid email</Typography>}
					</Box>
					<Box display="grid" gridTemplateColumns="2fr 2fr 0.5fr 0.5fr 2fr" alignItems="center" textAlign="left">
						<Typography>Password (6 to 16 characters):</Typography>
						<TextField
							type={visible ? 'text' : 'password'}
							label="New Password"
							disabled={ablePassword}
							value={values.password}
							onBlur={disallowPasswordEdit}
							onChange={e => setValues({ ...values, password: e.target.value })}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={handleVisibility}>{visible ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<EditIcon onClick={allowPasswordEdit} cursor="pointer" />
						<Button variant="contained" onClick={handlePasswordChange}>
							Save
						</Button>
						{invalidPassword === 'Firebase: Password should be at least 6 characters (auth/weak-password).' ? (
							<Typography color="error">Password should be at least 6 characters</Typography>
						) : undefined}
					</Box>
				</form>
			</Box>
		</Container>
	)
}
export default Profile
