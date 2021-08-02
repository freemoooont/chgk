import React from "react";
import { TeamInfo } from "../../../app-types";
import { Link } from "react-router-dom";

interface TeamMiniCardProps {
  team: TeamInfo;
}

export const TeamMiniCard: React.FC<TeamMiniCardProps> = ({
  team,
}: TeamMiniCardProps): React.ReactElement => {
  return (
    <Link to={{ pathname: `/team/${team._id}` }}>
      <div>{team.name}</div>
    </Link>
  );
};
