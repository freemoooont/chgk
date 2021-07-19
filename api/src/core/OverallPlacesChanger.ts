import Team from "../database/model/Team";

function OverallPlacesChanger(teams: Team[]):Team[]{
    if(teams) {
        // @ts-ignore
        teams.sort((a, b) => {
            // @ts-ignore
                if (a.rating < b.rating) return 1;
                if (a.rating == b.rating) return 0;
                // @ts-ignore
                if (a.rating > b.rating) return -1;
        })
    }
    return teams.map((obj, idx):Team => {obj.overallPlace = idx+1; return obj});
}

export default OverallPlacesChanger;