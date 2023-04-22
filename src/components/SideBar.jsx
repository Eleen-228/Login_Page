import { useContext } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { Box, Typography, IconButton, Avatar } from '@mui/material'
import { Sidebar, Menu, MenuItem, sidebarClasses, useProSidebar } from 'react-pro-sidebar'
import { useTheme } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import EventIcon from '@mui/icons-material/Event'
import { UserContext } from '../context/AuthContext'
const SideBar = () => {
	const theme = useTheme()
	const { user } = useContext(UserContext)
	const { collapsed, collapseSidebar } = useProSidebar()
	return (
		<Sidebar
			backgroundColor={theme.palette.background.light}
			rootStyles={{
				[`.${sidebarClasses.container}`]: {
					margin: '10px 5px ',
					borderRadius: '7px',
					color: theme.palette.primary,
					height: '95%',
				},
			}}>
			<Menu menuItemStyles={{ button: { '&:hover': { backgroundColor: theme.palette.background.dark }, textAlign: 'left' } }}>
				<MenuItem onClick={() => collapseSidebar()} icon={collapsed ? <ArrowForwardIosIcon /> : undefined}>
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
				<MenuItem icon={<SettingsIcon />} component={<ReactLink />} to="/user_center/reminder">
					Account Settings
				</MenuItem>
			</Menu>
		</Sidebar>
	)
}
export default SideBar
