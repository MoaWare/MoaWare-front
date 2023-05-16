import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CallOrganizationListAPI, CallOrganizationSubListAPI } from "../../apis/OrganizationAPICalls";
import orgCSS from './OrganizationList.module.css';
import { useEffect } from "react";

function OrganizaionSubList ({deptCode, isOpen, setIsOpen}) {

    console.log("deptCode : ", deptCode);
    const dispatch = useDispatch();
    const { subOrg } = useSelector( (state) => (state.organizationReducer));
    console.log("subOrg : ", subOrg);
    

    const onClickImgHandler = (e) => {
        console.log([e.target.getAttribute("name")]);

        if(isOpen[e.target.getAttribute("name")]) {
            setIsOpen({
                ...isOpen,
                [e.target.getAttribute("name")] : false
            })
            
        } else {
            setIsOpen({
                ...isOpen,
                [e.target.getAttribute("name")] : true
            })
            
        }
    }

    useEffect(
        ()=>{
            dispatch(CallOrganizationSubListAPI({deptCode}));
        
        },
        [deptCode]
    );
        console.log("ddd : ", deptCode );
    return (
        <>
        {
            subOrg && subOrg.map( sub => ( 
                sub.refDeptCode === deptCode ?
              
                <div key={sub.deptCode}>
               
                    <div className={ orgCSS.orgRefDeptBox} name={sub.deptCode}  onClick={ onClickImgHandler } key={sub.deptCode}>
                        { isOpen[sub.deptCode] && isOpen[sub.deptCode] ? 
                            (<><img src="./icon/Down.png" className={ orgCSS.directionImg} alt='Down' name={sub.deptCode}/>
                            <img src="./icon/OpenFolder.png" className={ orgCSS.folderImg} alt='folder' name={sub.deptCode}/></> )
                            :
                            (<><img src="./icon/Up.png" className={ orgCSS.directionImg} alt='Up' name={sub.deptCode}/>
                            <img src="./icon/CloseFolder.png" className={ orgCSS.folderImg} alt='folder' name={sub.deptCode}/></> )
                        }
                        <div className={ orgCSS.orgText} name={sub.deptCode}> {sub.deptName} </div>
                    </div>
                    { isOpen[sub.deptCode]  && isOpen[sub.deptCode] ? 
                        sub.orgEmp.map(emp => 
                            <div className={ orgCSS.orgEmpBox} key={emp.empCode} > 
                                <div className={ orgCSS.orgEmpText} > {emp.empName} {emp.job.jobName}</div>
                            </div>
                    )   
                    :   
                    ''
                    }
                </div>: ''
            ))
        }
        </>
    );
}

export default OrganizaionSubList;