import React from 'react'
import SideMenu from '../SideMenu/SideMenu'
import { Box, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
// using mock data for now
// TODO: fetch lessons from the server
const mockLessons = [
  {
    title: 'Lesson 1',
    description: 'This is the first lesson',
    id: 1,
  },
  {
    title: 'Lesson 2',
    description: 'This is the second lesson',
    id: 2,
  },
  {
    title: 'Lesson 3',
    description: 'This is the third lesson',
    id: 3,
  },
  {
    title: 'Lesson 4',
    description: 'This is the fourth lesson',
    id: 4,
  },
  {
    title: 'Lesson 5',
    description: 'This is the fifth lesson',
    id: 5,
  },
  {
    title: 'Lesson 6',
    description: 'This is the sixth lesson',
    id: 6,
  },
  {
    title: 'Lesson 7',
    description: 'This is the seventh lesson',
    id: 7,
  },
  {
    title: 'Lesson 8',
    description: 'This is the eighth lesson',
    id: 8,
  },
  {
    title: 'Lesson 9',
    description: 'This is the ninth lesson',
    id: 9,
  },
  {
    title: 'Lesson 10',
    description: 'This is the tenth lesson',
    id: 10,
  },
  {
    title: 'Lesson 11',
    description: 'This is the eleventh lesson',
    id: 11,
  },
  {
    title: 'Lesson 12',
    description: 'This is the twelfth lesson',
    id: 12,
  },
  {
    title: 'Lesson 13',
    description: 'This is the thirteenth lesson',
    id: 13,
  },
]

const Lessons = () => {
  const navigate = useNavigate()
  return (
    <>
      <SideMenu page="Lessons" />
      <Box
        id="lessons-container"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          backgroundColor: '#EAECE9',
          // height: '100vh',
          padding: 7,
        }}
      >
        {mockLessons.map((lesson, index) => {
          return (
            <Paper
              key={index}
              elevation={4}
              sx={{
                width: '25ch',
                height: '20ch',
                margin: 5,
                padding: 1,

                '&:hover': {
                  backgroundColor: '#EAECE9',
                  cursor: 'pointer',
                  outline: '1px solid black',
                  transform: 'scale(1.05)',
                  transition: 'all',
                  transitionDuration: '0.3s',
                },
              }}
              onClick={() => navigate('/lesson')}
            >
              {lesson.title}
            </Paper>
          )
        })}
      </Box>
    </>
  )
}

export default Lessons
