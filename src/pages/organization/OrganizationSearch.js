import { useSearchParams } from 'react-router-dom';
import orgCSS from './OrganizationList.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CallOrganizationSearchAPI } from '../../apis/OrganizationAPICalls';

function OrganizaionSearch (){

    const[ searchParams ] = useSearchParams();
    const search = searchParams.get('search');
    console.log("search : ", search);
    const dispatch = useDispatch();



    useEffect(
        ()=>{
            dispatch(CallOrganizationSearchAPI({search}));
        },[]
    );

    return(
        <div className={ orgCSS.background}>dd</div>
    )
}

export default OrganizaionSearch;