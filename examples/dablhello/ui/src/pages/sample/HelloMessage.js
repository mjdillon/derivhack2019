import React from "react";
import Contracts from "../../components/Contracts/Contracts";
import { useLedgerDispatch, useLedgerState, getContracts, sendCommand, fetchContracts } from "../../context/LedgerContext";
import { useUserState } from "../../context/UserContext";

export default function HelloMessage() {

  const user = useUserState();
  const ledger = useLedgerState();
  const ledgerDispatch = useLedgerDispatch();
  const greeters = getContracts(ledger, "Sample", "HelloMessage");

  const acceptChoice = async (c) => {
    const command = {
      templateId: { moduleName: "Sample", entityName: "HelloMessage" },
      contractId: c.contractId,
      choice: "AcceptMessage",
      argument: {},
      meta: { ledgerEffectiveTime: 0 }
    };
    await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {});
    await fetchContracts(ledgerDispatch, user.token, () => {}, () => {});
  }

  const rejectChoice = async (c) => {
    const command = {
      templateId: { moduleName: "Sample", entityName: "HelloMessage" },
      contractId: c.contractId,
      choice: "RejectMessage",
      argument: {},
      meta: { ledgerEffectiveTime: 0 }
    };
    await sendCommand(ledgerDispatch, user.token, "exercise", command, () => {}, () => {});
    await fetchContracts(ledgerDispatch, user.token, () => {}, () => {});
  }

  return (
    <>
      <Contracts
        contracts={greeters}
        columns={[
          ["ContractId", "contractId"],
          ["Sender", "argument.sender"],
          ["Recipient", "argument.recipient"],
          ["Message", "argument.message"],
        ]}
        actions={[["Accept Message", acceptChoice], ["Reject Message", rejectChoice]]}
      />
    </>
  );
}
