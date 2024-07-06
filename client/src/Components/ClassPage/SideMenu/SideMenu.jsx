// import { Drawer } from '@mui/material'
import { Menu, ChevronLeft } from '@mui/icons-material'
import HomeIcon from '@mui/icons-material/Home'
import LessonsIcon from '@mui/icons-material/MenuBook'
import KnowledgeGraphIcon from '@mui/icons-material/Workspaces'
import RosterIcon from '@mui/icons-material/Groups'
import ClassPerformanceIcon from '@mui/icons-material/Insights'
import SettingsIcon from '@mui/icons-material/Settings'
import AddIcon from '@mui/icons-material/Add'
import { styled, useTheme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { IconButton, Box, Fab, Tooltip } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 240

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div', { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  })
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
)

const SideMenu = ({ page }) => {
  const theme = useTheme()
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  const handleMenuOpen = () => setIsSideMenuOpen(true)
  const handleMenuClose = () => setIsSideMenuOpen(false)

  const sideMenuItems = [
    { text: 'Home', icon: <HomeIcon />, slug: '/home' },
    { text: 'Lessons', icon: <LessonsIcon />, slug: '/lessons' },
    { text: 'Knowledge Graph', icon: <KnowledgeGraphIcon />, slug: '/knowledge-graph' },
    { text: 'Roster', icon: <RosterIcon />, slug: '/roster' },
    { text: 'Class Performance', icon: <ClassPerformanceIcon />, slug: '/class-performance' },
    { text: 'Class Settings', icon: <SettingsIcon />, slug: '/class-settings' },
  ]
  const navigate = useNavigate()

  return (
    <div className="side-menu">
      <AppBar position="fixed" open={isSideMenuOpen}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <IconButton onClick={handleMenuOpen} sx={{ color: 'white' }}>
              <Menu />
            </IconButton>
          </Box>
          <h2>{page}</h2>

          {page === 'Lessons' ? (
            <>
              <Tooltip title="Add Lesson">
                <Fab variant="extended" color="white" onClick={() => navigate('/add-lessons')}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </>
          ) : (
            <div></div> // empty div to maintain the same number of children in the toolbar ( sorry for the hacky solution :/ )
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={isSideMenuOpen}>
        <DrawerHeader>
          <IconButton onClick={handleMenuClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : ''}
          </IconButton>
        </DrawerHeader>
        <List>
          {sideMenuItems.map(({ text, icon, slug }, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isSideMenuOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate(slug)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isSideMenuOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: isSideMenuOpen ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* <DrawerHeader /> */}
    </div>
  )
}

export default SideMenu
