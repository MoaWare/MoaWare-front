import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PayStorageOrgListModal from "./PayStorageOrgListModal";
import { CallOrganizationListAPI } from "../../../apis/OrganizationAPICalls";


function PayStorageOrgMainModal({ empCode }) {

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
            <PayStorageOrgListModal org={org} empCode={empCode}/>
        </div>
    )
}

export default PayStorageOrgMainModal;
