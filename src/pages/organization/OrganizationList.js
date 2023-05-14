import orgCSS from './OrganizationList.module.css';

function OrganizaionList() {

    return (
        <div className={ orgCSS.background}>
            <div className={ orgCSS.div}>
                <input type="text" className={ orgCSS.inputBox} 
                placeholder='이름 / 부서 / 직급'></input>
                <button className={ orgCSS.button} >검색</button>
            </div>
            <div className={ orgCSS.divorg}>Moa 그룹</div>
        </div>
        
    );
}

export default OrganizaionList;