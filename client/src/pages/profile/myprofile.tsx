import { content, heading } from "@/styles/font"

import Head from "next/head"
import StudyCourseTable from "@/components/profile/StudyCourseTable"
import TeachingCourseTable from "@/components/profile/TeachingCourseTable"
import graphqlQuery from "@/graphql/query_func"
import styles from "@/styles/Profile.module.css"

export default function Profile() {
  const userResult = graphqlQuery.getUser()
  return (
    <>
      <Head>
        <title>My profile | HD learning platform</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {(userResult.loading || !userResult || !userResult.user) && (
          <div>
            <p style={content.style}>Loading, please wait ...</p>
          </div>
        )}
        {userResult.error && (
          <div>
            <p
              style={content.style}
            >{`There is an error in loading profile: ${userResult.error.message}`}</p>
          </div>
        )}
        {userResult.user && (
          <>
            <div className={styles.header}>
              <h1 style={heading.style}>{userResult.user.name}</h1>
            </div>
            <div className="informationTable">
              <table>
                <tbody>
                  <tr>
                    <th style={heading.style}>Roles</th>
                    <td style={content.style}>{userResult.user.__typename}</td>
                  </tr>
                  <tr>
                    <th style={heading.style}>Email</th>
                    <td style={content.style}>{userResult.user.email}</td>
                  </tr>
                  {userResult.user.__typename === "Teacher" && (
                    <tr>
                      <th style={heading.style}>Organization</th>
                      <td style={content.style}>
                        {userResult.user.organization}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className={styles.study}>
              {userResult.user.__typename === "Student" ? (
                <StudyCourseTable progress={userResult.user.studyProgress} />
              ) : (
                <TeachingCourseTable
                  teacherID={userResult.user.id}
                  courseList={userResult.user.ownCourses}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
