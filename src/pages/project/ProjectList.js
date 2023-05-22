import { useNavigate } from 'react-router-dom';
import ProjectCSS from './ProjectList.module.css';

function ProjectList( {projectList} ) {

    const navigate = useNavigate();


    const onClickTableTr = (projCode) => {
        navigate(`proj/detail/${projCode}`);
    }


    return (
        <>
            <tbody>
                {projectList && projectList.map(p =>
                (<tr className={ProjectCSS.td} 
                    key={p.projCode}
                    onClick={ () => onClickTableTr(p.projCode) }
                >
                    <td>{p.projCode}</td>
                    <td>{p.projName}</td>
                    <td>{p.startDate.substring(0, 10)}~{p.endDate.substring(0, 10)}</td>
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