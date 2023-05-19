import React from "react";
import style from "./BoardBar.module.css";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button } from "@mui/material";
import { BsFillImageFill } from "react-icons/bs";
function BoardBar(props) {
  const navigate = useNavigate();
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

      {/* <Button 
               //onClick={handleImage}
               onClick={()=>{navigate('/template')}} 
              variant='contained' 
              id={style.whiteBtn} 
              startIcon={<AddPhotoAlternateIcon />}> Change Background</Button>
      </span> */}
      <div className={style.button}>
        <img
          className={style.userImage}
          src=" https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
          alt="user"
          width="50px"
          height="50px"
        />
        <button className={style.share}>
          <AiOutlineUserAdd className={style.user} />
          Share
        </button>
      </div>
    </div>
  );
}

export default BoardBar;
