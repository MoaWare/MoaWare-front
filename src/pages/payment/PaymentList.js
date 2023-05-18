import { useEffect,useState } from 'react';
import payCSS from './Payment.module.css';



function PaymentList () {

    const [name, setName] = useState('');
    const [name2, setName2] = useState('');
    const [number, setNumber] = useState('');
    const [htmlString, setHtmlString] = useState('');
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
    const handleNameChange2 = (event) => {
      setName2(event.target.value);
    };
  
    const handleNumberChange = (event) => {
      setNumber(event.target.value);
    };
  
    const saveHtmlString = () => {
      const html = `
        <div>
        <label class=${payCSS.payName}>이름</label>
        <span  class=${payCSS.input} >${name}</span>
        </div>
        <div>
        <label>번호</label>
        <input type="text" value="${number}" readonly />
        <label>번호1</label>
        <input type="text" value="${number}" disabled />
      </div>

      <table className={payCSS.docuDiv}>
                      <tbody className={payCSS.docuDiv}>
                        <tr>
                          <th colSpan='4' className={payCSS.docuTitle}>출퇴근 사유서</th>
                        </tr>
                        <tr>
                          <th className={payCSS.docuLabel}>성 명</th>
                          <td><input type='text' className={payCSS.docuInput}
                          value={name2} onChange={handleNameChange2}/></td>
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
    `;
      setHtmlString(html);
      // 변환된 HTML 문자열을 서버에 저장하는 로직을 추가해야 합니다.
    };

    const addReadonlyToInput = (htmlString) => {
        const modifiedHTML = htmlString.replace(/<input[^>]*>/g, (match) => {
          return match.replace(/className=/, 'readOnly class=$').replace(/value={([^}]*)}/, 'value=${$1}')
        });
        return modifiedHTML;
      };
      
      const filteredHTML = addReadonlyToInput(htmlString);

      useEffect(() => {
        const addReadonlyToInput = (htmlString) => {
          const modifiedHTML = htmlString.replace(/<input[^>]*>/g, (match) => {
            return match.replace(/className=/, 'readOnly class=$').replace(/value={([^}]*)}/, 'value={$1}');
          });
          return modifiedHTML;
        };
    
        const filteredHTML = addReadonlyToInput(htmlString);
        setHtmlString(filteredHTML);
      }, [htmlString]);
    
    console.log("htmlString : ", htmlString);
    console.log("filteredHTML : ", filteredHTML);
    return (
      <div className={payCSS.background}>
        <div>
          <label className={payCSS.payName} >이름</label>
          <input type="text" value={name} onChange={handleNameChange} className={payCSS.input} />
        </div>
        <div>
          <label>번호</label>
          <input type="text" value={number} onChange={handleNumberChange} />.
        </div>
        <button onClick={saveHtmlString}>HTML 저장하기</button>
        <div dangerouslySetInnerHTML={{ __html: filteredHTML }} 
        contentEditable={false}/>

              <table className={payCSS.docuDiv}>
                      <tbody className={payCSS.docuDiv}>
                        <tr>
                          <th colSpan='4' className={payCSS.docuTitle}>출퇴근 사유서</th>
                        </tr>
                        <tr>
                          <th className={payCSS.docuLabel}>성 명</th>
                          <td><input type='text' className={payCSS.docuInput}
                          value={name2} onChange={handleNameChange2}/></td>
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

      
    );

  };

export default PaymentList