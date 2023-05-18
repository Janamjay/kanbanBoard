import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";
import Dropdown from "../../components/dropdown/Dropdown";
import cardStyles from "./card.module.css";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ListData } from "../../recoil/atom";

const Card = ({ card, boardId, index }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [globalListData, setGlobalListData] = useRecoilState(ListData);

  function handleClick() {
    setShowDropdown(!showDropdown);
  }

  function handleDeleteTask(cardID) {
    const tempListData = [...globalListData];
    const boardIndex = tempListData.findIndex((board) => board.id === boardId);

    if (boardIndex !== -1) {
      const updatedBoard = {
        ...tempListData[boardIndex],
        cards: tempListData[boardIndex].cards.filter(
          (card) => card.cardID !== cardID
        ),
      };

      tempListData[boardIndex] = updatedBoard;
      setGlobalListData(tempListData);
      localStorage.setItem("board", JSON.stringify(tempListData));
    }
  }

  return (
    <Draggable
      draggableId={card.cardID.toString()}
      index={index}
      dragHandle={card.cardTitle}
    >

      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cardStyles.card_main}
        >
          <div className={cardStyles.card_top}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/${card.cardID}/${card.cardTitle}`}
            >
              <div className={cardStyles.card_title}>{card?.cardTitle}</div>
            </Link>
            <div className={cardStyles.top_more}>
              <FiMoreHorizontal onClick={handleClick} />
              {showDropdown && (
                <Dropdown>
                  <div className={cardStyles.dropdown}>
                    <p>
                      <span onClick={() => handleDeleteTask(card.cardID)}>
                        Delete card
                      </span>
                    </p>
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
          <div className={cardStyles.card_footer}>
            {card?.createdAt && (
              <p>
                <AiOutlineClockCircle /> {card?.createdAt}
              </p>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
