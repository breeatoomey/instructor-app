import { SidebarData } from './SidebarData'
// import { Drawer } from '@mui/material'
import { Menu, ChevronLeft } from '@mui/icons-material'
import { FaBookReader as LessonsIcon } from 'react-icons/fa'
import { TbBrandGraphql as KnowledgeGraphIcon } from 'react-icons/tb'
import RosterIcon from '@mui/icons-material/Groups'
import ClassPerformaceIcon from '@mui/icons-material/Insights'
import SettingsIcon from '@mui/icons-material/Settings'
import { styled, useTheme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { IconButton, Stack } from '@mui/material'
import { useState } from 'react'

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

const SideMenu = () => {
  const theme = useTheme()
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  const handleMenuOpen = () => setIsSideMenuOpen(true)
  const handleMenuClose = () => setIsSideMenuOpen(false)
  const sideMenuItems = [
    'Lessons',
    'Knowledge Graph',
    'Roster',
    'Class Performance',
    'Class Settings',
  ]

  return (
    <div className="side-menu">
      CLASS SIDE BAR HERE :)
      <AppBar position="fixed" open={isSideMenuOpen}>
        <Toolbar>
          <IconButton>
            <Menu onClick={handleMenuOpen} />
          </IconButton>
          <Stack direction="row" spacing={10} justifyContent="space-around">
            {/* TODO: fix this later to have proper spacing */}
            <h2>Class Name</h2>
            <h2>Lessons</h2>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={isSideMenuOpen}>
        <DrawerHeader>
          <IconButton onClick={handleMenuClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : ''}
          </IconButton>
        </DrawerHeader>
        <div></div>
        <List>
          {sideMenuItems.map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isSideMenuOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isSideMenuOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <RosterIcon />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: isSideMenuOpen ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div>page content goes here</div>
    </div>
  )
}

export default SideMenu
