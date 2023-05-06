import { Box, Tab, Tabs } from "@mui/material"
import { ReactNode, SyntheticEvent, useState } from "react"
import { content, heading } from "@/styles/font"

import CourseCard from "../widgets/SmallCourseCard"

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

const StudyCourseTable = ({ progress }: { progress: any[] }) => {
  const [value, setValue] = useState<number>(0)
  const [courses, setCourses] = useState<any[]>([
    ...progress.filter((obj) => obj.status === "ONGOING"),
  ])
  const tabs = ["Ongoing", "Finished"]
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
    if (newValue === 1) {
      setCourses(progress.filter((obj) => obj.status !== "ONGOING"))
    } else {
      setCourses(progress.filter((obj) => obj.status === "ONGOING"))
    }
  }
  return (
    <>
      <h2 style={heading.style}>My courses</h2>
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
          {courses.length > 0 ? (
            courses.map((obj) => (
              <CourseCard
                key={obj.course.id}
                courseID={obj.course.id}
                percentage={obj.progressPercentage}
              />
            ))
          ) : (
            <p style={content.style}>No courses found!</p>
          )}
        </Panel>
        <Panel value={value} index={1}>
          {courses.length > 0 ? (
            courses.map((obj) => (
              <CourseCard
                key={obj.course.id}
                courseID={obj.course.id}
                status={obj.status}
              />
            ))
          ) : (
            <p style={content.style}>No courses found!</p>
          )}
        </Panel>
      </Box>
    </>
  )
}
export default StudyCourseTable
