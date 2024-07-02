import React from 'react'
import SideMenu from '../SideMenu/SideMenu'
import { Box, Paper, Typography } from '@mui/material'

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
]

const Lessons = () => {
  return (
    <div className="lessons">
      <SideMenu></SideMenu>
      <h1>Lessons</h1>
      {mockLessons.map((lesson, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Paper
              elevation={2}
              sx={{
                width: 250,
                height: 100,
                margin: 1,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer',
                },
              }}
              onClick={() => console.log(`Lesson ${lesson.id} clicked`)}
            >
              {lesson.title}
            </Paper>{' '}
          </Box>
        )
      })}
    </div>
  )
}

export default Lessons
