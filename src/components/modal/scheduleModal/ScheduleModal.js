import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callScheduleListAPI } from "../../../apis/ScheduleAPICalls";
import SchModalCSS from './ScheduleModal.module.css';

function ScheduleModal() {

    const { sch } = useSelector( (state) => state.scheduleReducer);
    const dispatch = useDispatch();

    useEffect (
        () => {
            dispatch(callScheduleListAPI());
        },
        []
    );

    return (
        <div className={SchModalCSS.wrapper}>
            <div>모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당</div>
            <div>모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당</div>
            <div>모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당</div>
            <div>모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당</div>
            <div>모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당</div>
            <div>모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당</div>
            <div>모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당모달입니당</div>
        </div>
    );

}

export default ScheduleModal;