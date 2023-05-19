import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import BoardBar from "../containers/navbars/BoardBar";
import Board from "../containers/board/Board";
import Editable from "../components/editable/Editable";
import { Outlet } from "react-router-dom";
import { ListData } from "../recoil/atom";
import { useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";



const data = [
  {
    image:
    "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/33b3ef2cfb29119c7974dcbab0a6cd47/photo-1683125554888-33d34e38ddea.jpg"
  },
  {
    image:
      "https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-thumb.jpg",
  },
  {
    image:
      "https://c4.wallpaperflare.com/wallpaper/878/401/154/sunrise-lake-artwork-gradient-vectors-landscape-wallpaper-thumb.jpg",
  },
  {
    image:
      "https://r4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-08165d58e0100cf8e0ec214e88e2e4aa.jpg",
  },
  {
    image:
      "https://c4.wallpaperflare.com/wallpaper/291/819/697/illustration-city-anime-painting-wallpaper-thumb.jpg",
  },
  {
    image:
      "https://c4.wallpaperflare.com/wallpaper/952/536/1006/winter-4k-pc-desktop-wallpaper-thumb.jpg",
  },
  {
    image:
      "https://r4.wallpaperflare.com/wallpaper/444/19/627/sunrise-annapurna-massif-himalayas-minimal-wallpaper-28d62d6860d03c28a04c618e3892b4ba.jpg",
  },
  {
    image:
      "https://r4.wallpaperflare.com/wallpaper/860/945/126/romantic-couple-4k-pics-ultra-hd-wallpaper-2bf62c5d53e1fff945142b096d3cac10.jpg",
  },
];

function Home() {
  const [globalListData, setGlobalListData] = useRecoilState(ListData);
  const [img, setImg] = useState(0);
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


  function changeImg() {
   
    setImg(img + 1);
    if (img === data.length - 1) {
      setImg(0);
    }
   
  }
  
  return (
    <>
      <div className={style.mainLayout}
      
      >
        <div className={style.image} 
         style={{
          backgroundImage: `url(${data[img].image})`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "3s",
        }}
        >
          <BoardBar changeImg={changeImg}  />
          <div className={style.outer_board}>
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
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Home;
