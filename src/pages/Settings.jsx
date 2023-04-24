import { useNavigate } from 'react-router-dom'
import { Container, Box, Typography, Button } from '@mui/material'
import TopBar from '../components/TopBar'
const Settings = ({ removeAccount, setError, errors }) => {
	const { timeoutErr } = errors
	const navigate = useNavigate()
	const handleAccountRemoval = async () => {
		try {
			await removeAccount()
			navigate('/register')
			setError({ ...errors, timeoutErr: '' })
			console.log('Successfully deleted user')
		} catch (e) {
			setError({ ...errors, timeoutErr: e.message })
			console.log('error', e.message)
		}
	}
	return (
		<Container>
			<TopBar children="Settings" />
			<Box>
				<Typography>I would like to delete my account</Typography>
				<Button variant="contained" color="error" onClick={handleAccountRemoval}>
					Delete
				</Button>
				{timeoutErr === 'Firebase: Error (auth/requires-recent-login).' ? (
					<Typography variant="h5" color="error.main">
						Sorry, please Login again to delete the account
					</Typography>
				) : undefined}
			</Box>
		</Container>
	)
}
export default Settings
