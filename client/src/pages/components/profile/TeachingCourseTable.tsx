import { Box, Tab, Tabs } from "@mui/material"
import { ReactNode, SyntheticEvent, useState } from "react"
import { content, heading } from "@/styles/font"

import Button from "../widgets/Button"
import CourseCard from "../widgets/CourseCard"

const Panel = ({
  children,
  index,
  value,
}: {
  children?: ReactNode
  index: number
  value: number
}) => {
  return (
    <div hidden={value !== index} id={`panel-${value}`}>
      {value === index && <div>{children}</div>}
    </div>
  )
}

const TeachingCourseTable = () => {
  const [value, setValue] = useState<number>(0)
  const tabs = ["Current", "Create"]
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <>
      <h2 style={heading.style}>My teaching</h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            {tabs.map((tabName) => (
              <Tab
                key={`tab-${tabName}`}
                label={tabName}
                id={`tab-${tabName}`}
                style={heading.style}
              />
            ))}
          </Tabs>
        </Box>
        <Panel value={value} index={0}>
          <CourseCard />
        </Panel>
        <Panel value={value} index={1}>
          <Button title="Create new course" />
        </Panel>
      </Box>
    </>
  )
}
export default TeachingCourseTable
