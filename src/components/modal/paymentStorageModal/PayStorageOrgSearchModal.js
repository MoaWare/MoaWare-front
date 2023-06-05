import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CallOrganizationSearchAPI } from '../../../apis/OrganizationAPICalls';
import PayStorageOrgListModal from './PayStorageOrgListModal';
import { payStorageContext } from '../../../pages/payment/PaymentStorageDetail';


function PayStorageOrgSearchModal ({ empCode }){

    const{searchForm, setSearchForm} = useContext(payStorageContext);

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
            {searchOrg&&<PayStorageOrgListModal org={searchOrg} empCode={empCode}/>}
        </div>
    )
}

export default PayStorageOrgSearchModal;