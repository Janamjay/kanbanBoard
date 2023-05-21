import React from "react";
import style from "./BoardBar.module.css";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
function BoardBar(props) {
  const navigate = useNavigate();

  function handleClear(){
    console.log("first");
    localStorage.removeItem("board")
    console.log("second");
  }

  return (
    <div className={style.navbar}>
      <div className={style.name}>
        Home Management
        <span className={style.icon}>
          <AiOutlineStar />
        </span>
        <span>
          <button className={style.backGbtn} onClick={props.changeImg}>
            Change Background
          </button>
        </span>
      </div>
      <div className={style.button}>
        <img
          className={style.userImage}
          src=" https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
          alt="user"
          width="50px"
          height="50px"
        />
        <button onClick={handleClear} className={style.share}>
          {/* <AiOutlineUserAdd className={style.user} /> */}
          Clear Board
        </button>
      </div>
    </div>
  );
}

export default BoardBar;
