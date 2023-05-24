import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CallOrganizationSearchAPI } from '../../../apis/OrganizationAPICalls';
import OrgListModal from './OrgListModal';
import { orgContext } from './PaymentModal';

function OrgSearchModal (){

    const{searchForm, setSearchForm} = useContext(orgContext);

    const search = searchForm.search;
    console.log("OrgSearchModal search : ", searchForm.search);
    const dispatch = useDispatch();
    const { searchOrg } = useSelector( (state) => state.organizationReducer);

    console.log("searchOrg : ", searchOrg);

    useEffect(
        ()=>{
            dispatch(CallOrganizationSearchAPI({search}));
        },[search]
    );

    return(
        <div>
            {searchOrg&&<OrgListModal org={searchOrg} />}
        </div>
    )
}

export default OrgSearchModal;