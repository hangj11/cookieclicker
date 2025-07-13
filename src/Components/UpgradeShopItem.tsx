interface UpgradeShopItemProps {
  name: string;
  price: number;
  canBuy: boolean;
  handleClick: () => void;
}
// 얘가 만약에 현재 Cookie를 받으면, 너무 많은 데이터가 들어감
// disabled 라는 flag
export default function UpgradeShopItem({
  name,
  price,
  handleClick,
  canBuy,
}: UpgradeShopItemProps) {
  return (
    <div>
      <button
        className={canBuy ? "primary outline" : "secondary"}
        onClick={canBuy ? handleClick : undefined}
      >
        {name}
      </button>
      <p></p>
      <p>
        <div>
          <kbd>Price</kbd> {price}
        </div>
      </p>
    </div>
  );
}
