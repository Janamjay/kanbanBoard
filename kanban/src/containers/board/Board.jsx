import React, { useState } from "react";
import board from "./Board.module.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Card from "../card/Card";
import Editable from "../../components/editable/Editable";
import Dropdown from "../../components/dropdown/Dropdown";
import { v4 as uuid } from "uuid";
import { ListData } from "../../recoil/atom";
import { useRecoilState } from "recoil";

const Board = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [listTitle, setListTitle] = useState(props.board?.boardName);
  const [globalListData, setGlobalListData] = useRecoilState(ListData);

  function handleEditTitle() {
    setEditMode(true);
  }

  function handleSaveTitle(id) {
    let tempListData = [...globalListData];
    let index = tempListData.findIndex((ele) => ele.id === id);
    let currentBoard = { ...tempListData[index] };
    currentBoard.boardName = listTitle;
    tempListData[index] = currentBoard;
    setGlobalListData(tempListData);
    localStorage.setItem("board", JSON.stringify(tempListData));
    setEditMode(false);
  }

  function handleChangeTitle(event) {
    setListTitle(event.target.value);
  }

  function handleClick() {
    setShowDropdown(!showDropdown);
  }

  function handleDeleteBoard(id) {
    let tempListData = [...globalListData];
    tempListData = tempListData.filter((ele) => ele.id !== id);
    setGlobalListData(tempListData);
    localStorage.setItem("board", JSON.stringify(tempListData));
  }

  function handleAddTask(inputValue) {
    const currentDate = new Date();
    const formatDate = currentDate.getDate();
    const formatMonth = currentDate.toLocaleString("default", {
      month: "short",
    });
    const newCard = {
      cardID: uuid(),
      discription: "",
      cardTitle: inputValue,
      createdAt: `${formatDate} ${formatMonth}`,
    };
    let tempListData = [...globalListData];
    let index = tempListData.findIndex((ele) => ele.id === props.board.id);
    let temporaryBoard = {
      id: props.board.id,
      boardName: props.board.boardName,
      cards: [...props.board.cards, newCard],
    };
    tempListData[index] = temporaryBoard;
    setGlobalListData(tempListData);
    localStorage.setItem("board", JSON.stringify(tempListData));
  }

  function handleDeleteTask(cardID, cardArray) {
    const tempListData = [...globalListData];
    const boardIndex = tempListData.findIndex(
      (board) => board.id === props.board.id
    );

    if (boardIndex !== -1) {
      const updatedCards = cardArray.filter((card) => card.cardID !== cardID);

      tempListData[boardIndex] = {
        ...tempListData[boardIndex],
        cards: updatedCards,
      };

      setGlobalListData(tempListData);
      localStorage.setItem("board", JSON.stringify(tempListData));
    }
  }

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const tempListData = [...globalListData];
    const boardIndex = tempListData.findIndex(
      (board) => board.id === props.board.id
    );
    const board = tempListData[boardIndex];

    const updatedCards = Array.from(board.cards);
    const [removedCard] = updatedCards.splice(source.index, 1);
    updatedCards.splice(destination.index, 0, removedCard);

    tempListData[boardIndex] = {
      ...board,
      cards: updatedCards,
    };

    setGlobalListData(tempListData);
    localStorage.setItem("board", JSON.stringify(tempListData));
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={board.main_board}>
        <div className={board.board_top}>
          {editMode ? (
            <input
              className={board.input}
              autoFocus
              type="text"
              defaultValue={props.board.boardName}
              value={listTitle}
              onChange={handleChangeTitle}
              onBlur={() => handleSaveTitle(props.board.id)}
            />
          ) : (
            <p className={board.board_top_tittle} onClick={handleEditTitle}>
              {props.board?.boardName}
            </p>
          )}
          <div className={board.top_more}>
            <FiMoreHorizontal onClick={handleClick} />
            {showDropdown && (
              <Dropdown>
                <div className={board.dropdown}>
                  <p>
                    <span onClick={() => handleDeleteBoard(props.board.id)}>
                      Delete
                    </span>
                  </p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <Droppable droppableId={props.board.id}>
          {(provided) => (
            <div
              className={`${board.board_cards}  ${board.custom_scroll}`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {props.board?.cards?.map((item, index) => (
                <Card
                  key={item.cardID}
                  card={item}
                  boardId={props.board.id}
                  index={index}
                  handleDeleteTask={handleDeleteTask}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Editable
          text="Add a card"
          placeholder="Enter a title for this card...."
          onSubmit={handleAddTask}
        />
      </div>
    </DragDropContext>
  );
};

export default Board;
