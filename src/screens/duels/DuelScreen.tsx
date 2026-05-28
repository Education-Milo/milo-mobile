import React from "react";
import { useDuel } from "@hooks/duel/DuelContext";
import EndScreen from "./EndScreen";
import GameScreen from "./GameScreen";
import LobbyScreen from "./LobbyScreen";
import WaitingScreen from "./WaitingScreen";

const DuelScreen = () => {
  const { screen } = useDuel();

  if (screen === "waiting") return <WaitingScreen />;
  if (screen === "game") return <GameScreen />;
  if (screen === "end") return <EndScreen />;
  return <LobbyScreen />;
};

export default DuelScreen;
