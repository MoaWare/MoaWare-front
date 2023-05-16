import { useState } from "react";

export default function DateSelect(props) {
    const [year2, setYear] = useState(new Date().getFullYear());
    const [month2, setMonth] = useState(new Date().getMonth() + 1);
  
    const onChangeYearHandler = (e) => {
      setYear(parseInt(e.target.value));
      props.onYearChange(year2, parseInt(e.target.value));
    };

    console.log(month2);
  
    const onChangeMonthHandler = (e) => {
      setMonth(parseInt(e.target.value));
      props.onMonthChange(month2, parseInt(e.target.value));
    };

  
    const years = [];
    for (let i = 2000; i <= new Date().getFullYear(); i++) {
      years.push(i);
    }
  
    return (
      <div>
        <select value={year2} name="year" onChange={onChangeYearHandler}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select value={month2} name="month" onChange={onChangeMonthHandler}>
          <option value="1">1월</option>
          <option value="2">2월</option>
          <option value="3">3월</option>
          <option value="4">4월</option>
          <option value="5">5월</option>
          <option value="6">6월</option>
          <option value="7">7월</option>
          <option value="8">8월</option>
          <option value="9">9월</option>
          <option value="10">10월</option>
          <option value="11">11월</option>
          <option value="12">12월</option>
        </select>
      </div>
    );
  }