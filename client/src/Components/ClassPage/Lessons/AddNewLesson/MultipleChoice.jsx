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
  //   Switch,
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
  //   const [answers, setAnswers] = useState([])

  useEffect(() => {
    setAnswers({ ...answers, answerOne, answerTwo, answerThree, answerFour, correctAnswer })
  }, [correctAnswer])

  return (
    <FormControl>
      <FormLabel>Answer Choices</FormLabel>
      <RadioGroup value={correctAnswer} onChange={event => setCorrectAnswer(event.target.value)}>
        <Box>
          <Radio value={answerOne} />
          <TextField
            id="choice-1-input"
            label="Answer 1"
            value={answerOne}
            onChange={event => setAnswerOne(event.target.value)}
          />
        </Box>

        <Box>
          <Radio value={answerTwo} />
          <TextField
            id="choice-2-input"
            label="Answer 2"
            value={answerTwo}
            onChange={event => setAnswerTwo(event.target.value)}
          />
        </Box>

        <Box>
          <Radio value={answerThree} />
          <TextField
            id="choice-3-input"
            label="Answer 3"
            value={answerThree}
            onChange={event => setAnswerThree(event.target.value)}
          />
        </Box>

        <Box>
          <Radio value={answerFour} />
          <TextField
            id="choice-4-input"
            label="Answer 4"
            value={answerFour}
            onChange={event => setAnswerFour(event.target.value)}
          />
        </Box>
      </RadioGroup>
      {/* {correctAnswer} */}
      {/* {answerOne}
      {answerTwo}
      {answerThree}
      {answerFour}  */}
    </FormControl>
  )
}

const MultipleChoice = ({
  enteredQuestions,
  setEnteredQuestions,
  limit,
  topics,
  prevData,
  setQuestionData,
  resetQuestionFormat,
}) => {
  const [prompt, setPrompt] = useState('')
  const [codeSnippet, setCodeSnippet] = useState('')
  const [answers, setAnswers] = useState({
    answerOne: '',
    answerTwo: '',
    answerThree: '',
    answerFour: '',
    correctAnswer: '',
  })
  const [relevantTopics, setRelevantTopics] = useState([])
  const mappings = () => {
    return topics.map(topic => {
      return { [topic]: false }
    })
  }
  const [topicMappings, setTopicMappings] = useState(Object.assign({}, ...mappings()))

  const handleTopicChange = event => {
    setTopicMappings({ ...topicMappings, [event.target.name]: event.target.checked })
    setRelevantTopics(Object.keys(topicMappings).filter(topic => topicMappings[topic]))
  }

  const saveQuestion = () => {
    // TODO: add validation for question fields
    // ALSO: update state structure to be a list of objects
    console.log('saving question')
    setQuestionData([
      ...prevData,
      {
        questionNumber: enteredQuestions,
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
    setEnteredQuestions(prev => prev + 1)
    setTopicMappings(Object.assign({}, ...mappings()))
    setRelevantTopics([])
    resetQuestionFormat('')
  }
  return (
    <>
      <Box>
        <h2>{`Progress: ${enteredQuestions}/${limit}`}</h2>

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

        <AnswerChoices answers={answers} setAnswers={setAnswers} />

        <Tooltip title="Save Question" arrow>
          <IconButton
            onClick={saveQuestion}
            disabled={enteredQuestions >= limit}
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
      </Box>
      <div>
        <h2>PROMPT</h2>
        {prompt}
      </div>
      <div>
        <h2>CODE SNIPPET</h2>
        {codeSnippet}
      </div>
      <div>
        <h2>RELEVANT TOPICS</h2>
        {relevantTopics.map(topic => (
          <>{topic}</>
        ))}
      </div>
      <div>
        <h2>DATA FROM ANSWER CHOICE COMPONENT</h2>
        {answers.answerOne}
        {answers.answerTwo}
        {answers.answerThree}
        {answers.answerFour}
        {answers.correctAnswer}
      </div>
    </>
  )
}

export default MultipleChoice
