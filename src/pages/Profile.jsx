import { useState } from 'react'
import { Container, Typography, Button, Box, TextField, InputAdornment, IconButton } from '@mui/material'
import TopBar from '../components/TopBar'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
const Profile = ({ user, changeEmail, changePassword, changeUsername }) => {
	const [values, setValues] = useState({})
	const [ableUsername, setAbleUsername] = useState(true)
	const [ableEmail, setAbleEmail] = useState(true)
	const [ablePassword, setAblePassword] = useState(true)
	const [visible, setVisible] = useState(false)
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
	}
	const allowPasswordEdit = () => {
		setAblePassword(false)
	}
	const disallowPasswordEdit = () => {
		setAblePassword(true)
	}
	const handleSaveChanges = () => {
		changeEmail(values.email)
		changePassword(values.password)
		changeUsername(values.username)
	}
	const handleVisibility = () => {
		setVisible(!visible)
	}
	const handleChangesSubmit = e => {
		e.preventDefault()
		e.target.reset()
	}
	return (
		<Container>
			<TopBar children="Profile" />
			<Box display="grid" mt={5}>
				<form onSubmit={handleChangesSubmit}>
					<Box display="grid" gridTemplateColumns="2fr 2fr 2fr 1fr" mb={2}>
						<Typography spanColum="span 12">Username:</Typography>
						<Typography>{user.displayName}</Typography>
						<TextField
							disabled={ableUsername}
							value={values.username}
							onBlur={disallowUsernameEdit}
							onChange={e => setValues({ ...values, username: e.target.value })}
						/>
						<EditIcon onClick={allowUsernameEdit} cursor="pointer" />
					</Box>
					<Box display="grid" gridTemplateColumns="2fr 2fr 2fr 1fr" mb={2}>
						<Typography>Email: </Typography>
						<Typography>{user.email}</Typography>
						<TextField disabled={ableEmail} value={values.email} onBlur={disallowEmailEdit} onChange={e => setValues({ ...values, email: e.target.value })} />
						<EditIcon onClick={allowEmailEdit} cursor="pointer" />
					</Box>
					<Box display="grid" gridTemplateColumns="2fr 5fr 0.5fr">
						<Typography>Password:</Typography>
						<TextField
							type={visible ? 'text' : 'password'}
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
					</Box>
					<Box mt={5}>
						<Button variant="contained" onClick={handleSaveChanges}>
							Save Profile Changes
						</Button>
					</Box>
				</form>
			</Box>
		</Container>
	)
}
export default Profile
