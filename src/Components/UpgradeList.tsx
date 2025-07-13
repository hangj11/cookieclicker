import React from "react";
import UpgradeListItem from "./UpgradeListItem";
import { Upgrades } from "../App";

interface UpgradeListProps {
  upgrades: Upgrades;
}

const UpgradeList: React.FC<UpgradeListProps> = ({ upgrades }) => {
  const ownedUpgrades = Object.values(upgrades).filter((u) => u.level > 0);

  return (
    <div className="upgrade-section">
      <h3>보유 업그레이드</h3>
      {ownedUpgrades.length > 0 ? (
        <ul>
          {ownedUpgrades.map((upgrade) => (
            <li key={upgrade.name}>
              {upgrade.name}: Lv. {upgrade.level}
            </li>
          ))}
        </ul>
      ) : (
        <p>아직 업그레이드가 없습니다.</p>
      )}
    </div>
  );
};

export default UpgradeList;
