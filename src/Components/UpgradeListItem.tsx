interface UpgradeListItemProps {
  imgSrc: string;
  count: number;
}
export default function UpgradeListItem({
  imgSrc,
  count,
}: UpgradeListItemProps) {
  return (
    <div>
      {[...Array(count)].map((_, index) => (
        <img
          src={imgSrc}
          alt="업그레이드 이미지"
          style={{ maxWidth: "50px" }}
        />
      ))}
    </div>
  );
}
