import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
const AccountLogoutMenu = ({ open, setAnchorEl, anchorEl }) => {
	const theme = useTheme()
	const handleCLose = () => {
		setAnchorEl(null)
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
					backgroundColor: theme.palette.background.main,
				},
			}}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
			<MenuItem onClick={handleCLose} component={Link} to="/login">
				<ListItemIcon>
					<LoginIcon />
				</ListItemIcon>
				Login
			</MenuItem>
			<MenuItem onClick={handleCLose} component={Link} to="/register">
				<ListItemIcon>
					<PersonAddIcon />
				</ListItemIcon>
				Register
			</MenuItem>
		</Menu>
	)
}
export default AccountLogoutMenu
