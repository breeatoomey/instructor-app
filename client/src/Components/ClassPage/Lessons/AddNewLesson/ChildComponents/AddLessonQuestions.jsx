import { Box, TextField, MenuItem } from '@mui/material'
import { useState } from 'react'
import MultipleChoice from './MultipleChoice'
// import TrueFalse from './TrueFalse'

const questionFormats = [
  'Multiple Choice',
  // 'True/False',
  'Matching',
  'Fill in the Blank',
  'Rearrange the Code',
]

const AddLessonQuestions = ({
  title,
  // questionLimit,
  topics,
  setEnteredQuestions,
  // prevQuestionData,
  setQuestionData,
}) => {
  const [questionFormat, setQuestionFormat] = useState('')
  // const [localData, setLocalData] = useState({}) // have this so when user comes back to this page, they can see their previous work? or can just pass it from the parent component?
  const handlePageBasedOnQuestionFormat = format => {
    switch (format) {
      case 'Multiple Choice':
        return (
          <MultipleChoice
            setEnteredQuestions={setEnteredQuestions}
            topics={topics}
            setQuestionData={setQuestionData}
            resetQuestionFormat={setQuestionFormat}
          />
        )
      // case 'True/False':
      //   return (
      //     <TrueFalse
      //       setEnteredQuestions={setEnteredQuestions}
      //       topics={topics}
      //       setQuestionData={setQuestionData}
      //       resetQuestionFormat={setQuestionFormat}
      //     />
      //   )
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
            <p>In development...</p>
          </Box>
        )
      case 'Rearrange the Code':
        return (
          <Box>
            <h1>Rearrange the Code</h1>
            <p>In development...</p>
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
        '& > :not(style)': {
          m: 1,
          width: '50ch',
        },
      }}
    >
      <h1>{title}</h1>
      <TextField
        select
        label="Question Format"
        value={questionFormat}
        onChange={event => setQuestionFormat(event.target.value)}
      >
        {questionFormats.map((format, index) => (
          <MenuItem key={index} value={format}>
            {format}
          </MenuItem>
        ))}
      </TextField>
      {handlePageBasedOnQuestionFormat(questionFormat)}
    </Box>
  )
}

export default AddLessonQuestions
