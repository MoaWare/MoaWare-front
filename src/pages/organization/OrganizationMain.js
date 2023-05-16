import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrganizaionList from "./OrganizationList";
import { CallOrganizationListAPI } from "../../apis/OrganizationAPICalls";


function OrganizationMain() {

    const { org } = useSelector( (state) => state.organizationReducer);
    const dispatch = useDispatch();
    const [isSearch, setIsSearch] = useState();

    useEffect(
        ()=>{
            dispatch(CallOrganizationListAPI());
            setIsSearch(false);
        
        },
        []
    );



    return (
        <div >
            <OrganizaionList org={org} isSearch={isSearch}/>
        </div>
    )
}

export default OrganizationMain;
