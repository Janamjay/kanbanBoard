import React, { useEffect } from "react";
import style from "./Home.module.css";
import BoardBar from "../containers/navbars/BoardBar";
import Board from "../containers/board/Board";
import Editable from "../components/editable/Editable";
import { Outlet } from "react-router-dom";
import { ListData } from "../recoil/atom";
import { useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";

function Home() {
  const [globalListData, setGlobalListData] = useRecoilState(ListData);
  useEffect(() => {
    const storedData = localStorage.getItem("board");
    if (storedData) {
      setGlobalListData(JSON.parse(storedData));
    }
  }, [setGlobalListData]);
  function handleAddList(inputValue) {
    let Id = uuid();

    const board = {
      id: Id,
      boardName: inputValue,
      cards: [],
    };

    setGlobalListData([...globalListData, board]);
    localStorage.setItem("board", JSON.stringify([...globalListData, board]));
    // console.log(globalListData);
  }
  function onDragEnd(result) {
    // console.log(result)
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const [sourceBoard] = globalListData.filter(
        (elem) => elem.id === source.droppableId
      );
      const [destinationBoard] = globalListData.filter(
        (elem) => elem.id === destination.droppableId
      );
      // console.log(sourceBoard)
      // console.log(destinationBoard)
      const sourceCard = [...sourceBoard.cards];
      const destinationCard = [...destinationBoard.cards];

      const [removedCard] = sourceCard.splice(source.index, 1);
      destinationCard.splice(destination.index, 0, removedCard);
      // console.log(sourceCard)
      // console.log(destinationCard)

      const updatedCards = globalListData.map((elem) => {
        if (elem.id === source.droppableId) {
          return { ...elem, cards:sourceCard};
        }
        else if (elem.id === destination.droppableId) {
          return { ...elem, cards:destinationCard};
        }
        return elem;
        
      });

      setGlobalListData(updatedCards)
      localStorage.setItem("board", JSON.stringify(updatedCards));
    }
    else{
      const [sourceBoard] = globalListData.filter(
        (elem) => elem.id === source.droppableId
      );
      const sourceCard = [...sourceBoard.cards];

      const [removedCard] = sourceCard.splice(source.index, 1);
      sourceCard.splice(destination.index, 0, removedCard);

      const updatedCards = globalListData.map((elem) => {
        if (elem.id === source.droppableId) {
          return { ...elem, cards:sourceCard};
        }
        return elem;
      })
      setGlobalListData(updatedCards)
      localStorage.setItem("board", JSON.stringify(updatedCards));
    }
  }

  return (
    <>
      <div className={style.mainLayout}>
        <div className={style.image}>
          <BoardBar />
          <div className={style.outer_board}>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
              <div className={style.inner_board}>
                {globalListData?.map((item, index) => (
                  <Board index={index} key={item.id} board={item} />
                ))}
                <Editable
                  text="Add list"
                  placeholder="Enter list title...."
                  onSubmit={handleAddList}
                />
              </div>
            </DragDropContext>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Home;
