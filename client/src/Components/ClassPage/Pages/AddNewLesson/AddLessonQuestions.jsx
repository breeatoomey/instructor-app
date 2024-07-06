import {
  Box,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
} from '@mui/material'
import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'

const questionFormats = [
  'Multiple Choice',
  'True/False',
  'Matching',
  'Fill in the Blank',
  'Rearrange the Code',
]

const MultipleChoice = ({
  enteredQuestions,
  setEnteredQuestions,
  limit,
  topics,
  setQuestionData,
}) => {
  const [prompt, setPrompt] = useState('')
  const [codeSnippet, setCodeSnippet] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState({})
  const [relevantTopics, setRelevantTopics] = useState([])
  // const [relevantTopics, setRelevantTopics] = useState('')
  // const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)

  const numberOfChoices = 4

  const saveQuestion = () => {
    setEnteredQuestions(prev => prev + 1)
    // here is where we would update data state
  }
  return (
    <>
      <Box>
        <h2>{`Progress: ${enteredQuestions}/${limit}`}</h2>
        <Tooltip title="Save Question" arrow>
          <IconButton
            onClick={() => setEnteredQuestions(prev => prev + 1)}
            sx={{
              color: 'green',
              outline: ' 1px solid green',
              '&:hover': {
                backgroundColor: 'green',
                color: 'white',
                transform: 'scale(1.1)',
                transition: 'all 0.3s',
                outline: 'none',
              },
            }}
          >
            <CheckIcon />
          </IconButton>
        </Tooltip>

        <TextField
          id="question-prompt-input"
          label="Question Prompt"
          value={prompt}
          onChange={event => setPrompt(event.target.value)}
          multiline
          rows={4}
          fullWidth
        />
        <TextField
          id="code-snippet-input"
          label="Code Snippet"
          value={codeSnippet}
          onChange={event => setCodeSnippet(event.target.value)}
          multiline
          rows={4}
          fullWidth
        />

        {/* make this a component since we're reusing pretty much the same code from LessonStructure for selecting topics */}
        <TextField select id="relevant-topics-for-question-select" label="Topics Covered" fullWidth>
          <FormGroup>
            {topics.map((topic, index) => (
              <MenuItem key={index}>
                <FormControlLabel
                  label={topic}
                  control={
                    <Checkbox
                      checked={true}
                      // checked={topicMappings[topic]}
                      // onChange={handleTopicChange}
                      name={topic}
                    />
                  }
                />
              </MenuItem>
            ))}
          </FormGroup>
        </TextField>

        {[...Array(numberOfChoices)].map((_, index) => {
          return (
            <>
              <TextField key={index} id={`choice-${index}`} label={`Answer ${index + 1}`} />
              <Switch defaultChecked />
            </>
          )
        })}
        {/* {prompt}
        {codeSnippet} */}
      </Box>
    </>
  )
}

const AddLessonQuestions = ({ title, questionLimit, topics, setQuestionData }) => {
  const [questionFormat, setQuestionFormat] = useState('')
  const [enteredQuestions, setEnteredQuestions] = useState(0)
  const [localData, setLocalData] = useState({}) // have this so when user comes back to this page, they can see their previous work? or can just pass it from the parent component?
  const handlePageBasedOnQuestionFormat = format => {
    switch (format) {
      case 'Multiple Choice':
        return (
          <MultipleChoice
            enteredQuestions={enteredQuestions}
            addQuestion={setEnteredQuestions}
            limit={questionLimit}
            topics={topics}
            setQuestionData={setQuestionData}
          />
        )
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
        // backgroundColor: '#EAECE9',
        // height: '80vh',
        '& > :not(style)': {
          m: 1,
          width: '50ch',
        },
      }}
    >
      <h1>{title}</h1>
      <div></div> {/* TODO: uhhh definitely fix this with some css later plz*/}
      {/* <h2>Question Limit: {questionLimit}</h2>
      <h2>Topics: {topics.join(', ')}</h2> */}
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
