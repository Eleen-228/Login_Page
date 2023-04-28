import { createContext } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

export const ResponsiveContext = createContext()
export const ResponsiveContextProvider = ({ children }) => {
	const isMobile = useMediaQuery('(max-width: 600px)')
	return <ResponsiveContext.Provider value={{ isMobile }}>{children}</ResponsiveContext.Provider>
}
