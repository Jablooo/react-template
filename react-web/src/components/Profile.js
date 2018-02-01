import React from 'react'

export default function Profile ({
  firstName,
  lastName,
  age
}) {
  return (
    <div>
      <span> name: {firstName} {lastName} </span>
      &nbsp;
      <span> age: {age} </span>
      &nbsp;
    </div>
  )
}
