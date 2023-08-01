import React from 'react'
import PrimarySearchAppBar from "../header/index"
import Service from "./Service"
import CreatedList from "./CreatedList"

export default function HomeRecords() {
  return (
    <div>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <Service></Service>
      <CreatedList></CreatedList>
    </div>
  )
}
