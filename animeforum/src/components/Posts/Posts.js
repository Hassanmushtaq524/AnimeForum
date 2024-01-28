import React from 'react'

// components

export default function Posts() {
    const sampleData = [10, 10, 10, 10];
  return (
    <>
    <div id="posts-container">
        {sampleData.map((x) => {
            return (
                <Post/>
            )
        })}
    </div>
    </>
  )
}
