import { getWorklist } from "../modules/WorkModule";

const RESTAPI_SERVER_IP = `${ process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${ process.env.REACT_APP_RESTAPI_SERVER_PORT}`
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`

export const callWorkMyListAPI = ({ workDate, currenPage = 1 }) => {

    const requestURL = `${PRE_URL}/work/works/${workDate}?page=${currenPage}`;
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[WorkAPICalls] callWorkMyListAPI result : ", result);
            dispatch(getWorklist(result))
        }

    }
}