import { Stepper, Step, StepLabel, Button, Box } from '@mui/material'
// import React from 'react'
// import { useState } from 'react'

const steps = ['Lesson Structure', 'Lesson Questions', 'Review Lesson']

const LessonStepper = ({ activeStep, setActiveStep }) => {
  //   const [activeStep, setActiveStep] = useState(0)

  const handleNextStep = () => setActiveStep(prevActiveStep => prevActiveStep + 1)
  const handleBackStep = () => setActiveStep(prevActiveStep => prevActiveStep - 1)
  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
        <Button variant="outlined" onClick={handleBackStep} disabled={activeStep === 0}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {activeStep === steps.length ? (
          <>
            <Button
              variant="contained"
              onClick={() =>
                alert('lesson should be added to database now. redirect to lesson page later.')
              }
            >
              Finish
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={handleNextStep}>
              Next
            </Button>
          </>
        )}
      </Box>
    </>
  )
}

export default LessonStepper
