import { useEffect,useState } from 'react';
import payCSS from './Payment.module.css';






function Payment () {


    return (
      <div className={payCSS.background}>
        <div className={payCSS.titleDiv}>
          <div className={payCSS.title}>기안문 작성</div>
          <button className={payCSS.button}>결재선</button>
          <button className={payCSS.button}>결재요청</button>
          <button className={payCSS.button}>임시저장</button>
          <button className={payCSS.buttonCancel}>취소</button>
        </div>
        <div className={payCSS.payApproval}>
          <div className={payCSS.payDiv}>
            <div className={payCSS.payTitle}>기안자</div>
            <div className={payCSS.payName}>홍길동</div>
            <div className={payCSS.paySign}><img src="/icon/sign.png" className={payCSS.signImg}/></div>
          </div>
        </div>
        <div className={payCSS.tableDiv}>
          <table className={payCSS.tbody}>
            <tbody >
              <tr>
                <th>문서 번호</th>
                <td>dddd</td>
                <th>기안 일자</th>
                <td>ddd</td>
              </tr>
              <tr>
                <th>기안자</th>
                <td>dddd</td>
                <th>기안 부서</th>
                <td>d</td>
              </tr>
              <tr>
                <th>참조자</th>
                <td colSpan='3' >
                  <div className={[payCSS.refMemebertd]}>
                텍스트asdfasdfasdf
                <img src='/icon/refenceMember.png' className={payCSS.refMemeber} alt="문서"/>
                </div>
                </td>
              </tr>
              <tr>
                <th>문서제목</th>
                <td colSpan='3'><input type='text' className={payCSS.input}/></td>
              </tr>
              </tbody>
          </table>
        </div>
        <div className={payCSS.tableDiv}>
          <table className={payCSS.tbody}>
            <tbody >
              <tr>
                <th>양식 종류</th>
                <td colSpan='3'>
                  <select defaultValue="null">
                    <option value="null" disabled hidden>선택하세요</option>
                    <option value="dd">지출결의서</option>
                    <option value="dd">출퇴근 사유서</option>
                    <option value="dd">프로젝트 기안서</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan='3' className={payCSS.docuMain}>
                  <div className={payCSS.docuText}>
                  
                    <table className={payCSS.docuDiv}>
                      <tbody className={payCSS.docuDiv}>
                        <tr>
                          <th colSpan='4' className={payCSS.docuTitle}>출퇴근 사유서</th>
                        </tr>
                        <tr>
                          <th className={payCSS.docuLabel}>성 명</th>
                          <td><input type='text' className={payCSS.docuInput}/></td>
                          <th>부 서</th>
                          <td><input type='text' className={payCSS.docuInput}/></td>
                        </tr>
                        <tr>
                          <th>직 급</th>
                          <td><input type='text' className={payCSS.docuInput}/></td>
                          <th>처리 구분</th>
                          <td><input type='text' className={payCSS.docuInput}/></td>
                        </tr>
                        <tr>
                          <th>일시</th>
                          <td colSpan='3'><input type='text' className={payCSS.docuInput}/></td>
                        </tr>
                        <tr>
                          <th>출근 시간</th>
                          <td><input type='text' className={payCSS.docuInput}/></td>
                          <th>퇴근 시간</th>
                          <td><input type='text' className={payCSS.docuInput}/></td>
                        </tr>
                        <tr>
                          <th rowSpan="2">사유</th>
                          <td rowSpan="2" colSpan="3"><input type='text' className={payCSS.docuInputText}/></td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </td>
              </tr>
              

              <tr className={payCSS.attach}>
                <th>첨부파일</th>
                <td colSpan="5"><input type='file' className={payCSS.input}/></td>
              </tr>
              </tbody>
          </table>
        </div>

      </div>
    );

  };

export default Payment