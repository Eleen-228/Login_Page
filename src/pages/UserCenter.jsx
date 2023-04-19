import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box, useTheme, Container } from '@mui/material'
import SideBar from '../components/SideBar'
import Profile from './Profile'
import Calendar from './Calendar'
import Reminder from './Reminder'
import { UserContext } from '../context/AuthContext'
const UserCenter = () => {
	const theme = useTheme()
	const { user } = useContext(UserContext)
	return (
		<Box
			sx={{
				overflowWrap: 'break-word',
				boxShadow: theme.shadows,
				width: '100%',
				height: '80vh',
				borderRadius: '10px',
				textAlign: 'center',
				display: 'flex',
				backgroundColor: theme.palette.background.dark,
			}}>
			{user && (
				<>
					<SideBar />
					<Container sx={{ overflow: 'auto' }}>
						<Routes>
							<Route path="/profile" element={<Profile />} />
							<Route path="/reminder" element={<Reminder />} />
							<Route path="/calendar" element={<Calendar />} />
						</Routes>
					</Container>
				</>
			)}
		</Box>
	)
}
export default UserCenter
