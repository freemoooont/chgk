import React from "react";
import { Event } from "../../app-types";

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
}: EventCardProps): React.ReactElement => {
  return (
    <>
      <div>Эвенет: {event.name}</div>
    </>
  );
};
