import { useContext, useState } from 'react'
import { Box, IconButton, Tooltip, useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { ColorModeContext } from '../context/ColorModeContext'
import { UserContext } from '../context/AuthContext'
import { ResponsiveContext } from '../context/ResponsiveContext'
import AccountLoginMenu from './AccountLoginMenu'
import AccountLogoutMenu from './AccountLogoutMenu'
const Header = () => {
	const theme = useTheme()
	const colorMode = useContext(ColorModeContext)
	const { user } = useContext(UserContext)
	const { isMobile } = useContext(ResponsiveContext)
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}
	return (
		<Box sx={{ display: 'flex', justifyContent: 'end' }}>
			<Box
				sx={{
					m: '20px 50px 0 0',
					width: isMobile ? '75px' : '150px',
					display: 'flex',
					justifyContent: 'space-evenly',
					bgcolor: theme.palette.background.dark,
					borderRadius: '10px ',
				}}>
				<Tooltip title="Theme Mode">
					<IconButton onClick={colorMode.toggleColorMode}>
						{theme.palette.mode === 'light' ? <DarkModeIcon sx={{ width: '40px' }} /> : <LightModeIcon sx={{ width: '40px' }} />}
					</IconButton>
				</Tooltip>
				{user ? (
					<Tooltip title="Account Setting" sx={{ display: isMobile && 'none' }}>
						<IconButton aria-controls={open && 'account-menu'} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
							<Avatar />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title="Login" sx={{ display: isMobile && 'none' }}>
						<IconButton aria-controls={open && 'account-menu'} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
							<Avatar />
						</IconButton>
					</Tooltip>
				)}
			</Box>
			{/* MENU */}
			{user ? (
				<AccountLoginMenu open={open} setAnchorEl={setAnchorEl} anchorEl={anchorEl} />
			) : (
				<AccountLogoutMenu open={open} setAnchorEl={setAnchorEl} anchorEl={anchorEl} />
			)}
		</Box>
	)
}
export default Header
