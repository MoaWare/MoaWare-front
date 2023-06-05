import { getOrganization, getOrganizationDetail, getOrganizationSearch, getOrganizationSub } from "../modules/OrganizationModule";

const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`

/* 조직도 상위부서 검색 */
export const CallOrganizationListAPI = () => {

    const requestURL = `${ PRE_URL}/org/list`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET'
        }).then( res => res.json());

        if ( result.status === 200 ) {

            dispatch(getOrganization(result));
        }
    };

}

/* 조직도 하위 부서 및 직원 검색  */
export const CallOrganizationSubListAPI = ({deptCode}) => {
    const requestURL = `${ PRE_URL}/org/subList/${deptCode}`;
    
    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET',
        }).then( res => res.json());

        if ( result.status === 200) {

            dispatch(getOrganizationSub(result));
        }
    };

}

/* 조직도 검색  */
export const CallOrganizationSearchAPI = ({ search }) => {

    const requestURL = `${ PRE_URL}/org/search?search=${ search }`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET'
        }).then( res => res.json());

        if ( result.status === 200 ) {
            dispatch(getOrganizationSearch(result));
        }
    };

}

/*   */
export const CallOrganizationDetailAPI = ({ empCode }) => {

    const requestURL = `${ PRE_URL}/emp/detail/${empCode}`;

    return async( dispatch, getState ) => {
        
        const result = await fetch( requestURL, {
            method: 'GET'
        }).then( res => res.json());

        if ( result.status === 200 ) {
            dispatch(getOrganizationDetail(result));
        }
    };

}