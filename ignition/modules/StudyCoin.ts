import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const StudyCoinModule = buildModule("StudyCoinModule", (m) => {

  const StudyCoin = m.contract("StudyCoin");

  return { StudyCoin };
});

export default StudyCoinModule;
