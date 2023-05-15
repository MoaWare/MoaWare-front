import { getOrganization, getOrganizationSub } from "../modules/OrganizationModule";

const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/org`

/* 조직도 상위부서 검색 */
export const CallOrganizationListAPI = () => {

    const requestURL = `${ PRE_URL}/list`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET'
        }).then( res => res.json());

        console.log( result);
        if ( result.status === 200 ) {
            console.log ("[OrganizationAPICalls] CallOrganizationListAPI result : ", result);
            dispatch(getOrganization(result));
        }
    };

}

/* 조직도 하위 부서 및 직원 검색  */
export const CallOrganizationSubListAPI = ({deptCode}) => {
    console.log("deptCode  : " , deptCode);
    const requestURL = `${ PRE_URL}/subList/${deptCode}`;
    
    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
        }).then( res => res.json());

        console.log( result);
        if ( result.status === 200) {
            console.log ("[OrganizationAPICalls] CallOrganizationListAPI result : ", result);
    
            dispatch(getOrganizationSub(result));
        }
    };

}

/* 조직도 검색  */
export const CallOrganizationSearchAPI = ({ search }) => {

    const requestURL = `${ PRE_URL}/search?search=${ search }`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET'
        }).then( res => res.json());

        console.log( result);
        if ( result.status === 200 ) {
            console.log ("[OrganizationAPICalls] CallOrganizationSearchAPI result : ", result);
           
        }
    };

}