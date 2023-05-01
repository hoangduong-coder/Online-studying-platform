import { content, heading } from "@/styles/font"

import { ALL_COURSES } from "@/graphql/query"
import ContinueLink from "../widgets/ContinueLink"
import NewCourseCard from "./NewCourseCard"
import { useQuery } from "@apollo/client"

const SuggestedCourses = () => {
  const { loading, data } = useQuery(ALL_COURSES)
  return (
    <div className="suggestedCourses">
      <h2 style={heading.style}>More courses for you</h2>
      {loading && <p style={content.style}>Loading, please wait ...</p>}
      {data && (
        <>
          <div className="list">
            {data.searchCourses.map((obj: any) => (
              <NewCourseCard
                key={obj.id}
                id={obj.id}
                name={obj.name}
                category={obj.category}
                teacher={obj.teacher}
                estimateTime={obj.estimateTime}
              />
            ))}
          </div>
          <ContinueLink url="/categories" title="View more &#8594;" />
        </>
      )}
    </div>
  )
}

export default SuggestedCourses
