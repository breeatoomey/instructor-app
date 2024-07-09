import {
  Box,
  TextField,
  FormGroup,
  MenuItem,
  FormControlLabel,
  Checkbox,
  IconButton,
  Tooltip,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { useState } from 'react'

const TrueFalse = ({ setEnteredQuestions, topics, setQuestionData, resetQuestionFormat }) => {
  const [prompt, setPrompt] = useState('')
  const [codeSnippet, setCodeSnippet] = useState('')
  const [trueOrFalse, setTrueOrFalse] = useState('')

  const mappings = () => {
    return topics.map(topic => {
      return { [topic]: false }
    })
  }

  const [topicMappings, setTopicMappings] = useState(Object.assign({}, ...mappings()))

  const handleTopicChange = event => {
    setTopicMappings({ ...topicMappings, [event.target.name]: event.target.checked })
  }

  const saveQuestion = event => {
    event.preventDefault()
    console.log('saving the question')
    const relevantTopics = Object.keys(topicMappings).filter(topic => topicMappings[topic])
    if (relevantTopics.length === 0) {
      alert('Please select at least one topic')
      return
    }
    setEnteredQuestions(prev => prev + 1)
    setQuestionData(prevData => [
      ...prevData,
      {
        questionType: 'True/False',
        prompt,
        codeSnippet,
        topicsCovered: relevantTopics,
        answer: trueOrFalse,
      },
    ])
    // resetting states
    setPrompt('')
    setCodeSnippet('')
    setTrueOrFalse('')
    setTopicMappings(Object.assign({}, ...mappings()))
    resetQuestionFormat('')
  }
  return (
    <>
      <form onSubmit={saveQuestion}>
        <TextField
          id="prompt-input"
          label="Prompt"
          value={prompt}
          onChange={event => setPrompt(event.target.value)}
          multiline
          rows={3}
          required
        />
        <TextField
          id="code-snippet-input"
          label="Code Snippet"
          value={codeSnippet}
          onChange={event => setCodeSnippet(event.target.value)}
          multiline
          rows={3}
          required
        />
        <TextField
          select
          id="true-false-input"
          label="Answer"
          value={trueOrFalse}
          onChange={event => setTrueOrFalse(event.target.value)}
          required
        >
          {['True', 'False'].map((option, index) => {
            return (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            )
          })}
        </TextField>

        {/* make this a component since we're reusing pretty much the same code from LessonStructure for selecting topics */}
        <TextField
          select
          id="relevant-topics-for-question-select"
          label="Topics Covered"
          helperText="Please select at least one topic"
          fullWidth
        >
          <FormGroup>
            {topics.map((topic, index) => (
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
        <Box>
          <Tooltip title="Save Question" arrow>
            <IconButton type="submit">
              <CheckIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </form>

      {/* {prompt}
      {codeSnippet}
      {trueOrFalse} */}
    </>
  )
}

export default TrueFalse
