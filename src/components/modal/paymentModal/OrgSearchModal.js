import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CallOrganizationSearchAPI } from '../../../apis/OrganizationAPICalls';
import OrgListModal from './OrgListModal';
import { orgContext } from '../../../pages/payment/Payment';


function OrgSearchModal ({ empCode }){

    const{searchForm, setSearchForm} = useContext(orgContext);

    const search = searchForm.search;
    const dispatch = useDispatch();
    const { searchOrg } = useSelector( (state) => state.organizationReducer);

    useEffect(
        ()=>{
            dispatch(CallOrganizationSearchAPI({search}));
        },[search]
    );

    return(
        <div>
            {searchOrg&&<OrgListModal org={searchOrg} empCode={empCode}/>}
        </div>
    )
}

export default OrgSearchModal;