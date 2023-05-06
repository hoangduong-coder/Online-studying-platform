import { content, heading } from "@/styles/font"

import { ALL_COURSES } from "@/graphql/course_query"
import BigCourseCard from "../widgets/BigCourseCard"
import ContinueLink from "../widgets/ContinueLink"
import { useQuery } from "@apollo/client"

const SuggestedCourses = () => {
  const { loading, data, error } = useQuery(ALL_COURSES, { pollInterval: 5000 })
  return (
    <div className="suggestedCourses">
      <h2 style={heading.style}>More courses for you</h2>
      {(loading || !data || !data.allCourses) && (
        <div>
          <p style={content.style}>Loading, please wait ...</p>
        </div>
      )}
      {error && (
        <div>
          <p style={content.style}>{`There is an error: ${error.message}`}</p>
        </div>
      )}

      {data && data.allCourses && (
        <div className="list">
          {data.allCourses.length > 0 ? (
            data.allCourses.map((obj: any) => (
              <BigCourseCard
                key={obj.id}
                id={obj.id}
                name={obj.name}
                category={obj.category}
                teacher={obj.teacher}
                estimateTime={obj.estimateTime}
              />
            ))
          ) : (
            <p style={content.style}>No courses to show!</p>
          )}
        </div>
      )}

      <ContinueLink url="/categories" title="View more &#8594;" />
    </div>
  )
}

export default SuggestedCourses
