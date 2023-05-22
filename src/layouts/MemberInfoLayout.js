import { useDispatch } from "react-redux";
import MemCSS from '../pages/member/Member.module.css';
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";


function MemberInfoLayout(){

    const dispatch = useDispatch();

    return (
        <>
            <Header />
            <div className={ MemCSS.backgroundDiv }>
                <div className={ MemCSS.loginDiv }>
                    <Outlet/>
                </div>
            </div>
        </>
    )     
}

export default MemberInfoLayout;