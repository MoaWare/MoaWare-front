import CSS from "./BoardPostModal.module.css";

function BoardPostModal({ boardPost, setboardPostModal }) {
  const onClickHandler = () => {
    setboardPostModal(false);
  };
  return (
    <div className={CSS.modal}>
      <div className={CSS.modalContainer}>
        <div className={CSS.productReviewModalDiv}>
          <h1>글 작성</h1>
          <input
            type="text"
            name="boardPostCategory"
            readOnly={true}
            value={boardPost.boardPostCategory}
          />
          <input
            type="text"
            name="boardPostTitle"
            readOnly={true}
            value={boardPost.boardPostTitle}
          />
          <input
            type="text"
            name="boardPostCreateDate"
            readOnly={true}
            value={boardPost.boardPostCreateDate}
          />
          <textarea
            placeholder="게시글 본문"
            name="boardPostContent"
            readOnly={true}
            value={boardPost.boardPostContent}
          ></textarea>
          <button
            style={{
              border: "none",
              margin: 0,
              fontSize: "10px",
              height: "10px",
            }}
            onClick={onClickHandler}
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardPostModal;
