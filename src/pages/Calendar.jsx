import { useState } from 'react'
import { Grid, Container, Box, useTheme, Typography, TextField, Button } from '@mui/material'
import Modal from '@mui/material/Modal'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import TopBar from '../components/TopBar'
import AddTaskIcon from '@mui/icons-material/AddTask'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove'
const Calendar = () => {
	const theme = useTheme()
	const [openAddModal, setOpenAddModal] = useState(false)
	const [openRemoveModal, setOpenRemoveModal] = useState(false)
	const [title, setTitle] = useState('')
	const [calendarAddApi, setCalendarAddApi] = useState({})
	const [calendarRemoveApi, setCalendarRemoveApi] = useState({})
	//functions to handle add event modal
	const handleAddEvent = selectionInfo => {
		setOpenAddModal(!openAddModal)
		setCalendarAddApi(selectionInfo)
		selectionInfo.view.calendar.unselect()
	}
	const handleSubmitTitle = e => {
		e.preventDefault()
		setOpenAddModal(!openAddModal)
		if (title) {
			calendarAddApi.view.calendar.addEvent({
				id: `${calendarAddApi.view.calendar.dateStr}-${title}`,
				title,
				start: calendarAddApi.startStr,
				end: calendarAddApi.endStr,
				allDay: calendarAddApi.allDay,
			})
		}
	}
	const handleAddClose = () => {
		setOpenAddModal(!openAddModal)
	}
	//functions to handle event removal modal
	const handleEventRemove = eventClickInfo => {
		setOpenRemoveModal(!openRemoveModal)
		setCalendarRemoveApi(eventClickInfo)
	}
	const handleRemoveTitle = () => {
		setOpenRemoveModal(!openRemoveModal)
		calendarRemoveApi.event.remove()
	}
	const handleRemoveClose = () => {
		setOpenRemoveModal(!openRemoveModal)
	}

	return (
		<Grid container>
			<TopBar children="Calendar" />
			<Container sx={{ '& .fc .fc-list-sticky .fc-list-day>*': { background: 'none ' } }}>
				<FullCalendar
					plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
					initialView="dayGridMonth"
					headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,listWeek' }}
					selectable={true}
					editable={true}
					select={handleAddEvent}
					eventClick={handleEventRemove}
				/>
				{/* ADD EVENT MODAL */}
				<Modal open={openAddModal} onClose={handleAddClose}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: 400,
							height: 300,
							bgcolor: theme.palette.mode === 'dark' ? '#404040' : '#888888',
							display: 'flex',
							flexDirection: 'column',
							p: '50px 25px',
							outline: 'none',
							color: theme.palette.success.main,
						}}>
						<Typography variant="h5" textAlign="center" mb={2}>
							Please enter a title for this event
						</Typography>
						<form onSubmit={handleSubmitTitle} style={{ display: 'flex', flexDirection: 'column' }}>
							<TextField variant="outlined" type="text" required color="success" onChange={e => setTitle(e.target.value)} />
							<Button sx={{ color: theme.palette.background.light, mt: 10 }} endIcon={<AddTaskIcon />} variant="outlined" fullWidth={false} type="submit">
								Add Event
							</Button>
						</form>
					</Box>
				</Modal>
				{/* REMOVE EVENT MODAL */}
				<Modal open={openRemoveModal} onClose={handleRemoveClose}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: 400,
							height: 200,
							bgcolor: theme.palette.mode === 'dark' ? '#404040' : '#888888',
							display: 'flex',
							flexDirection: 'column',
							p: '50px 25px',
							outline: 'none',
							color: theme.palette.success.main,
						}}>
						<Typography variant="h5" textAlign="center" mb={2}>
							Are you sure you want to remove this booked event?
						</Typography>
						<Button
							sx={{ color: theme.palette.background.light, mt: 2 }}
							endIcon={<PlaylistRemoveIcon />}
							variant="outlined"
							fullWidth={false}
							onClick={handleRemoveTitle}>
							Remove Event
						</Button>
					</Box>
				</Modal>
			</Container>
		</Grid>
	)
}
export default Calendar
