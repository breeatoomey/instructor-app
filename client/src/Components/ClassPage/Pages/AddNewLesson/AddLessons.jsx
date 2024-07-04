// import {
//   Box,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
// } from '@mui/material'
import { useState } from 'react'
import LessonStepper from './LessonStepper'
import LessonStructure from './LessonStructure'

const Step2Test = () => {
  return (
    <div>
      <h1>Step 2</h1>
      <p>Step 2 content goes here</p>
    </div>
  )
}

const Step3Test = () => {
  return (
    <div>
      <h1>Step 3</h1>
      <p>Step 3 content goes here</p>
    </div>
  )
}

// TODO: this is just a test component to show how to switch between steps
// add the actual components for each step later

const AddLessons = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [dataFromStep1, setDataFromStep1] = useState({
    lessonTitle: '',
    numQuestions: 1,
    selectedTopics: [],
  })

  const handlePageBasedOnStep = step => {
    switch (step) {
      case 1:
        return <Step2Test />
      case 2:
        return <Step3Test />
      default:
        return <LessonStructure data={dataFromStep1} setData={setDataFromStep1} />
    }
  }
  return (
    <div className="addLessons">
      {/* <Step1Test /> */}
      {handlePageBasedOnStep(activeStep)}
      {/* <h2>DATA FROM STEP 1</h2>
      <div>
        {Object.keys(dataFromStep1).map(key => (
          <p>{dataFromStep1[key]}</p>
        ))}
      </div> */}
      <LessonStepper activeStep={activeStep} setActiveStep={setActiveStep} />
    </div>
  )
}

export default AddLessons
