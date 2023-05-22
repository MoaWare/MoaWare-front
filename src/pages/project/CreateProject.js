import { useState } from 'react';
import CreteProjCSS from './CreateProject.module.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function CreateProject() {

    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)
    const [selectedOption, setSelectedOption] = useState("");
    const today = new Date().toISOString().slice(0, 10);

    

    return (
        <>
            <div className={CreteProjCSS.main}>
                <p className={CreteProjCSS.p}>프로젝트 생성</p>
                <hr className={CreteProjCSS.hr}></hr>
                <div className={CreteProjCSS.center}>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span1}>프로젝트 이름</span>
                        <input className={CreteProjCSS.span2}
                            type="text"
                            name="projTitle"
                            placeholder="프로젝트 이름"
                            autoComplete='off'
                        >
                        </input>
                    </div>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span1}>프로젝트 팀장</span>
                        <div className={CreteProjCSS.span2}>
                            아
                        </div>
                    </div>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span1}>프로젝트 팀원</span>
                        <div className={CreteProjCSS.span2}>
                            {today}
                        </div>
                    </div>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span1}>프로젝트 시작일</span>
                        <div className={CreteProjCSS.date}>
                            <DatePicker className={CreteProjCSS.datepicker}
                                selected={selectedStartDate}
                                onChange={(startDate) => setSelectedStartDate(startDate.toISOString())}
                                dateFormat='yyyy-MM-dd'
                            />
                        </div>
                        <span className={CreteProjCSS.span1}>프로젝트 종료일</span>
                        <div className={CreteProjCSS.date}>
                            <DatePicker className={CreteProjCSS.datepicker}
                                selected={selectedEndDate}
                                onChange={(endDate) => setSelectedEndDate(endDate.toISOString())}
                                dateFormat='yyyy-MM-dd'
                            />
                        </div>
                    </div>
                    <div className={CreteProjCSS.container}>
                        <span className={CreteProjCSS.span3}>프로젝트내용</span>
                        <input className={CreteProjCSS.span4}>
                        </input>
                    </div>
                    <div>
                        <button className={CreteProjCSS.workBtn1}>생성하기</button>
                        <button className={CreteProjCSS.workBtn2}>취소하기</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateProject;