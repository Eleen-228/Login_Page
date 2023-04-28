import { useContext } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { Box, Typography, IconButton, Avatar } from '@mui/material'
import { Sidebar, Menu, MenuItem, sidebarClasses, useProSidebar } from 'react-pro-sidebar'
import { useTheme } from '@mui/material'
import { UserContext } from '../context/AuthContext'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import EventIcon from '@mui/icons-material/Event'
import LogoutIcon from '@mui/icons-material/Logout'
const SideBar = ({ isMobile, sidebarState }) => {
	const theme = useTheme()
	const { user, logout } = useContext(UserContext)
	const { collapsed, collapseSidebar } = useProSidebar()
	const handleLogout = async () => {
		try {
			await logout()
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Sidebar
			backgroundColor={theme.palette.background.light}
			rootStyles={{
				[`.${sidebarClasses.container}`]: {
					borderRadius: '7px 0 0 7px',
					color: theme.palette.primary,
				},
			}}
			defaultCollapsed={isMobile ? true : false}
			width={isMobile ? '100%' : undefined}>
			<Menu menuItemStyles={{ button: { '&:hover': { backgroundColor: theme.palette.background.dark }, textAlign: 'left' } }}>
				<MenuItem
					onClick={() => {
						collapseSidebar()
						sidebarState(!collapsed)
					}}
					icon={collapsed ? <ArrowForwardIosIcon /> : undefined}>
					{!collapsed && (
						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<Typography variant="h3">Hi {user && user.displayName}</Typography>
							<IconButton>
								<ArrowBackIosIcon />
							</IconButton>
						</Box>
					)}
				</MenuItem>
				{!collapsed ? (
					<Box sx={{ mt: 1 }}>
						<img src={`./asset/avatar.png`} alt="avatar" width="100px" height="100px" style={{ cursor: 'pointer' }} />
					</Box>
				) : (
					<IconButton>
						<Avatar />
					</IconButton>
				)}
				<MenuItem icon={<PersonIcon />} component={<ReactLink />} to="/user_center/profile">
					Profile
				</MenuItem>
				<MenuItem icon={<EventIcon />} component={<ReactLink />} to="/user_center/calendar">
					Calendar
				</MenuItem>
				<MenuItem icon={<SettingsIcon />} component={<ReactLink />} to="/user_center/settings">
					Account Settings
				</MenuItem>
				{isMobile && (
					<MenuItem icon={<LogoutIcon />} component={<ReactLink />} to="/login" onClick={handleLogout}>
						Logout
					</MenuItem>
				)}
			</Menu>
		</Sidebar>
	)
}
export default SideBar
