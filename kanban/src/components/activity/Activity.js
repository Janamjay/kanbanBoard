import React, { useState, useRef } from "react";
import style from "./Activity.module.css";
import Icons from "../icons/Icons";
import { RxActivityLog } from "react-icons/rx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Activity() {
  const [details, setShowDetails] = useState(false);
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");
  const [savedInput, setSavedInput] = useState("");
  const inputRef = useRef();

  function handleButton() {
    setShowDetails(!details);
  }

  function handleEdit() {
    setEditing(true);
    setInput(savedInput);
  }

  function handleSave() {
    setSavedInput(input);
    setEditing(false);
  }

  function handleCancel() {
    setInput(savedInput);
    setEditing(false);
  }

  return (
    <>
      <div className={style.main}>
        <span className={style.justifyIcon}>
          <Icons icon={<RxActivityLog />} />
        </span>
        <span className={style.disc}>
          <p>Activity</p>
          <button className={style.button} onClick={handleButton}>
            {details ? "Hide Details" : "Show Details"}
          </button>
        </span>
      </div>
      <div className={style.detailsDiv}>
        {details ? (
          <>
            <div className={style.mainActivityBox}>
              <span className={style.activityImage}>
                <img
                  className={style.userImages}
                  alt="user"
                  src=" https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                  width="40px"
                  height="40px"
                />
              </span>
              <span className={style.activityText}>
                <p>Neha Rajbhar</p>
                <p>Time and Date</p>
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={style.comment}>
        <span className={style.justifyImage}>
          <img
            className={style.userImage}
            src=" https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
            alt="user"
            width="50px"
            height="50px"
          />
        </span>
        <span className={style.commentBtn}>
          {editing ? (
            <>
              <span className={style.textEditor} ref={inputRef}>
                <ReactQuill
                  style={{ marginTop: "1rem", backgroundColor: "white" }}
                  value={input}
                  onChange={setInput}
                />
                <div className={style.btns}>
                  <button onClick={handleSave} className={style.save}>
                    Save
                  </button>
                  <button onClick={handleCancel} className={style.cancel}>
                    Cancel
                  </button>
                </div>
              </span>
            </>
          ) : (
            <div>
              <div
                onClick={handleEdit}
                className={style.savedInput}
                dangerouslySetInnerHTML={{ __html: savedInput }}
              />
              {!savedInput && (
                <button
                  className={style.addComment}
                  onClick={() => setEditing(true)}
                >
                  Write a comment....
                </button>
              )}
            </div>
          )}
        </span>
      </div>
    </>
  );
}

export default Activity;