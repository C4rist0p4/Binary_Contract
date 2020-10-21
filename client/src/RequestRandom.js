import React from "react";
import { newContextComponents} from "@drizzle/react-components";


const {
  ContractData,
  ContractForm,
} = newContextComponents;

export default (props) => {
  const { drizzle, drizzleState } = props;
  return (
    <div className="App">
      <div className="section">
        <h2>Random Number</h2>
        <p>
          <strong>Random number is: </strong>
          <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="RandomNumberOracle" method="r_number" />
        </p>
        <ContractForm drizzle={drizzle} contract="RandomNumberOracle" method="requestRandom" />
      </div>
    </div>
    )
  };