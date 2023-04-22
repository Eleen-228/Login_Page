import { useNavigate } from 'react-router-dom'
import { Container, Box, Typography, Button } from '@mui/material'
import TopBar from '../components/TopBar'
const Settings = ({ removeAccount, setError, error }) => {
	const navigate = useNavigate()
	const handleAccountRemoval = async () => {
		try {
			await removeAccount()
			navigate('/register')
			setError('')
			console.log('Successfully deleted user')
		} catch (e) {
			setError(e.message)
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
				{error === 'Firebase: Error (auth/requires-recent-login).' ? (
					<Typography variant="h5" color="error.main">
						Sorry, please Login again to delete the account
					</Typography>
				) : undefined}
			</Box>
		</Container>
	)
}
export default Settings
