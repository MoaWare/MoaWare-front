import { useState } from 'react';
import orgCSS from './OrganizationList.module.css';
import { useNavigate } from 'react-router-dom';


function OrganizationList({org, isSearch}) {

    console.log("org : ", org);
    const [ isOpen, setIsOpen ] = useState({});
    const [ search, setSearch ] = useState('');
    const navigate = useNavigate();

    

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
        if(search){
            navigate(`/org/search?search=${search}`);
            setIsOpen({});
        } else {
            navigate(`/org`);
            setIsOpen({});
            setSearch(false);
        } 
    }

    const homeClickHandler = () => {
        navigate(`/org`);
        setIsOpen({});
        setSearch(false);
    }

    const detailClickHandler = (empCode) => {
        
        navigate(`/org/detail/${empCode}`);
    }

    const searchChangeHandler =(e)=>{
        setSearch(
           e.target.value
        )

    }

    const onEnterKeyHandler = (e) =>{
        
        if(e.key === 'Enter'){
            if(search){
                navigate(`/org/search?search=${search}`);
                setIsOpen({});
            } else {
                navigate(`/org`);
                setIsOpen({});
                setSearch(false);
            } 
        } 
    }

    console.log("search :" ,search);
  
       
    return (
        <div className={ orgCSS.background}>
            <div className={ orgCSS.div}>
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
            <hr className={ orgCSS.hr} />
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
                          
                            {isSearch? 
                            isOpen[org.deptCode]  && isOpen[org.deptCode] ? 
                            (org.orgEmp.map(emp => 
                                <div className={ orgCSS.orgRefDeptBox} key={emp.empCode} onClick={()=> detailClickHandler(emp.empCode)}> 
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
                                        <div className={ orgCSS.orgText} name={sub.deptCode}> {sub.deptName} </div>
                                    </div> 
                                    {isOpen[sub.deptCode]  && isOpen[sub.deptCode] ? 
                                        (sub.orgEmp.map(emp => 
                                            <div className={ orgCSS.orgEmpBox} key={emp.empCode} onClick={()=> detailClickHandler(emp.empCode)} > 
                                                <div className={ orgCSS.orgEmpText} > {emp.empName} {emp.job.jobName}</div>
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
  
export default OrganizationList;