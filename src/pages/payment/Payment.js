import { useEffect,useState } from 'react';
import payCSS from './Payment.module.css';






function Payment () {

  const htmlString = ``;

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
        <div className={payCSS.titleDiv}>
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
        <div className={payCSS.titleDiv}>
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
                  <div className={payCSS.docutext}>
                  <div>
                  <div>출퇴근 사유서</div>
                  <div>출퇴근 사유서</div>
                  <label>성 명</label>
                  <input type='text'/>
                  <label>부 서</label>
                  <input type='text'/>
                  <label>직 급</label>
                  <input type='text'/>
                  <label>처리 구분</label>
                  <input type='text'/>
                  <label>일시</label>
                  <input type='text'/>
                  <label>출근 시간</label>
                  <input type='text'/>
                  <label>퇴근 시간</label>
                  <input type='text'/>
                  <label>사유</label>
                  <input type='text'/>
                  </div>
                  </div>
                </td>
              </tr>
              
              <tr></tr>
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