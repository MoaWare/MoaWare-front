import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callBoardPostListAPI } from "../../../src/apis/BoardPostAPICall";
import { useParams, useSearchParams } from "react-router-dom";

import BoardPostListCSS from "./BoardPostList.module.css";
function BoardPostList() {

    const dispatch = useDispatch();



    return (
        <>

            <div className={BoardPostListCSS.BoardPostListDiv}>



            </div>








        </>














    );



}

export default BoardPostList;

