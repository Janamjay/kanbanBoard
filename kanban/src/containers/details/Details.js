import React, { useState, useEffect } from "react";
import style from "./Details.module.css";
import { FaLaptop } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Icons from "../../components/icons/Icons";
import Activity from "../../components/activity/Activity";
import Description from "../../components/description/Description";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ListData, dialogBox } from "../../recoil/atom";
import { Dialog, DialogContent, Backdrop } from "@mui/material";

export default function Details() {
  const [isDialog, setIsDialog] = useRecoilState(dialogBox);
  const { boardId, cardId } = useParams();
  let data;
  const [showTitle, setShowTitle] = useState(true);
  const [input, setInput] = useState(data);
  const [globalListData, setGlobalListData] = useRecoilState(ListData);
  const navigate = useNavigate();

  const [selectedTask, setSelectedTask] = useState(null);
  const [currentBoard, setCurrentBoard] = useState("");
  const [currentCard, setCurrentCard] = useState("");

  const handleCardClick = (task) => {
    setSelectedTask(task);
  };
  useEffect(() => {
    const storedData = localStorage.getItem("board");
    if (storedData) {
      setGlobalListData(JSON.parse(storedData));
    }
  }, [setGlobalListData]);

  useEffect(() => {
    let tempListData = [...globalListData];
    let index = tempListData.findIndex((ele) => ele.id === boardId);
    let currentBoard = { ...tempListData[index] };
    setCurrentBoard(currentBoard);
    
    let tempBoard = { ...currentBoard };
    let tempCardData = tempBoard.cards || [];
    let cardIndex = tempCardData.findIndex((ele) => ele.cardID === cardId);
    let currentCard = { ...tempCardData[cardIndex] };
    setCurrentCard(currentCard);
    data = currentCard;
  }, []);
  console.log(currentBoard.boardName);
  console.log(currentCard.cardTitle);
  function handleTitle() {
    setShowTitle(!showTitle);
  }

  function handleClose() {
    setIsDialog(false);
  }

  const allLists = useRecoilValue(ListData);
  const requiredList = allLists.find((item) => item.id === boardId);
  const requiredCard = requiredList?.cards.find(
    (card) => card.cardID === cardId
  );
  const cardActivityLog = requiredCard?.activityLog || [];

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
          },
        }}
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
                        onChange={handleInput}
                        style={{
                          width: "90%",
                          border: "none",
                          height: "30px",
                        }}
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
                <Activity
                  cardId={cardId}
                  boardId={boardId}
                  cardActivityLog={cardActivityLog}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
