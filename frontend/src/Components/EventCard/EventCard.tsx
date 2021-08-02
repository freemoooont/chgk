import React from "react";
import { Event } from "../../app-types";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
}: EventCardProps): React.ReactElement => {
  return (
    <>
      <div>
        Эвенет:{" "}
        <Link to={{ pathname: `/event/${event._id}` }}>{event.name}</Link>{" "}
      </div>
    </>
  );
};
