import React from "react"
import {StandardLayout} from "../components"
import {useUser} from "../hooks"

const DashboardPage = () => {
  const {data, error, loading} = useUser(1)

  if (loading) {
    return <>Loading...</>
  }

  if (error) {
    return <>{String(error)}</>
  }

  return (
    <StandardLayout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </StandardLayout>
  )
}

export default DashboardPage
