import * as React from 'react'
import { User } from '../interfaces'

type Props = {
  items: User[]
}

const List = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
       
      </li>
    ))}
  </ul>
)

export default List
