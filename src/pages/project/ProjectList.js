import { useNavigate } from 'react-router-dom';
import ProjectCSS from './ProjectList.module.css';
import { useState } from 'react';

function ProjectList( {projectList} ) {

    const navigate = useNavigate();
    const [selecteCheck, setSelecteCheck] = useState(null);

    const onClickTableTr = (projCode) => {
      navigate(`/task/${projCode}`);
    };
  
    const handleCheckboxChange = (event, projCode) => {
        
        // 이벤트 전파 방지
        event.stopPropagation(); 
        setSelecteCheck(projCode);
        if(selecteCheck == projCode) {
            setSelecteCheck(null);
        }
    };

    return (
        <>
            <tbody>
                {projectList && projectList.map(p =>
                (<tr className={ProjectCSS.td} 
                    key={p.projCode}
                    onClick={ () => onClickTableTr(p.projCode) }
                >   
                    <td>
                        <input
                        type="checkbox"
                        checked={selecteCheck === p.projCode}
                        onChange={(event) => handleCheckboxChange(event, p.projCode)}
                        onClick={(event) => event.stopPropagation()} // 클릭 이벤트 전파 방지
                        />
                    </td>
                    <td>{p.projCode}</td>
                    <td>{p.projName}</td>
                    <td>{p.projStartDate.substring(0, 10)}~{p.projEndDate.substring(0, 10)}</td>
                    <td>{p.projStatus}</td>
                    <td>{p.employee.empName}</td>
                    <td>
                        {p.projMember.length}
                    </td>
                </tr>))}
            </tbody>
        </>
    );
}

export default ProjectList;
