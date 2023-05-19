import React, { useState, useEffect } from "react";
import style from "./Details.module.css";
import { FaLaptop } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Icons from "../../components/icons/Icons";
import Activity from "../../components/activity/Activity";
import Description from "../../components/description/Description";
import { useNavigate, useParams} from "react-router";
import { useRecoilValue, useRecoilState } from "recoil";
import { ListData } from "../../recoil/atom";

function Details() {
  const [input, setInput] = useState("hii");
  const navigate = useNavigate();
  const {cardId, boardId}=useParams()
  const [globalListData, setGlobalListData] = useRecoilState(ListData);
  // console.log(cardId)

  
    // const storedData = localStorage.getItem("board");
    // if (storedData) {
    //   setGlobalListData(JSON.parse(storedData));
    // }
 
  // const allLists=useRecoilValue(ListData)

  console.log("Component running")
  const allLists=JSON.parse(localStorage.getItem("board"))

  console.log(allLists)
  const [requiredList]=allLists.filter(item=>item.id==boardId)
  console.log(requiredList)
  const [requiredCard]=requiredList.cards?.filter(card=>card.cardID==cardId)
  console.log(requiredCard)


  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
    <div className={style.main}>
      <div className={style.windows}>
        <div className={style.textAreaSection}>
          <span className={style.laptop}>
            <Icons icon={<FaLaptop />} />
          </span>
          <span className={style.textArea}>
            <input
              type="text"
              value={input}
              onChange={handleInput}
              style={{ width: "90%", border: "none", height: "30px" }}
            />
            <p className={style.p}>in list {input}</p>
          </span>
          <span className={style.cross}>
            <Icons icon={<RxCross2 onClick={() => navigate("/")} />} />
          </span>
        </div>
        <div>
          <Description />
          <Activity cardId={cardId} boardId={boardId} cardActivityLog={requiredCard.activityLog}/>
        </div>
      </div>
    </div>
  );
}
export default Details;