import { useEffect,useState } from 'react';
import payCSS from './Payment.module.css';






function Payment () {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [htmlString, setHtmlString] = useState('');
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleNumberChange = (event) => {
      setNumber(event.target.value);
    };
  
    const saveHtmlString = () => {
      const html = `
        <div>
          <label class=${payCSS.orgText}>이름</label>
          <span  class=${payCSS.orgText} >${name}</span>
          </div>
          <div>
          <label>번호</label>
          <input type="text" value="${number}" />
        </div>
      `;
      setHtmlString(html);
      // 변환된 HTML 문자열을 서버에 저장하는 로직을 추가해야 합니다.
    };

    useEffect(
        ()=>{
            setName(name);
            setNumber(number);
        },[name,number]
    )

    console.log("htmlString : ", htmlString);
    return (
      <div className={payCSS.background}>
        <div>
          <label className={payCSS.orgText} >이름</label>
          <input type="text" value={name} onChange={handleNameChange} className={payCSS.orgText} />
        </div>
        <div>
          <label>번호</label>
          <input type="text" value={number} onChange={handleNumberChange} />.
        </div>
        <button onClick={saveHtmlString}>HTML 저장하기</button>
        <div dangerouslySetInnerHTML={{ __html: htmlString }} 
        contentEditable={false}/>
      </div>
    );

  };

export default Payment