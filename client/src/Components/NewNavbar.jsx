import { AppBar, Button, Tooltip, IconButton, Stack } from '@mui/material'
import { Info, Menu, BugReport, AccountCircle } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const NavbarWithMenu = () => {
  const navigate = useNavigate()
  //   const showSidebar = () => {
  //     setIsVisible(!isVisible)
  //   }

  // TODO: add a box to make the app bar bigger and fix the alignment of the icons
  return (
    <>
      <AppBar position="static">
        <Stack direction="row" justifyContent="space-between">
          <Stack spacing={1} alignItems="flex-start">
            <div onClick={() => navigate('/home')}>Site Name</div>
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <div>
              <Tooltip title="About">
                <IconButton>
                  <Info />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Report a Problem">
                <IconButton>
                  <BugReport />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Profile">
                <IconButton>
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            </div>
          </Stack>
        </Stack>
      </AppBar>
    </>
  )
}

export default NavbarWithMenu
