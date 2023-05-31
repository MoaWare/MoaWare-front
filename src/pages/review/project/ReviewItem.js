import { useSelector } from "react-redux";
import TaskCSS from "../../../form/Task/Task.module.css";
import { getMemberId } from "../../../utils/TokenUtils";
import moment from "moment";


function ReviewItem({review}){



    const date = moment(review.date || review.modifyTime).format("YYYY.MM.DD HH:mm:ss");
    console.log(date);



    return review && 

        (
            <div className={TaskCSS.reviewItem}>
                <div className={TaskCSS.reviewLeft}>
                    <img src={review.emp.fileCategory[0].file.filePath}  alt="profile"/>
                </div>
                <div className={TaskCSS.reviewRight}>
                <div className={TaskCSS.listTop}>
                    <div className={TaskCSS.listName}>
                        {review.emp.empName}
                    </div>
                    <div className={TaskCSS.listDate}>
                        {date}
                    </div>
                    { getMemberId() === review.emp.empID ? 
                        <div className={TaskCSS.listBtn}>
                            <button>수정</button>
                            <button>삭제</button> 
                        </div>
                    : null}
                </div>
                <div className={TaskCSS.listLow}>
                    {review.content} 
                </div>
                </div>
            </div>
      );
}

export default ReviewItem;