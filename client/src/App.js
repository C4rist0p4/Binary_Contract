import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle, generateStore } from "@drizzle/store";
import drizzleOption from "./drizzleOptions";
import RequestRandom from "./RequestRandom";
import "./App.css";

const drizzleStore = generateStore(drizzleOption);
const drizzle = new Drizzle(drizzleOption, drizzleStore)

const App = () => {
    return (<DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const {drizzle, drizzleState, initialized} = drizzleContext;

          if(!initialized) {
            return "Loading..."
          }

          return (
            <RequestRandom drizzle={drizzle} drizzleState={drizzleState}></RequestRandom>
            )
          }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}


export default App;
