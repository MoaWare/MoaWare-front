import { useContext, useState } from 'react';
import orgCSS from './OrgListModal.module.css';
import { orgContext } from '../../../pages/payment/Payment';
import { useDrag, useDrop } from 'react-dnd';



function OrgListModal({org}) {

    const{searchForm, setSearchForm, setFocusEmp, focusEmp, isFocus , setIsFocus} = useContext(orgContext);

    console.log("org : ", org);
    const [ isOpen, setIsOpen ] = useState({});
    

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

    const searchClickHandler = () => {
        if(searchForm.search){
            setSearchForm({
                ...searchForm,
                'isSearch' : true
            });
            setIsOpen({});
        } else {
            setIsOpen({});
            setSearchForm({
                ...searchForm,
                'search' : ''
            });
        } 
    }

    const homeClickHandler = () => {
        setIsOpen({});
        setSearchForm({
            'isSearch' : false,
            'search' : ''
        })
    }

    const searchChangeHandler =(e)=>{
        setSearchForm({
            ...searchForm,
            [e.target.name] : e.target.value
        })

    }

    const onEnterKeyHandler = (e) =>{
        
        if(e.key === 'Enter'){
            if(searchForm.search){
                setIsOpen({});
                setSearchForm({
                    ...searchForm,
                    'isSearch' : true
                });
            } else {
                setIsOpen({});
                setSearchForm({
                    'isSearch' : false,
                    'search' : ''
                })

            } 
        } 
    }

    const onClickEmp = (e, emp, sub) => {
        console.log("클릭 emp " , emp)
        console.log("클릭 e " , e.target)
        console.log("클릭 sub " , sub)
        
       const isDuplicatteFocusEmp = focusEmp.some(
            (focus) => focus.emp.empName === emp.empName 
        )

        if(!isDuplicatteFocusEmp){
        setFocusEmp([
            ...focusEmp,
            {
            'emp' : emp,
            'sub' : sub
        }]
        )
        }
        setIsFocus([...isFocus, emp.empCode]);
    }

    console.log("searchForm :" ,searchForm);
       
    return (
        <div className={ orgCSS.background}>
            <div className={ orgCSS.div}>
                <div className={orgCSS.orgTitleName}>조직도</div>
                <input type="text" className={ orgCSS.inputBox} 
                placeholder='이름 / 팀 / 직급' onChange={searchChangeHandler} name="search"
                onKeyUp={ onEnterKeyHandler }
                ></input>
                <button className={ orgCSS.button} 
                    onMouseDown={ MouseDownHandler }
                    onMouseUp={ MouseUPHandler }
                    onClick={searchClickHandler}
                >
                    검색</button>
            </div>
            {/* <hr className={ orgCSS.hr} /> */}
            <div className={ orgCSS.org}>
                <div className={ orgCSS.orgDeptBox} onClick={ homeClickHandler }>
                    <div className={ orgCSS.orgTitle} > Moa 그룹</div>
                </div>
                
                { org && org.map(org => !(org.refDeptCode)?  
                    (
                        <div key={org.deptCode} >
                            <div className={ orgCSS.orgDeptBox} name={org.deptCode} onClick={ onClickImgHandler } >
                                { isOpen[org.deptCode]  && isOpen[org.deptCode] ? 
                                (<><img src="/icon/Down.png" className={ orgCSS.directionImg} alt='Down' name={org.deptCode}/>
                                <img src="/icon/OpenFolder.png" className={ orgCSS.folderImg} alt='folder' name={org.deptCode}/></> )
                                :
                                (<><img src="/icon/Up.png" className={ orgCSS.directionImg} alt='Up' name={org.deptCode}/>
                                <img src="/icon/CloseFolder.png" className={ orgCSS.folderImg} alt='folder' name={org.deptCode}/></> )

                                }
                                <div className={ orgCSS.orgText} name={org.deptCode}> {org.deptName} </div>
                            </div>
                          
                            {searchForm.isSearch? 
                            isOpen[org.deptCode]  && isOpen[org.deptCode] ? 
                            (org.orgEmp.map(emp => 
                                <div  className={ isFocus.includes(emp.empCode) ? orgCSS.orgEmpBoxFocus : orgCSS.orgEmpBox} onClick={(e) => onClickEmp(e,emp, org)} > 
                                    <div className={ orgCSS.orgEmpText} > {emp.empName} {emp.job.jobName}</div>
                                </div>)
                            )  : '' 
                            :
                             isOpen[org.deptCode]  && isOpen[org.deptCode] ? 
                                org.subDept && org.subDept.map( sub => 

                                <div key={sub.deptCode}>
                                    <div className={ orgCSS.orgRefDeptBox} name={sub.deptCode}  onClick={ onClickImgHandler } key={sub.deptCode}>
                                    { isOpen[sub.deptCode] && isOpen[sub.deptCode] ? 
                                        (<><img src="/icon/Down.png" className={ orgCSS.directionImg} alt='Down' name={sub.deptCode}/>
                                        <img src="/icon/OpenFolder.png" className={ orgCSS.folderImg} alt='folder' name={sub.deptCode}/></> )
                                        :
                                        (<><img src="/icon/Up.png" className={ orgCSS.directionImg} alt='Up' name={sub.deptCode}/>
                                        <img src="/icon/CloseFolder.png" className={ orgCSS.folderImg} alt='folder' name={sub.deptCode}/></> )
                                    }
                                        <div className={ orgCSS.orgText} name={sub.deptCode} > {sub.deptName} </div>
                                    </div> 
                                    {isOpen[sub.deptCode]  && isOpen[sub.deptCode] ? 
                                        (sub.orgEmp.map(emp => 
                                            <div className={ isFocus.includes(emp.empCode) ? orgCSS.orgEmpBoxFocus : orgCSS.orgEmpBox} key={emp.empCode} onClick={(e) => onClickEmp(e,emp, sub)} > 
                                                <div className={ orgCSS.orgEmpText}> {emp.empName} {emp.job.jobName}</div>
                                            </div>)
                                    )  : '' }   
                                </div>

                                ) : ''      
                            
                            }
                               
                            
                        </div>  
                
                    ) 
                    : ''    
                )}
                

            </div>
        </div>
        
    );
}
  
export default OrgListModal;