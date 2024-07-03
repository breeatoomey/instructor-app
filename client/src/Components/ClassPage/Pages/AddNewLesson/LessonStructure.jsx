import { useState } from 'react'
import { Box, TextField, MenuItem, Checkbox, FormControlLabel, FormGroup } from '@mui/material'

const questionOptions = [...Array.from({ length: 10 }, (v, i) => i + 1)]
const mockTopics = [
  'Lists',
  'Strings',
  'Dictionaries',
  'Loops',
  'Functions',
  'Classes',
  'Recursion',
]

const LessonStructure = () => {
  const [lessonTitle, setLessonTitle] = useState('New Lesson')
  const [numQuestions, setNumQuestions] = useState(1)
  const [topics, setTopics] = useState({
    Lists: false,
    Strings: false,
    Dictionaries: false,
    Loops: false,
    Functions: false,
    Classes: false,
    Recursion: false,
  })

  const handleTopicChange = event => {
    console.log(event.target.name, event.target.checked)
    setTopics({ ...topics, [event.target.name]: event.target.checked })
  }

  // const selectedTopics = Object.keys(topics).filter(topic => topics[topic])
  const selectedTopics = topics => Object.keys(topics).filter(topic => topics[topic])
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& > :not(style)': {
          m: 1,
          width: '25ch',
        },
      }}
    >
      <h1>Lesson Structure</h1>
      <div>Lesson Title</div>
      <TextField
        id="lesson-title-input"
        label="Lesson Title"
        variant="standard"
        value={lessonTitle}
        onChange={event => setLessonTitle(event.target.value)}
        required
      />
      {/* <InputLabel id="num-questions-label">Number of Questions</InputLabel> */}
      <div>Number of Questions</div>
      <TextField
        // labelId="num-questions-label"
        select
        maxRows={4}
        id="num-questions-input"
        label="Number of Questions"
        value={numQuestions}
        onChange={event => setNumQuestions(event.target.value)}
        required
      >
        {questionOptions.map((number, index) => {
          return (
            <MenuItem key={index} value={number}>
              {number}
            </MenuItem>
          )
        })}
      </TextField>
      <div>checkbox goes here</div>
      <TextField select label="relevant topics">
        <FormGroup>
          {mockTopics.map((topic, index) => (
            <MenuItem key={index}>
              <FormControlLabel
                label={topic}
                control={
                  <Checkbox checked={topics[topic]} onChange={handleTopicChange} name={topic} />
                }
              />
            </MenuItem>
          ))}
        </FormGroup>
      </TextField>
      <h2>DATA FROM INPUTS</h2>
      <p>{lessonTitle}</p>
      <p>{numQuestions}</p>
      <p>
        {selectedTopics(topics).map(topic => {
          return `${topic}, `
        })}
      </p>
    </Box>
  )
}

export default LessonStructure
