import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrgListModal from "./OrgListModal";
import { CallOrganizationListAPI } from "../../../apis/OrganizationAPICalls";


function OrgMainModal({ empCode }) {

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
            <OrgListModal org={org} empCode={empCode}/>
        </div>
    )
}

export default OrgMainModal;
