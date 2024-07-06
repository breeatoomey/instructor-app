import { Box } from '@mui/material'
import { useState } from 'react'
import LessonStepper from './LessonStepper'
import AddLessonStructure from './AddLessonStructure'
import AddLessonQuestions from './AddLessonQuestions'

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
  const [activeStep, setActiveStep] = useState(0)
  const [dataFromStepOne, setdataFromStepOne] = useState({
    lessonTitle: '',
    numQuestions: 1,
    selectedTopics: [],
  })
  // const [isStepOneComplete, setIsStepOneComplete] = useState(false)

  const handlePageBasedOnStep = step => {
    switch (step) {
      case 1:
        return (
          <AddLessonQuestions
            title={dataFromStepOne['lessonTitle']}
            questionLimit={dataFromStepOne['numQuestions']}
            topics={dataFromStepOne['selectedTopics']}
          />
        )
      case 2:
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
      {/* <Step1Test /> */}
      {handlePageBasedOnStep(activeStep)}
      {/* <h2>DATA FROM STEP 1</h2>
      <div>
        {Object.keys(dataFromStepOne).map(key => (
          <p>{dataFromStepOne[key]}</p>
        ))}
      </div> */}
      <LessonStepper activeStep={activeStep} setActiveStep={setActiveStep} />
    </Box>
  )
}

export default AddLessons
