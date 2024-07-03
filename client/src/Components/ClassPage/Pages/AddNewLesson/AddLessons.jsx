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
const handlePageBasedOnStep = step => {
  switch (step) {
    case 1:
      return <Step2Test />
    case 2:
      return <Step3Test />
    default:
      return <LessonStructure />
  }
}

const AddLessons = () => {
  const [activeStep, setActiveStep] = useState(0)
  return (
    <div className="addLessons">
      <h1>Add Lessons Page</h1>
      {/* <Step1Test /> */}
      {handlePageBasedOnStep(activeStep)}
      <LessonStepper activeStep={activeStep} setActiveStep={setActiveStep} />
    </div>
  )
}

export default AddLessons
