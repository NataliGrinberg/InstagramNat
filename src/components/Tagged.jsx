import { useEffect, useState } from "react"
import { Link, useOutletContext } from "react-router-dom"

export function Tagged() {
  const { posts } = useOutletContext()

  useEffect(() => {}, [posts])

  return (
    <div className="tagged-container">
      <div className="tagged-container-div">
        <div className="tagged-container-flex">
          <div className="icon"></div>
          <div className="title">
            <span className="title-span">
              <div className="title-span-div">Photos of you</div>
            </span>
          </div>
          <div className="explain">
            <span className="explain-span">
              <div className="explain-div">
                When people tag you in photos, they'll appear here.
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
