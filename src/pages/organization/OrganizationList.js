import { useEffect, useState } from 'react';
import orgCSS from './OrganizationList.module.css';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CallOrganizationListAPI, CallOrganizationSubListAPI } from '../../apis/OrganizationAPICalls';
import OrganizaionSubList from './OrganizationSubList';

function OrganizaionList() {

    
    const dispatch = useDispatch();
    const { org, subOrg } = useSelector( (state) => state.organizationReducer);
    const [ isOpen, setIsOpen ] = useState({});

    const ref = useRef();

    const MouseDownHandler= (e) => {
        
        e.target.className=orgCSS.buttonDown
    }

    const MouseUPHandler= (e) => {
        
        e.target.className=orgCSS.button
    }

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
            dispatch(CallOrganizationListAPI());
        
        },
        []
    );
  
        console.log("org : ", org);
        console.log("subOrg 1: ", subOrg);
    return (
        <div className={ orgCSS.background}>
            <div className={ orgCSS.div}>
                <input type="text" className={ orgCSS.inputBox} 
                placeholder='이름 / 부서 / 직급'></input>
                <button className={ orgCSS.button} 
                    onMouseDown={ MouseDownHandler }
                    onMouseUp={ MouseUPHandler }
                >
                    검색</button>
            </div>
            <hr className={ orgCSS.hr} />
            <div className={ orgCSS.org}>
                <div className={ orgCSS.orgDeptBox}>
                    <div className={ orgCSS.orgTitle}> Moa 그룹</div>
                </div>
                
                { org && org.map(org => !(org.refDeptCode)?  
                    (
                        <div key={org.deptCode} >
                            <div className={ orgCSS.orgDeptBox} name={org.deptCode} onClick={ onClickImgHandler } >
                                { isOpen[org.deptCode]  && isOpen[org.deptCode] ? 
                                (<><img src="./icon/Down.png" className={ orgCSS.directionImg} alt='Down' name={org.deptCode}/>
                                <img src="./icon/OpenFolder.png" className={ orgCSS.folderImg} alt='folder' name={org.deptCode}/></> )
                                :
                                (<><img src="./icon/Up.png" className={ orgCSS.directionImg} alt='Up' name={org.deptCode}/>
                                <img src="./icon/CloseFolder.png" className={ orgCSS.folderImg} alt='folder' name={org.deptCode}/></> )

                                }
                                <div className={ orgCSS.orgText} name={org.deptCode}> {org.deptName} </div>
                            </div>
                            { isOpen[org.deptCode]  && isOpen[org.deptCode] ? 
                            <>
                            <OrganizaionSubList deptCode={org.deptCode} isOpen={isOpen} setIsOpen={setIsOpen}/>
                            
                            </>
                            : ''
                            } 
                        </div>  
                
                    ) 
                    : ''    
                )}
                

            </div>
        </div>
        
    );
}

export default OrganizaionList;