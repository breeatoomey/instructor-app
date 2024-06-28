import { useState } from 'react'
import { AppBar, Button, Tooltip, IconButton, Stack, Drawer } from '@mui/material'
import { Info, Menu, BugReport, AccountCircle } from '@mui/icons-material'
import Sidebar from '../ClassPage/Sidebar'
import { SidebarData } from '../ClassPage/SidebarData'
import { Link } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'

const NavbarWithMenu = () => {
  //   const [inClassPage, setInClassPage] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const showSidebar = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <AppBar position="static">
        {/* <div>
          <Tooltip title="Menu">
            <IconButton onClick={showSidebar}>
              <Menu />
            </IconButton>
          </Tooltip>
        </div>
        <nav className={isVisible ? 'side-menu active' : 'side-menu'}>
          <ul className="side-menu-items" onClick={showSidebar}>
            <li className="sidebar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav> */}
        <Stack direction="row" justifyContent="space-between">
          <Stack spacing={1} alignItems="flex-start">
            <div>Site Name</div>
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
