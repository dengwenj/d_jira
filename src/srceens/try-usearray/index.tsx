import React from 'react'

import { useArray } from 'utils'

type Person = { name: string, age: number }[]

export default function Try() {

  const person: Person = [
    {
      name: 'dwj',
      age: 22
    },
    {
      name: 'zww',
      age: 16
    }
  ]

  const { value, clear, removeIndex, add } = useArray(person)

  return (
    <>
      <button onClick={() => {add({ name: 'hh', age: 22 })}}>add</button>
      <button onClick={() => {removeIndex(0)}}>remove</button>
      <button onClick={() => {clear()}}>clear</button>

      {value.map((item, index) => {
        return (
          <div key={index}>
            <span>{item.name}</span>
            <span>{item.age}</span>
          </div>
        )
      })}
    </>
  )
}
