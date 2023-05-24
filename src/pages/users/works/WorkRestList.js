// import { useState } from 'react';
// import DateSelect from '../../../components/Work/DateSelect';
// import WorkRestListCSS from './WorkRestList.module.css';
// // import PagingBar from "../../components/common/PagingBar";

// function WorkRestList() {

//     const [selectedDate, setSelectedDate] = useState(null)
//     const [year, setYear] = useState(new Date().getFullYear());
//     const [month, setMonth] = useState(new Date().getMonth() + 1);
//     const [currentPage, setCurrentPage] = useState(1);
//     // const pageInfo = products.pageInfo; 나중에 수정
    
//     const today = new Date();
//     const formattedDate = formatDate(today);
//     const handleDateChange = (year, month) => {

//     };
      

//     return(
//         <>
//         <div className={ WorkRestListCSS.main }>
//                         <p className={ WorkRestListCSS.p }>근태 관리</p>
//                         <div className={ WorkRestListCSS.btnContainer }>
//                         <button className={ WorkRestListCSS.btn }>&lt;</button>
//                         <p className={ WorkRestListCSS.pMonth }>2023-05</p>
//                         <button className={ WorkRestListCSS.btn2 }>&gt;</button>
//                         <button className={ WorkRestListCSS.btn3 }>Today</button>
//                         </div>
//                         <hr className={ WorkRestListCSS.hr }></hr>
//                         <div className={ WorkRestListCSS.btnContainer2 }>
//                             <div className={ WorkRestListCSS.dateSelect }>
//                                 <DateSelect 

//                                 year2={year2}
//                                 month2={month2}
                                
//                                 onYearChange={handleYearChange} onMonthChange={handleMonthChange} 
                                
//                                 // onChageHandler={ onChageHandler }
                                
//                                 />
//                                 <input className={ WorkRestListCSS.inputBox }></input>
//                             </div>
//                         </div>
//                         <hr className={ WorkRestListCSS.hr }></hr>
//                         <table className={ WorkRestListCSS.table }>
//                             <thead>
//                                 <tr className={ WorkRestListCSS.th }>
//                                     <th>날짜</th>
//                                     <th>출근 시간</th>
//                                     <th>퇴근 시간</th>
//                                     <th>근무 시간</th>
//                                     <th>연장 시간</th>
//                                     <th>상태</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
                        
//                                     <tr>
//                                     <td></td>
//                                     <td></td>
//                                     <td>
//                                     </td>
//                                     <td>
//                                     </td>
//                                     <td>
//                                     </td>
//                                     <td></td>
//                                     </tr>
                                    
                              
//                             </tbody>
//                         </table>
//                         <div>
//                         {/* { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> } */}
//                         </div>
//                     </div>
//                 </>
//             );
//         }

// export default WorkRestList;