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
  const [dataFromStepTwo, setdataFromStepTwo] = useState([{}])
  const [enteredQuestions, setEnteredQuestions] = useState(0)
  // const [isStepOneComplete, setIsStepOneComplete] = useState(false)

  const handlePageBasedOnStep = step => {
    switch (step) {
      case 2:
        return enteredQuestions === dataFromStepOne.numQuestions ? (
          <h2>All questions entered</h2>
        ) : (
          <>
            <div>{`Questions entered: ${enteredQuestions}/${dataFromStepOne.numQuestions}`}</div>
            <AddLessonQuestions
              title={dataFromStepOne['lessonTitle']}
              topics={dataFromStepOne['selectedTopics']}
              setEnteredQuestions={setEnteredQuestions}
              // prevQuestionData={dataFromStepTwo}
              setQuestionData={setdataFromStepTwo}
            />
          </>
        )
      case 3:
        return <Step3Test />
      default:
        return <AddLessonStructure data={dataFromStepOne} setData={setdataFromStepOne} />
    }
  }
  return (
    <>
      {handlePageBasedOnStep(activeStep)}
      <LessonStepper activeStep={activeStep} setActiveStep={setActiveStep} />
      {console.log('dataFromStepOne')}
      {console.log(dataFromStepOne)}
      {console.log('')}
      {console.log('dataFromStepTwo')}
      {console.log(dataFromStepTwo)}
    </>
  )
}

export default AddLessons
