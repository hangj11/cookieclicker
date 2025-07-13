import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import MainCookie from "./Components/MainCookie";
import UpgradeList from "./Components/UpgradeList";
import UpgradeShop from "./Components/UpgradeShop";

// 업그레이드 아이템의 타입 정의
export interface UpgradeItem {
  name: string;
  initialCost: number;
  level: number;
  costMultiplier: number;
  cpsIncrease: number; // 이 업그레이드가 레벨당 제공하는 CPS
}

// 업그레이드 전체 상태의 타입 정의
export interface Upgrades {
  [key: string]: UpgradeItem;
}

// 초기 업그레이드 데이터
const initialUpgrades: Upgrades = {
  gb: {
    name: "진저브레드",
    initialCost: 100,
    level: 0,
    costMultiplier: 1.2,
    cpsIncrease: 10,
  },
  bakery: {
    name: "빵집",
    initialCost: 200,
    level: 0,
    costMultiplier: 1.3,
    cpsIncrease: 20,
  },
  factory: {
    name: "공장",
    initialCost: 500,
    level: 0,
    costMultiplier: 1.4,
    cpsIncrease: 50,
  },
  "cookie-tree": {
    name: "쿠키나무",
    initialCost: 1000,
    level: 0,
    costMultiplier: 1.5,
    cpsIncrease: 100,
  },
};

function App() {
  const [cookies, setCookies] = useState(0);
  const [cpc, setCpc] = useState(10); // 클릭당 쿠키 생산량 1 -> 10으로 변경
  const [upgrades, setUpgrades] = useState<Upgrades>(initialUpgrades);

  // 모든 업그레이드의 CPS를 합산하여 총 CPS 계산
  const cps = Object.values(upgrades).reduce(
    (total, upgrade) => total + upgrade.level * upgrade.cpsIncrease,
    0,
  );

  // 1. 쿠키 클릭 핸들러
  const handleClick = useCallback(() => {
    setCookies((prevCookies) => prevCookies + cpc);
  }, [cpc]);

  // 5. CPS에 따라 1초마다 쿠키 자동 생산
  useEffect(() => {
    const timer = setInterval(() => {
      setCookies((prevCookies) => prevCookies + cps);
    }, 1000);

    return () => clearInterval(timer);
  }, [cps]);

  // 4. 업그레이드 비용 계산 함수 (단일)
  const calculateCost = (item: UpgradeItem) => {
    return Math.floor(
      item.initialCost * Math.pow(item.costMultiplier, item.level),
    );
  };

  // ★ 신규: 여러 개 구매 시 총 비용 계산 함수
  const calculateBulkCost = (item: UpgradeItem, quantity: number) => {
    const r = item.costMultiplier;
    const n = item.level;
    const c0 = item.initialCost;
    if (r === 1) return c0 * quantity;
    const totalCost =
      (c0 * Math.pow(r, n) * (Math.pow(r, quantity) - 1)) / (r - 1);
    return Math.floor(totalCost);
  };

  // ★ 신규: 현재 쿠키로 구매 가능한 최대 개수 계산 함수
  const calculateMaxAffordable = (
    currentCookies: number,
    item: UpgradeItem,
  ) => {
    const costOfOne = calculateCost(item);
    if (currentCookies < costOfOne) return 0;

    const r = item.costMultiplier;
    const n = item.level;
    const c0 = item.initialCost;
    if (r === 1) return Math.floor(currentCookies / c0);

    const affordableQuantity = Math.floor(
      Math.log((currentCookies * (r - 1)) / (c0 * Math.pow(r, n)) + 1) /
        Math.log(r),
    );
    return affordableQuantity > 0 ? affordableQuantity : 0;
  };

  // 3. 아이템 구매 및 업그레이드 핸들러 (단일)
  const handleUpgrade = useCallback(
    (upgradeKey: string) => {
      const upgradeItem = upgrades[upgradeKey];
      const cost = calculateCost(upgradeItem);

      if (cookies >= cost) {
        // 쿠키 차감
        setCookies((prev) => prev - cost);
        // 해당 아이템 레벨업
        setUpgrades((prevUpgrades) => ({
          ...prevUpgrades,
          [upgradeKey]: {
            ...prevUpgrades[upgradeKey],
            level: prevUpgrades[upgradeKey].level + 1,
          },
        }));
      } else {
        alert("쿠키가 부족합니다!");
      }
    },
    [cookies, upgrades],
  );

  // ★ 신규: 최대 개수 구매 핸들러
  const handleBuyMax = useCallback(
    (upgradeKey: string) => {
      const upgradeItem = upgrades[upgradeKey];
      const quantity = calculateMaxAffordable(cookies, upgradeItem);

      if (quantity > 0) {
        const totalCost = calculateBulkCost(upgradeItem, quantity);
        if (cookies >= totalCost) {
          setCookies((prev) => prev - totalCost);
          setUpgrades((prevUpgrades) => ({
            ...prevUpgrades,
            [upgradeKey]: {
              ...prevUpgrades[upgradeKey],
              level: prevUpgrades[upgradeKey].level + quantity,
            },
          }));
        }
      }
    },
    [cookies, upgrades],
  );

  return (
    <main className="container">
      <h1>쿠키 클리커</h1>
      <MainCookie
        cookies={cookies}
        cps={cps}
        cpc={cpc}
        handleClick={handleClick}
      />
      <UpgradeList upgrades={upgrades} />
      <UpgradeShop
        cookies={cookies}
        upgrades={upgrades}
        handleUpgrade={handleUpgrade}
        calculateCost={calculateCost}
        // ★ 신규 props 전달
        calculateMaxAffordable={calculateMaxAffordable}
        handleBuyMax={handleBuyMax}
      />
    </main>
  );
}

export default App;
