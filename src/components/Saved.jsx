import { useEffect, useState } from "react"
import { Link, useOutletContext } from "react-router-dom"

export function Saved() {
  const { posts } = useOutletContext()

  useEffect(() => {}, [posts])

  return (
    <div className="saved-container">
      <div className="saved-container-title">
        <div className="saved-container-data">
          <div className="saved-container-data-div">
            <span className="span">Only you can see what you've saved</span>
          </div>
        </div>
        <div className="new-collection" role="button">
          + New Collection
        </div>
      </div>

      <div className="data">
        <div className="data-div">
          <div className="icon"></div>
          <div className="save">
            <span className="span-save">
              <div className="div">Save</div>
            </span>
          </div>
          <div className="data-save-photos">
            <span className="span">
              <div className="div-first">
                Save photos and videos that you want to see again.
              </div>
              <div className="div">
                No one is notified, and only you can see what you've saved.
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
