import { Box } from '@mui/material'
import { useState } from 'react'
import LessonStepper from './LessonStepper'
import AddLessonStructure from './ChildComponents/AddLessonStructure'
import AddLessonQuestions from './ChildComponents/AddLessonQuestions'

const Step3Test = () => {
  return (
    <>
      <h1>Step 3</h1>
      <p>Review and confirm lesson page goes here</p>
    </>
  )
}

// TODO: this is just a test component to show how to switch between steps
// add the actual components for each step later

const AddLessons = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [dataFromStepOne, setdataFromStepOne] = useState({
    lessonTitle: '',
    numQuestions: 1,
    selectedTopics: [],
  })
  const [dataFromStepTwo, setdataFromStepTwo] = useState([
    {
      // questionNumber: '',
      // questionType: '',
      // prompt: '',
      // codeSnippet: '',
      // topicsCovered: [],
      // answers: [],
      // correctAnswer: '',
      // incorrrectAnswers: [],
    },
  ])
  const [enteredQuestions, setEnteredQuestions] = useState(0)
  // const [isStepOneComplete, setIsStepOneComplete] = useState(false)

  const handlePageBasedOnStep = step => {
    switch (step) {
      case 2:
        return enteredQuestions === dataFromStepOne.numQuestions ? (
          <h2>All questions entered</h2>
        ) : (
          <AddLessonQuestions
            title={dataFromStepOne['lessonTitle']}
            questionLimit={dataFromStepOne['numQuestions']}
            topics={dataFromStepOne['selectedTopics']}
            setEnteredQuestions={setEnteredQuestions}
            prevQuestionData={dataFromStepTwo}
            setQuestionData={setdataFromStepTwo}
          />
        )
      case 3:
        return <Step3Test />
      default:
        return <AddLessonStructure data={dataFromStepOne} setData={setdataFromStepOne} />
    }
  }
  return (
    <Box
      className="addLessons"
      // sx={{ backgroundColor: '#EAECE9', height: '100vh' }}
    >
      {handlePageBasedOnStep(activeStep)}
      <LessonStepper activeStep={activeStep} setActiveStep={setActiveStep} />
      {console.log('dataFromStepTwo')}
      {console.log(dataFromStepTwo)}
      {console.log('entered questions')}
    </Box>
  )
}

export default AddLessons
