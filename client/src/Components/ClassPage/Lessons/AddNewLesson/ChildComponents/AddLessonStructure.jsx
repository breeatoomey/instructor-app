import { useState } from 'react'
import {
  Box,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
} from '@mui/material'

const AddLessonStructure = ({ data, setData }) => {
  // TODO: add everything to a form and then add a save button that sends data back to AddLessons
  const [lessonTitle, setLessonTitle] = useState(data['lessonTitle'])
  const [numQuestions, setNumQuestions] = useState(data['numQuestions'])
  const [topics, setTopics] = useState(data['selectedTopics'])

  // temporary solution. will fetch topics from the server later
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
  const mappings = () => {
    return mockTopics.map(topic => {
      if (topics.includes(topic)) {
        return { [topic]: true }
      }
      return { [topic]: false }
    })
  }

  const [topicMappings, setTopicMappings] = useState(Object.assign({}, ...mappings()))

  const handleTopicChange = event => {
    setTopicMappings({ ...topicMappings, [event.target.name]: event.target.checked })
  }

  const submitForm = event => {
    event.preventDefault()
    // console.log(lessonTitle)
    // console.log(data['selectedTopics'])

    const selectedTopics = Object.keys(topicMappings).filter(topic => topicMappings[topic])
    // console.log(selectedTopics)
    if ((data['lessonTitle'] === '' && lessonTitle === '') || selectedTopics.length === 0) {
      alert('Please fill in all fields')
      return
    }
    setData({ ...data, lessonTitle, numQuestions, selectedTopics })
    // console.log(data)
    alert('Lesson structure saved. You can proceed to the next step safely.')
    // console.log('submitted form')
  }

  return (
    <Box
      id="lesson-structure-form-container"
      sx={{
        // position: 'static',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#EAECE9',
        height: '80vh',
        '& > :not(style)': {
          m: 1,
          width: '25ch',
        },
      }}
    >
      <h1>Lesson Structure</h1>
      <form onSubmit={submitForm}>
        <TextField
          id="lesson-title-input"
          label="Lesson Title"
          variant="standard"
          value={lessonTitle}
          onChange={event => setLessonTitle(event.target.value)}
          required
        />
        <TextField
          select
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
        <TextField select id="relevant-topics-select" label="relevant topics">
          <FormGroup>
            {mockTopics.map((topic, index) => (
              <MenuItem key={index}>
                <FormControlLabel
                  label={topic}
                  control={
                    <Checkbox
                      checked={topicMappings[topic]}
                      onChange={handleTopicChange}
                      name={topic}
                    />
                  }
                />
              </MenuItem>
            ))}
          </FormGroup>
        </TextField>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </Box>
  )
}

export default AddLessonStructure
