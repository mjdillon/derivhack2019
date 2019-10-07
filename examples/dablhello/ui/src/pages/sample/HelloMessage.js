import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useLedgerDispatch, useLedgerState, getContracts, sendCommand, fetchContracts } from "../../context/LedgerContext";
import { useUserState } from "../../context/UserContext";

export default function HelloMessage() {

  const user = useUserState();
  const ledger = useLedgerState();
  const ledgerDispatch = useLedgerDispatch();
  const helloMessages = getContracts(ledger, "Sample", "HelloMessage");

  return (
    <>
      <Contracts
        contracts={helloMessages}
        columns={[
          ["ContractId", "contractId"],
          ["Sender", "argument.sender"],
          ["Recipient", "argument.recipient"],
          ["Message", "argument.message"],
        ]}
        actions={[]}
      />
    </>
  );
}
