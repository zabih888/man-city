import React from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";
import PlayerCard from "../../Utils/playerCard";
import Otamendi from "../../../images/players/Otamendi.png";
import Sterling from "../../../images/players/Raheem_Sterling.png";
import Kompany from "../../../images/players/Vincent_Kompany.png";
import { useMediaQuery } from "@mui/material";
import theme from "../../UI/Theme";


const HomeCards = (props) => {
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  let cards = [
    {
      bottom: 90,
      left: matchesSM ? [40] : matchesMD ? [60] : [140],
      player: Kompany,
    },
    {
      bottom: 60,
      left: matchesSM ? [30] : matchesMD ? [40] : [110],
      player: Sterling,
    },
    {
      bottom: 30,
      left: matchesSM ? [20] : matchesMD ? [20] : [80], 
      player: Otamendi,
    },
  ];
  const showAniateCards = () =>
    cards.map((card, i) => (
      <Animate
        key={i}
        show={props.show}
        start={{
          left: 0,
          bottom: 0,
        }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: {delay:700, duration: 600, ease: easePolyOut },
        }}
      >
        {({ left, bottom }) => (
          <div
            style={{
              position: "absolute",
              left,
              bottom,
            }}
          >
            <PlayerCard
              number="30"
              name="Nicolas"
              lastName="Otamendi"
              bck={card.player}
            />
          </div>
        )}
      </Animate>
    ));

  return <div>{showAniateCards()}</div>;
};

export default HomeCards;
