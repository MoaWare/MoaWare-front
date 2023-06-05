import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CallOrganizationSearchAPI } from '../../apis/OrganizationAPICalls';
import OrganizaionList from './OrganizationList';

function OrganizationSearch (){

    const[ searchParams ] = useSearchParams();
    const search = searchParams.get('search');
    const dispatch = useDispatch();
    const { searchOrg } = useSelector( (state) => state.organizationReducer);
    const [isSearch, setIsSearch] = useState(true);


    useEffect(
        ()=>{
            dispatch(CallOrganizationSearchAPI({search}));
        },[search]
    );

    return(
        <div>
            {searchOrg&&<OrganizaionList org={searchOrg} isSearch={isSearch}/>}
        </div>
    )
}

export default OrganizationSearch;