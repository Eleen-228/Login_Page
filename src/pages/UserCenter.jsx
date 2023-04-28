import { useContext, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box, useTheme, Container } from '@mui/material'
import SideBar from '../components/SideBar'
import Profile from './Profile'
import Calendar from './Calendar'
import Settings from './Settings'
import { UserContext } from '../context/AuthContext'
import { ResponsiveContext } from '../context/ResponsiveContext'
const UserCenter = () => {
	const theme = useTheme()
	const { user, removeAccount, errors, setError, changeEmail, changePassword, changeUsername } = useContext(UserContext)
	const { isMobile } = useContext(ResponsiveContext)
	const [collapsed, setCollapsed] = useState(null)
	const sidebarState = isCollapsed => {
		setCollapsed(isCollapsed)
	}

	return (
		<>
			{user ? (
				<Box
					sx={{
						overflowWrap: 'break-word',
						boxShadow: theme.shadows,
						width: '100%',
						height: '80vh',
						borderRadius: '10px',
						textAlign: 'center',
						display: 'flex',
						justifyContent: 'center',
						backgroundColor: theme.palette.background.dark,
						overflow: 'auto',
					}}>
					<SideBar isMobile={isMobile} sidebarState={sidebarState} />
					<Container sx={{ overflow: 'auto', display: isMobile && collapsed === false ? 'none' : 'block' }}>
						<Routes>
							<Route
								path="/profile"
								element={
									<Profile
										user={user}
										changeEmail={changeEmail}
										changePassword={changePassword}
										changeUsername={changeUsername}
										errors={errors}
										setError={setError}
										isMobile={isMobile}
									/>
								}
							/>
							<Route path="/settings" element={<Settings removeAccount={removeAccount} errors={errors} setError={setError} />} />
							<Route path="/calendar" element={<Calendar isMobile={isMobile} />} />
						</Routes>
					</Container>
				</Box>
			) : (
				<Navigate to="/login" />
			)}
		</>
	)
}
export default UserCenter
