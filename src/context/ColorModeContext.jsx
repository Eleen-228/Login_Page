import { createContext } from 'react'
export const getDesignTokens = mode => ({
	palette: {
		mode,
		...(mode === 'dark'
			? {
					//palette values for dark mode
					primary: { main: '#3c3c3c' },
					background: { main: 'rgba(60,60,60, 0.7)', light: 'rgba(168,168,168, .8)', dark: 'rgba(72,72,72, .8)' },
					success: { main: '#ece9df' },
					secondary: { main: '#ece9df' },
			  }
			: {
					//palette values for light mode
					primary: { main: '#dedede' },
					background: { main: 'rgba(222,222,222, 0.4)', light: 'rgba(248,248,248, .8)', dark: 'rgba(192,192,192, .8)' },
					success: { main: '#f5f5f5' },
					secondary: { main: '#818181' },
			  }),
	},
	typography: {
		//the default data type of fontFamily is string
		fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
		fontSize: 12,
		h1: {
			fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
			fontSize: 40,
		},
		h2: {
			fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
			fontSize: 32,
		},
		h3: {
			fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
			fontSize: 24,
		},
		h4: {
			fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
			fontSize: 20,
		},
		h5: {
			fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
			fontSize: 16,
		},
		h6: {
			fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
			fontSize: 14,
		},
	},
	shadows: ['.5rem .7rem .9rem rgba(0,0,0,.5)'],
})
export const ColorModeContext = createContext({ toggleColorMode: () => {} })
