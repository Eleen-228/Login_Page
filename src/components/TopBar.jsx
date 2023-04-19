import { Container, Typography, useTheme } from '@mui/material'
const TopBar = ({ children }) => {
	const theme = useTheme()
	return (
		<Container sx={{ p: 3, borderBottom: `2px solid ${theme.palette.secondary.main}`, width: '100%' }}>
			<Typography variant="h3">{children}</Typography>
		</Container>
	)
}
export default TopBar
