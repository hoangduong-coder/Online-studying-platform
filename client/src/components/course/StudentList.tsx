import { Box, Tab, Tabs } from "@mui/material"
import { ReactNode, SyntheticEvent, useState } from "react"
import { content, heading } from "@/styles/font"

import StudentCard from "./StudentCard"
import moment from "moment"

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

const StudentList = ({ list }: { list: any[] }) => {
  const [value, setValue] = useState<number>(0)
  const [studentList, setStudentList] = useState<any[]>([
    ...list.filter((obj) => obj.status == "ONGOING"),
  ])
  const tabs = ["Ongoing", "Finished"]
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
    if (newValue === 1) {
      setStudentList(list.filter((obj) => obj.status !== "ONGOING"))
    } else {
      setStudentList(list.filter((obj) => obj.status == "ONGOING"))
    }
  }
  return (
    <div>
      <h2 style={heading.style}>Students list</h2>
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
          {studentList.length > 0 ? (
            studentList.map((obj) => (
              <StudentCard
                key={obj.student.id}
                name={obj.student.name}
                startDate={obj.startDate}
                percentage={obj.progressPercentage}
              />
            ))
          ) : (
            <p style={content.style}>No list found!</p>
          )}
        </Panel>
        <Panel value={value} index={1}>
          {studentList.length > 0 ? (
            studentList.map((obj) => (
              <StudentCard
                key={obj.student.id}
                name={obj.student.name}
                finishDate={obj.finishDate}
                status={obj.status}
              />
            ))
          ) : (
            <p style={content.style}>No list found!</p>
          )}
        </Panel>
      </Box>
    </div>
  )
}
export default StudentList
