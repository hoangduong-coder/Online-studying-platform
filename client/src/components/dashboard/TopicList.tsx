import { content, heading } from "@/styles/font"

const topics = [
  "Marketing",
  "Design",
  "Data Analysis",
  "Telecommunications",
  "Machine learning",
  "Web development",
  "Finance",
  "Language",
]

const TopicList = () => {
  return (
    <>
      <h2 style={heading.style}>Topics</h2>
      <div className="topicList">
        {topics.map((obj) => (
          <div key={obj} className="items" style={content.style}>
            {obj}
          </div>
        ))}
      </div>
    </>
  )
}

export default TopicList
