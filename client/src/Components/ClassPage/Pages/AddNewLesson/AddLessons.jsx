// import { Stepper, Step, StepLabel, Button, Box } from '@mui/material'
// import React from 'react'
// import { useState } from 'react'
import LessonStepper from './LessonStepper'

const AddLessons = () => {
  const Step1Test = () => {
    return (
      <div>
        <h1>Step 1</h1>
        <p>Step 1 content goes here</p>
      </div>
    )
  }
  return (
    <div className="addLessons">
      <h1>Add Lessons Page</h1>
      <Step1Test />
      <LessonStepper />
    </div>
  )
}

export default AddLessons
