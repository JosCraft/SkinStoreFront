import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export const ItemCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Item Card</CardTitle>
        <CardDescription>Item Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Item Card Content</p>
      </CardContent>
    </Card>
  )
}

export default ItemCard
