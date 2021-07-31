import React from "react";
import { Team } from "../../../app-types";

interface TeamMiniCardProps {
  team: Team;
}

export const TeamMiniCard: React.FC<TeamMiniCardProps> = ({
  team,
}: TeamMiniCardProps): React.ReactElement => {
  return <div>{team.name}</div>;
};
