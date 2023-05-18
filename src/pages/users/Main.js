
</div>
<div className={MainCSS.program}>
    <div className={MainCSS.project}>프로젝트</div>
    <table className={MainCSS.myPrj}>
        <tbody>
        <tr>
            <th>업무 번호</th>
            <th>업무 제목</th>
            <th>완료기한</th>
            <th>진행률</th>
            <th>상태</th>
            <th>담당자</th>
        </tr>
        <tr>
            <td>0001</td>
            <td>모아웨어 프로젝트</td>
            <td>~ 2023.06.09</td>
            <td>
                <progress className={MainCSS.progress} value={50} min={0} max={100}></progress>
            </td>
            <td>진행중</td>
            <td>홍길동 이사</td>
        </tr>
        <tr>
            <td>0001</td>
            <td>모아웨어 프로젝트</td>
            <td>~ 2023.06.09</td>
            <td>
                <progress className={MainCSS.progress} value={50} min={0} max={100}></progress>
            </td>
            <td>진행중</td>
            <td>홍길동 이사</td>
        </tr>
        <tr>
            <td>0001</td>
            <td>모아웨어 프로젝트</td>
            <td>~ 2023.06.09</td>
            <td>
                <progress className={MainCSS.progress} value={50} min={0} max={100}></progress>
            </td>
            <td>진행중</td>
            <td>홍길동 이사</td>
        </tr>
        </tbody>
    </table>
</div>
</div>
<div className={MainCSS.wrap2}>
<div className={MainCSS.notification}>
    <div className={MainCSS.announcement}>공지사항</div>
    <table>
        <tbody>
        <tr>
            <th>날짜</th>
            <th>제목</th>
            <th>작성자</th>
        </tr>
        <tr>
            <td>2023.05.01</td>
            <td>공부하기 싫다..</td>
            <td>홍길동</td>
        </tr>
        <tr>
            <td>2023.05.01</td>
            <td>공부하기 싫다..</td>
            <td>홍길동</td>
        </tr>
        <tr>
            <td>2023.05.01</td>
            <td>공부하기 싫다..</td>
            <td>홍길동</td>
        </tr>
        <tr>
            <td>2023.05.01</td>
            <td>공부하기 싫다..</td>
            <td>홍길동</td>
        </tr>
        </tbody>
    </table>
</div>
<div className={MainCSS.calendar}>달력</div>
</div>
</div>
);
}

export default Main;