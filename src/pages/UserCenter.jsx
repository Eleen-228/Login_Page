import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box, useTheme, Container } from '@mui/material'
import SideBar from '../components/SideBar'
import Profile from './Profile'
import Calendar from './Calendar'
import Settings from './Settings'
import { UserContext } from '../context/AuthContext'
const UserCenter = () => {
	const theme = useTheme()
	const { user, removeAccount, error, setError, changeEmail, changePassword, changeUsername } = useContext(UserContext)
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
							<Route
								path="/profile"
								element={
									<Profile
										user={user}
										changeEmail={changeEmail}
										changePassword={changePassword}
										changeUsername={changeUsername}
										error={error}
										setError={setError}
									/>
								}
							/>
							<Route path="/reminder" element={<Settings removeAccount={removeAccount} error={error} setError={setError} />} />
							<Route path="/calendar" element={<Calendar />} />
						</Routes>
					</Container>
				</>
			)}
		</Box>
	)
}
export default UserCenter
