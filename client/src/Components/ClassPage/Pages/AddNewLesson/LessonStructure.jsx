import { useState } from 'react'
import { Box, TextField, MenuItem, Checkbox, FormControlLabel, FormGroup } from '@mui/material'

const LessonStructure = ({ data, setData }) => {
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

  const submitForm = event => {
    event.preventDefault()
    // console.log(lessonTitle)
    // console.log(data['selectedTopics'])

    const selectedTopics = Object.keys(topicMappings).filter(topic => topicMappings[topic])
    // console.log(selectedTopics)
    // This is just a duct-tape solution to prevent the form from submitting if some fields are empty
    // will try to use MUI form validation later or the required prop for text fields in future to prevent invalid form submissions
    if ((data['lessonTitle'] === '' && lessonTitle === '') || selectedTopics.length === 0) {
      alert('Please fill in all fields')
      return
    }
    setData({ ...data, lessonTitle, numQuestions, selectedTopics })
    // console.log(data)
    console.log('submitted form')
  }
  const handleTopicChange = event => {
    setTopicMappings({ ...topicMappings, [event.target.name]: event.target.checked })
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
          width: '25ch',
        },
      }}
    >
      {/* <h1>Lesson Structure</h1> */}
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
        <input type="submit" value="Save" />
      </form>
    </Box>
  )
}

export default LessonStructure
