import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrgList from "./OrgListModal";
import { CallOrganizationListAPI } from "../../../apis/OrganizationAPICalls";


function OrgMainModal({setFocusEmp}) {

    const { org } = useSelector( (state) => state.organizationReducer);
    const dispatch = useDispatch();

    useEffect(
        ()=>{
            dispatch(CallOrganizationListAPI());

        },
        []
    );



    return (
        <div >
            <OrgList org={org} setFocusEmp={setFocusEmp}/>
        </div>
    )
}

export default OrgMainModal;
