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
      </div>
    );

  };

export default Payment