import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { UserContext } from '../context/AuthContext'
const AccountLoginMenu = ({ open, setAnchorEl, anchorEl }) => {
	const theme = useTheme()
	const { logout } = useContext(UserContext)
	const navigate = useNavigate()
	const handleCLose = () => {
		setAnchorEl(null)
	}
	const handleLogout = async () => {
		try {
			await logout()
			navigate('/login')
			console.log("You're logged out")
		} catch (e) {
			console.log(e.message)
		}
	}
	const handleProfile = () => {
		navigate('/user_center/profile')
	}
	const handleSettings = () => {
		navigate('/user_center/settings')
	}
	return (
		<Menu
			anchorEl={anchorEl}
			open={open}
			onClose={handleCLose}
			onClick={handleCLose}
			id="account-menu"
			PaperProps={{
				elevation: 0,
				sx: {
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: 1.5,
					'& .MuiAvatar-root': {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1,
					},
					'&:before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						top: 0,
						right: 14,
						borderLeft: `6px solid ${theme.palette.background.main}`,
						borderRight: '6px solid transparent',
						borderBottom: '6px solid transparent',
						borderTop: `6px solid ${theme.palette.background.main}`,
						transform: 'translateY(-50%) rotate(45deg)',
						zIndex: 0,
					},
					backgroundColor: theme.palette.background.dark,
				},
			}}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
			<MenuItem onClick={handleCLose}>
				<Avatar />
				My account
			</MenuItem>
			<MenuItem
				onClick={() => {
					handleCLose()
					handleProfile()
				}}>
				<ListItemIcon>
					<FolderOpenIcon />
				</ListItemIcon>
				Profile
			</MenuItem>
			<MenuItem
				onClick={() => {
					handleCLose()
					handleSettings()
				}}>
				<ListItemIcon>
					<Settings />
				</ListItemIcon>
				Settings
			</MenuItem>
			<MenuItem
				onClick={() => {
					handleCLose()
					handleLogout()
				}}>
				<ListItemIcon>
					<Logout />
				</ListItemIcon>
				Logout
			</MenuItem>
		</Menu>
	)
}
export default AccountLoginMenu
