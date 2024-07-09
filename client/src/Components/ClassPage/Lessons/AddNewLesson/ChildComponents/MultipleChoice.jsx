import {
  Box,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from '@mui/material'
import { useState, useEffect } from 'react'
import CheckIcon from '@mui/icons-material/Check'

const AnswerChoices = ({ answers, setAnswers }) => {
  const [answerOne, setAnswerOne] = useState('Answer 1')
  const [answerTwo, setAnswerTwo] = useState('Answer 2')
  const [answerThree, setAnswerThree] = useState('Answer 3')
  const [answerFour, setAnswerFour] = useState('Answer 4')
  const [correctAnswer, setCorrectAnswer] = useState(answerOne)

  useEffect(() => {
    setAnswers({ ...answers, answerOne, answerTwo, answerThree, answerFour, correctAnswer })
  }, [correctAnswer, answerOne, answerTwo, answerThree, answerFour, answers, setAnswers])

  return (
    <FormControl>
      <FormLabel>Answer Choices</FormLabel>
      <RadioGroup
        id="answer-choices-radio-group"
        value={correctAnswer}
        onChange={event => setCorrectAnswer(event.target.value)}
      >
        <Box>
          <Radio value={answerOne} />
          <TextField
            required
            id="choice-1-input"
            label="Answer 1"
            value={answerOne}
            onChange={event => setAnswerOne(event.target.value)}
          />
        </Box>
        <Box>
          <Radio value={answerTwo} />
          <TextField
            required
            id="choice-2-input"
            label="Answer 2"
            value={answerTwo}
            onChange={event => setAnswerTwo(event.target.value)}
          />
        </Box>
        <Box>
          <Radio value={answerThree} />
          <TextField
            required
            id="choice-3-input"
            label="Answer 3"
            value={answerThree}
            onChange={event => setAnswerThree(event.target.value)}
          />
        </Box>
        <Box>
          <Radio value={answerFour} />
          <TextField
            required
            id="choice-4-input"
            label="Answer 4"
            value={answerFour}
            onChange={event => setAnswerFour(event.target.value)}
          />
        </Box>
      </RadioGroup>
    </FormControl>
  )
}

const MultipleChoice = ({ setEnteredQuestions, topics, setQuestionData, resetQuestionFormat }) => {
  const [prompt, setPrompt] = useState('')
  const [codeSnippet, setCodeSnippet] = useState('')
  const [answers, setAnswers] = useState({
    answerOne: '',
    answerTwo: '',
    answerThree: '',
    answerFour: '',
    correctAnswer: '',
  })

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
    console.log('saving question')
    const relevantTopics = Object.keys(topicMappings).filter(topic => topicMappings[topic])
    if (relevantTopics.length === 0) {
      alert('Please select at least one topic')
      return
    }

    setEnteredQuestions(prev => prev + 1)
    setQuestionData(prevData => [
      ...prevData,
      {
        // questionNumber: enteredQuestions,
        questionType: 'Multiple Choice',
        prompt,
        codeSnippet,
        topicsCovered: relevantTopics,
        answers,
      },
    ])
    setPrompt('')
    setCodeSnippet('')
    setAnswers({
      answerOne: '',
      answerTwo: '',
      answerThree: '',
      answerFour: '',
      correctAnswer: '',
    })

    setTopicMappings(Object.assign({}, ...mappings()))
    resetQuestionFormat('')
    // console.log('question data:')
    // console.log(prevData)
  }

  return (
    <>
      <form onSubmit={saveQuestion}>
        <Box id="inputs-container">
          <TextField
            id="question-prompt-input"
            label="Question Prompt"
            value={prompt}
            onChange={event => setPrompt(event.target.value)}
            multiline
            rows={3}
            required
            fullWidth
          />
          <TextField
            id="code-snippet-input"
            label="Code Snippet"
            value={codeSnippet}
            onChange={event => setCodeSnippet(event.target.value)}
            multiline
            rows={3}
            required
            fullWidth
          />

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
        </Box>
        <AnswerChoices answers={answers} setAnswers={setAnswers} />
        <Box>
          <Tooltip title="Save Question" arrow>
            <IconButton type="submit">
              <CheckIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </form>
    </>
  )
}

export default MultipleChoice
