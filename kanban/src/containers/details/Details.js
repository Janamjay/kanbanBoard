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
import { Dialog, DialogContent, Backdrop, Button } from "@mui/material";

import { useRecoilValue } from "recoil";

function Details() {
  const [initialTitle, setInitialTitle] = useState("");

  const [newTitle, setNewTitle] = useState("");

  const [isDialog, setIsDialog] = useRecoilState(dialogBox);
  const { boardId, cardId } = useParams();
  const [showTitle, setShowTitle] = useState(true);
  const [globalListData, setGlobalListData] = useRecoilState(ListData);
  const navigate = useNavigate();

  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    const tempListData = [...globalListData];
    const index = tempListData.findIndex((ele) => ele.id === boardId);
    const currentBoard = tempListData[index];
    if (currentBoard && currentBoard.cards) {
      setCurrentCard(currentBoard.cards.find((card) => card.cardID === cardId));
      setInitialTitle(
        currentBoard.cards.find((card) => card.cardID === cardId)?.cardTitle ||
          ""
      );
    }
  }, [globalListData, boardId, cardId]);

  function handleTitle() {
    setShowTitle(!showTitle);
  }

  function handleClose() {
    setIsDialog(false);
  }

  const allLists = useRecoilValue(ListData);
  const [requiredList] = allLists.filter((item) => item.id === boardId);
  const [requiredCard] =
    requiredList && requiredList.cards
      ? requiredList.cards.filter((card) => card.cardID === cardId)
      : [];

  const handleInput = (event) => {
    setNewTitle(event.target.value);
  };

  const updateTitle = () => {
    const previousData = [...globalListData];

    const updatedData = previousData.map((list, listInd) => {
      if (list.id === boardId) {
        const updatedCards = list.cards.map((card, cardIndex) => {
          if (card.cardID === cardId) {
            return { ...card, cardTitle: newTitle };
          }
          return card;
        });
        return { ...list, cards: updatedCards };
      }
      return list;
    });

    setGlobalListData(updatedData);
    console.log(updatedData);
    localStorage.setItem("board", JSON.stringify(updatedData));
    setShowTitle(!showTitle);
  };

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
          <div className={style.titleWrapper}>
            <div className={style.laptop}>
              <FaLaptop />
            </div>
            <div className={style.title}>
              {showTitle ? (
                <h3>{initialTitle}</h3>
              ) : (
                <span className={style.textArea}>
                  <input
                    key={currentCard && currentCard.cardID}
                    type="text"
                    value={newTitle}
                    onChange={handleInput}
                    style={{ width: "90%", border: "none", height: "30px" }}
                  />
                </span>
              )}
              <div>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#00a82d",
                    color: "white",
                    height: "30px",
                    marginRight: "5px",
                    marginTop: "10px",
                    fontSize: "12px",
                  }}
                  onClick={handleTitle}
                >
                  {showTitle ? "Update Title" : "Cancel"}
                </Button>
                {!showTitle && (
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#00a82d",
                      color: "white",
                      height: "30px",
                      marginTop: "10px",
                      fontSize: "12px",
                    }}
                    onClick={updateTitle}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
            <span className={style.cross}>
              <Icons icon={<RxCross2 onClick={() => navigate("/")} />} />
            </span>
          </div>
          <div>
            <Description />
            <Activity
              cardId={cardId}
              boardId={boardId}
              cardActivityLog={requiredCard.activityLog}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Details;
