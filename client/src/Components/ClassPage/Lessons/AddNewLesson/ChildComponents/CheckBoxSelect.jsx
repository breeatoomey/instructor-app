import { Box, FormControlLabel, MenuItem, Checkbox, Select } from '@mui/material'
import { useState, useEffect } from 'react'

const CheckboxSelect = ({ topics, topicsPreviouslySelected, setTopicsToDisplay }) => {
  const mappings = () => {
    const initialMappings = topicsPreviouslySelected
      ? topics.map(topic => ({ [topic]: topicsPreviouslySelected.includes(topic) }))
      : topics.map(topic => ({ [topic]: false }))
    return Object.assign({}, ...initialMappings)
  }

  const [topicMappings, setTopicMappings] = useState(mappings())

  useEffect(() => {
    const selectedTopics = Object.keys(topicMappings).filter(topic => topicMappings[topic])
    setTopicsToDisplay(selectedTopics)
  }, [topicMappings])

  const handleTopicChange = event => {
    const { name, checked } = event.target
    setTopicMappings(prevMappings => ({
      ...prevMappings,
      [name]: checked,
    }))
  }

  return (
    <>
      <Select
        required
        labelId="relevant-topics-for-question-select-label"
        id="relevant-topics-for-question-select"
        multiple
        displayEmpty
        value={Object.keys(topicMappings).filter(topic => topicMappings[topic])}
        renderValue={selected => (selected.length === 0 ? 'Select topics' : selected.join(', '))}
      >
        <MenuItem disabled value="">
          <em>Select topics</em>
        </MenuItem>
        {topics.map((topic, index) => (
          <MenuItem key={index} value={topic}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={topicMappings[topic] || false}
                  onChange={handleTopicChange}
                  name={topic}
                />
              }
              label={topic}
            />
          </MenuItem>
        ))}
      </Select>
    </>
  )
}

export default CheckboxSelect
