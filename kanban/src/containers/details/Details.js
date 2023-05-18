import React, { useState, useEffect } from "react";
import style from "./Details.module.css";
import { FaLaptop } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Icons from "../../components/icons/Icons";
import Activity from "../../components/activity/Activity";
import Description from "../../components/description/Description";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ListData } from "../../recoil/atom";

function Details() {
  const { boardId, cardId } = useParams();
  // console.log(boardId,)
  // console.log(cardId)
  // const [input, setInput] = useState("hii");
  // const = useRecoilValue(ListData);
  const [globalListData, setGlobalListData] = useRecoilState(ListData);
  const navigate = useNavigate();

  const [selectedTask, setSelectedTask] = useState(null);
  const [currentBoard, setCurrentBoard] = useState("");
  const [currentCard, setCurrentCard] = useState("");

  const handleCardClick = (task) => {
    setSelectedTask(task);
  };
  useEffect(() => {
    let tempListData = [...globalListData];
    let index = tempListData.findIndex((ele) => ele.id === boardId);
    let currentBoard = { ...tempListData[index] };
    // currentBoard.boardName = listTitle;
    setCurrentBoard(currentBoard);

    let tempBoard = { ...currentBoard };
    let tempCardData = [...tempBoard.cards];
    let cardIndex = tempCardData.findIndex((ele) => ele.cardID === cardId);
    // console.log(cardIndex);
    let currentCard = { ...tempCardData[cardIndex] };
    // console.log("bOARD",currentBoard);
    // console.log("CARD",currentCard)
    setCurrentCard(currentCard);
  }, []);

  // console.log(tasks.boardName);
  return (
    <div className={style.main}>
      <div className={style.windows}>
        <div className={style.textAreaSection}>
          <span className={style.laptop}>
            <Icons icon={<FaLaptop />} />
          </span>
          <span className={style.textArea}>
            <p>{currentBoard.boardName}</p>
            <p>{currentCard.cardTitle}</p>
            {/* {tasks.map((task) => (
             <div key={task.cards} onClick={() => handleCardClick(task)}>
             {task.cards.map((card) => {
               return (
                 <input
                   key={card.cardID}
                   type="text"
                   value={
                     selectedTask && selectedTask.cardID === card.cardID
                       ? selectedTask.cardTitle
                       : card.cardTitle
                   }
                   style={{ width: "90%", border: "none", height: "30px" }}
                 />
               );
             })}

                <p className={style.p}>in list {task.boardName}</p>
              </div>
            ))} */}
          </span>
          <span className={style.cross}>
            <Icons icon={<RxCross2 onClick={() => navigate("/")} />} />
          </span>
        </div>
        <div>
          <Description />
          <Activity />
        </div>
      </div>
    </div>
  );
}
export default Details;
