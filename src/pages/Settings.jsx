import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Typography, Button } from '@mui/material'
import Modal from '@mui/material/Modal'
import TopBar from '../components/TopBar'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
const Settings = ({ removeAccount, setError, errors }) => {
	const [open, setOpen] = useState(false)
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
	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	return (
		<Container>
			<TopBar children="Settings" />
			<Box>
				<Typography>I would like to delete my account</Typography>
				<Button variant="contained" color="error" onClick={handleOpen}>
					Delete
				</Button>
			</Box>
			{/* DELETE MODAL */}
			<Modal open={open} onClose={handleClose}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						border: '2px solid #ccc',
						boxShadow: 24,
						p: 4,
						textAlign: 'center',
						bgcolor: '#ccc',
					}}>
					<Typography variant="h5" pb={2}>
						Are you sure you want to delete your account?
					</Typography>
					<Button
						type="button"
						onClick={handleAccountRemoval}
						variant="contained"
						color="success"
						size="large"
						endIcon={<DeleteForeverIcon />}
						sx={{ fontWeight: 600, mb: 2 }}>
						Yes, Delete!
					</Button>
					{timeoutErr === 'Firebase: Error (auth/requires-recent-login).' ? (
						<Typography variant="h5" color="error.main">
							Sorry, please Login again to delete the account
						</Typography>
					) : undefined}
				</Box>
			</Modal>
		</Container>
	)
}
export default Settings
