import TaskCSS from "../../../form/Task/Task.module.css";


function ReviewItem(){
    return (
    <div className={TaskCSS.reviewItem}>
        <div className={TaskCSS.reviewLeft}>

        </div>
        <div className={TaskCSS.reviewRight}>
          <div className={TaskCSS.listTop}>
            <div className={TaskCSS.listName}>

            </div>
            <div className={TaskCSS.listDate}>

            </div>
            <div className={TaskCSS.listBtn}>
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
          <div className={TaskCSS.listLow}>
            
          </div>
        </div>
      </div>
      );
}

export default ReviewItem;