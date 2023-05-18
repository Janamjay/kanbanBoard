import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { ListData } from "../recoil/atom";
import { useRecoilState } from "recoil";
import BoardBar from "../containers/navbars/BoardBar";
import Board from "../containers/board/Board";
import Editable from "../components/editable/Editable";
import style from "./Home.module.css";

function Home() {
  const [globalListData, setGlobalListData] = useRecoilState(ListData);

  useEffect(() => {
    const storedData = localStorage.getItem("board");
    if (storedData) {
      setGlobalListData(JSON.parse(storedData));
    }
  }, [setGlobalListData]);

  function handleAddList(inputValue) {
    const Id = uuid();
    const board = {
      id: Id,
      boardName: inputValue,
      cards: [],
    };

    setGlobalListData([...globalListData, board]);
    localStorage.setItem("board", JSON.stringify([...globalListData, board]));
  }

  return (
    <>
      <div className={style.mainLayout}>
        <div className={style.image}>
          <BoardBar />
          <div className={style.outer_board}>
            <div className={style.inner_board}>
              {globalListData?.map((item, index) => (
                <Board key={item.id} board={item} />
              ))}
              <Editable text="Add list" placeholder="Enter list title...." onSubmit={handleAddList} />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Home;