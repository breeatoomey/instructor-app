import { Box, TextField, MenuItem } from '@mui/material'
import { useState } from 'react'

const questionFormats = [
  'Multiple Choice',
  'True/False',
  'Matching',
  'Fill in the Blank',
  'Rearrange the Code',
]

const MultipleChoice = () => {
  return (
    <Box>
      <h1>Multiple Choice</h1>
    </Box>
  )
}

const AddLessonQuestions = ({ title, questionLimit, topics }) => {
  const [questionFormat, setQuestionFormat] = useState('')
  const handlePageBasedOnQuestionFormat = format => {
    switch (format) {
      case 'Multiple Choice':
        return <MultipleChoice />
      case 'True/False':
        return (
          <Box>
            <h1>True/False</h1>
          </Box>
        )
      case 'Matching':
        return (
          <Box>
            <h1>Matching</h1>
          </Box>
        )
      case 'Fill in the Blank':
        return (
          <Box>
            <h1>Fill in the Blank</h1>
          </Box>
        )
      case 'Rearrange the Code':
        return (
          <Box>
            <h1>Rearrange the Code</h1>
          </Box>
        )
      default:
        return ''
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#EAECE9',
        // height: '80vh',
        '& > :not(style)': {
          m: 1,
          width: '25ch',
        },
      }}
    >
      <h1>Lesson Questions</h1>
      <TextField
        select
        label="Question Format"
        value={questionFormat}
        onChange={event => setQuestionFormat(event.target.value)}
      >
        {questionFormats.map((format, index) => {
          return (
            <MenuItem key={index} value={format}>
              {format}
            </MenuItem>
          )
        })}
      </TextField>
      {handlePageBasedOnQuestionFormat(questionFormat)}
    </Box>
  )
}

export default AddLessonQuestions
