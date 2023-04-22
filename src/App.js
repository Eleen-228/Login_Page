import { Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline, Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useState, useMemo } from 'react'
import { createTheme } from '@mui/material/styles'
import { ProSidebarProvider } from 'react-pro-sidebar'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import UserCenter from './pages/UserCenter'
import Profile from './pages/Profile'
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import { ColorModeContext, getDesignTokens } from './context/ColorModeContext'
import { AuthContextProvider } from './context/AuthContext'

function App() {
	const [mode, setMode] = useState('light')
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light')),
		}),
		[]
	)
	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<AuthContextProvider>
					<ProSidebarProvider>
						<CssBaseline />
						<div className="app">
							{/* HEADER */}
							<Header />
							{/* MAIN SECTION */}
							<Container sx={{ display: 'flex', justifyContent: 'center', mt: '80px' }}>
								{/* ROUTES */}
								<Routes>
									<Route path="/login/*" element={<Login />} />
									<Route path="user_center/*" element={<UserCenter />}>
										<Route path="profile" element={<Profile />} />
										<Route path="reminder" element={<Settings />} />
										<Route path="calendar" element={<Calendar />} />
									</Route>
									<Route path="/register" element={<Register />} />
									<Route path="/" element={<Navigate to="/login" />} />
								</Routes>
							</Container>
						</div>
					</ProSidebarProvider>
				</AuthContextProvider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}

export default App
