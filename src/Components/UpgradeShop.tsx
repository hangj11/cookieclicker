import React from "react";
import { Upgrades, UpgradeItem } from "../App";

// ★ props 타입 업데이트
interface UpgradeShopProps {
  cookies: number;
  upgrades: Upgrades;
  handleUpgrade: (upgradeKey: string) => void;
  calculateCost: (item: UpgradeItem) => number;
  calculateMaxAffordable: (cookies: number, item: UpgradeItem) => number;
  handleBuyMax: (upgradeKey: string) => void;
}

const UpgradeShop: React.FC<UpgradeShopProps> = ({
  cookies,
  upgrades,
  handleUpgrade,
  calculateCost,
  calculateMaxAffordable,
  handleBuyMax,
}) => {
  return (
    <div className="upgrade-section">
      <h3>상점</h3>
      <div className="shop-items">
        {Object.entries(upgrades).map(([key, item]) => {
          const cost = calculateCost(item);
          const canAfford = cookies >= cost;
          // ★ 구매 가능한 최대 개수 계산
          const maxAffordable = calculateMaxAffordable(cookies, item);

          return (
            // ★ 각 아이템을 div로 감싸서 구조 개선
            <div key={key} className="shop-item-container">
              <div className="shop-item-info">
                <h4>{item.name}</h4>
                <p>Level: {item.level}</p>
                <p>비용: {cost.toLocaleString()}</p>
                <p>+ {item.cpsIncrease} CPS</p>
                {/* ★ 구매 가능 개수 표시 */}
                {maxAffordable > 0 && (
                  <p className="can-buy-text">
                    최대 {maxAffordable.toLocaleString()}개 구매 가능
                  </p>
                )}
              </div>
              <div className="shop-item-buttons">
                <button
                  onClick={() => handleUpgrade(key)}
                  disabled={!canAfford}
                >
                  1개 구매
                </button>
                {/* ★ 최대 구매 버튼 추가 */}
                <button
                  onClick={() => handleBuyMax(key)}
                  disabled={maxAffordable === 0}
                >
                  최대 구매
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradeShop;
