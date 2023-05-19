import React, { useState, useEffect } from "react";
import style from "./Details.module.css";
import { FaLaptop } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Icons from "../../components/icons/Icons";
import Activity from "../../components/activity/Activity";
import Description from "../../components/description/Description";

import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ListData, dialogBox } from "../../recoil/atom";
import { Dialog, DialogContent,Backdrop } from "@mui/material";

import { useRecoilValue } from "recoil";



export default function Details() {
  const [isDialog, setIsDialog] = useRecoilState(dialogBox);
  const { boardId, cardId } = useParams();
  // console.log(boardId,)
  // console.log(cardId)
  let data;
  const [showTitle, setShowTitle] = useState(true);
  const [input, setInput] = useState(data);
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
    data = currentCard;
  }, []);

  function handleTitle() {
    setShowTitle(!showTitle);
  }
  // console.log(tasks.boardName);
  function handleClose(){
    setIsDialog()
  }
  
  // console.log(cardId)

  const allLists=useRecoilValue(ListData)
  const [requiredList]=allLists.filter(item=>item.id==boardId)
  const [requiredCard]=requiredList.cards.filter(card=>card.cardID==cardId)


  function handleInput(e) {
    setInput(e.target.value);

  }
  return (
    <>
      <Backdrop open={isDialog} onClick={handleClose} />
     <Dialog
          open={isDialog}
          PaperProps={{
            sx: {
              maxWidth: "40vw",
              width: 800,
              minHeight: "80vh",
              backgroundColor: "whitesmoke",
              // marginBottom: "3rem",
            },
          }}
          // BackdropComponent={Backdrop}
          // BackdropProps={{ invisible: true }}
        >
           <DialogContent>
     <div className={style.main}>
      <div className={style.windows}>
        <div className={style.textAreaSection}>
          <span className={style.laptop}>
            <Icons icon={<FaLaptop />} />
          </span>
          <span className={style.textArea}>
            {showTitle ? (
              <>
                <p
                  onClick={handleTitle}
                  style={{
                    width: "90%",
                    border: "none",
                    height: "30px",
                    backgroundColor: "white",
                    fontSize: "20px",
                  }}
                >
                  {currentCard.cardTitle}
                </p>
              </>
            ) : (
              <>
                <input
                  key={currentCard.cardID}
                  type="text"
                  value={input}
                  style={{ width: "90%", border: "none", height: "30px" }}
                />
              </>
            )}

            <p className={style.p}>in list {currentBoard.boardName}</p>
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
    </DialogContent>
    </Dialog>
    </>
   
  );
            }

