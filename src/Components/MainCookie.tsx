import React, { useState } from "react";

interface MainCookieProps {
  cookies: number;
  cps: number;
  cpc: number;
  handleClick: () => void;
}

const MainCookie: React.FC<MainCookieProps> = ({
  cookies,
  cps,
  cpc,
  handleClick,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseDown = () => {
    setIsClicked(true);
    handleClick();
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  return (
    <div className="main-cookie-section">
      <h2>{Math.floor(cookies).toLocaleString()} cookies</h2>
      <p>
        per second: {cps.toLocaleString()} / per click: {cpc.toLocaleString()}
      </p>
      <button
        className={`cookie-button ${isClicked ? "clicked" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // 버튼 밖으로 마우스가 나가도 효과 해제
      >
        🍪
      </button>
    </div>
  );
};

export default MainCookie;
