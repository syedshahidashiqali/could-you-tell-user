import React from 'react'
import { Link } from 'react-router-dom'

export default function EventCard({item}) {
  return (
    <div className="col-xl-4 mb-5">
        <Link to={`/host-events/${item._id}`} className="host-event-card">
            <img src="images/event-1.png" alt="" className="img-fluid" />
            <h3 className="event-title my-4">{item.name}</h3>
        </Link>
    </div>
  )
}
