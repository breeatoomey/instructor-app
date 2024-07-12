import { useState } from 'react'
import { Box, TextField, MenuItem, Button } from '@mui/material'
import CheckboxSelect from './CheckBoxSelect'

const AddLessonStructure = ({ data, setData }) => {
  const [lessonTitle, setLessonTitle] = useState(data['lessonTitle'])
  const [numQuestions, setNumQuestions] = useState(data['numQuestions'])
  const [topicsToDisplay, setTopicsToDisplay] = useState([])

  // temporary solution. will fetch topics from the server later
  const mockTopics = [
    'Lists',
    'Strings',
    'Dictionaries',
    'Loops',
    'Functions',
    'Classes',
    'Recursion',
  ]

  const submitForm = event => {
    event.preventDefault()
    // console.log(lessonTitle)
    // console.log(data['selectedTopics'])
    // console.log(selectedTopics)
    if ((data['lessonTitle'] === '' && lessonTitle === '') || topicsToDisplay.length === 0) {
      alert('Please fill in all fields')
      return
    }
    setData({ ...data, lessonTitle, numQuestions, selectedTopics: topicsToDisplay })
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
          {[...Array.from({ length: 10 }, (v, i) => i + 1)].map((number, index) => {
            return (
              <MenuItem key={index} value={number}>
                {number}
              </MenuItem>
            )
          })}
        </TextField>

        <CheckboxSelect
          topics={mockTopics}
          topicsPreviouslySelected={data['selectedTopics']}
          setTopicsToDisplay={setTopicsToDisplay}
        />
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </Box>
  )
}

export default AddLessonStructure
