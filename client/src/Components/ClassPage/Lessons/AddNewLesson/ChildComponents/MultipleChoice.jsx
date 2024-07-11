import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material'
import { useState, useEffect } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import CheckboxSelect from './CheckBoxSelect'

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
  const [topicsToDisplay, setTopicsToDisplay] = useState([])

  const saveQuestion = event => {
    event.preventDefault()
    console.log('saving question')
    setEnteredQuestions(prev => prev + 1)
    setQuestionData(prevData => [
      ...prevData,
      {
        // questionNumber: enteredQuestions,
        questionType: 'Multiple Choice',
        prompt,
        codeSnippet,
        topicsCovered: topicsToDisplay,
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
    setTopicsToDisplay([])
    resetQuestionFormat('')
    // console.log('question data:')
    // console.log(prevData)
  }

  return (
    <>
      <form onSubmit={saveQuestion}>
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
        <CheckboxSelect topics={topics} setTopicsToDisplay={setTopicsToDisplay} />
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

// export { AnswerChoices }
export default MultipleChoice
