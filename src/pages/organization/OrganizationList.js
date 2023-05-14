import { useEffect, useState } from 'react';
import orgCSS from './OrganizationList.module.css';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CallOrganizationListAPI } from '../../apis/OrganizationAPICalls';

function OrganizaionList() {

    const [ isOpen, setIsOpen ] = useState({
        dept : false,
        refDept : false
    });
    const dispatch = useDispatch();
    const { org } = useSelector( (state) => state.organizationReducer);
   
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
   console.log('org : ', org);
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
                { org&&org.map(org =>   org.refDeptCode? "" :  
                <div className={ orgCSS.orgDeptBox} name="dept" onClick={ onClickImgHandler } key={org.detpCode} >
                    { isOpen.dept && isOpen.dept ? 
                    (<><img src="./icon/Down.png" className={ orgCSS.directionImg} alt='Down' name="dept"/>
                    <img src="./icon/OpenFolder.png" className={ orgCSS.folderImg} alt='folder' name="dept"/></> )
                    :
                    (<><img src="./icon/Up.png" className={ orgCSS.directionImg} alt='Up' name="dept"/>
                    <img src="./icon/CloseFolder.png" className={ orgCSS.folderImg} alt='folder' name="dept"/></> )

                    }
                    <div className={ orgCSS.orgText} name="dept" > {org.deptName} </div>
                </div>
                
                )}
                <div className={ orgCSS.orgRefDeptBox} name="refDept" onClick={ onClickImgHandler } >
                { isOpen.refDept && isOpen.refDept ? 
                    (<><img src="./icon/Down.png" className={ orgCSS.directionImg} alt='Down'name="refDept"/>
                    <img src="./icon/OpenFolder.png" className={ orgCSS.folderImg} alt='folder'name="refDept"/></> )
                    :
                    (<><img src="./icon/Up.png" className={ orgCSS.directionImg} alt='Up' name="refDept"/>
                    <img src="./icon/CloseFolder.png" className={ orgCSS.folderImg} alt='folder' name="refDept"/></> )

                    }
                    <div className={ orgCSS.orgText} name="refDept"> Moa 그룹</div>
                </div>
                <div className={ orgCSS.orgEmpBox}>
                    <div className={ orgCSS.orgEmpText}> Moa 그룹</div>
                </div>
            </div>
        </div>
        
    );
}

export default OrganizaionList;