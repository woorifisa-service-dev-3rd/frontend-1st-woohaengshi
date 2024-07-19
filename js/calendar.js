import { db } from './firebaseConfig.js';

const userName = localStorage.getItem('userName');
const userId = localStorage.getItem('userId');
let totalTime = 0;
//데이터 불러오기
db.collection('study')
    .get()
    .then((result) => {
        // 데이터 배열 선언
        let dataArray = [];
        
        result.docs.forEach((doc) => {
            // 데이터 배열 생성
            if(userId === doc.data().userId){
                const studySubject = doc.data().subject;    
                const studydate = new Date(doc.data().date.seconds * 1000 + doc.data().date.nanoseconds / 1000000);
            
                const time = parseInt(doc.data().time);
                totalTime += parseInt(doc.data().time);
                dataArray.push({userId, userName, studySubject, studydate, time});            
            }
        });

        // console.log(totalTime);

        // 달력 변수
        const calendarTitle = document.getElementById('title');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        const calendarBody = document.getElementById('calendar_body');
        const today = new Date();
    
        let month = today.getMonth();
        let year = today.getFullYear();
        
        // 달력 생성 함수
        function calendarDraw(){
            const firstDay = new Date(year, month, 1);
            const fullDay = new Date(year, month+1, 0).getDate();
            const startDay = firstDay.getDay();
            const weekNumber = Math.ceil((startDay+fullDay)/7);

            calendarTitle.textContent = `${year}년 ${month +1}월`;
            calendarBody.innerHTML='';

            let startDate = 1;

            // 이번달 날짜
            for(let i = 0; i<weekNumber; i++){
                const row = document.createElement('tr');
                calendarBody.appendChild(row);

                for(let j = 0; j<7; j++){
                    if(i == 0 && j<startDay){
                    // 빈 날짜(이전달)
                        const empty = document.createElement('td');
                        empty.innerHTML = '<span></span>';
                        calendarBody.children[0].appendChild(empty);
                    }
                    else if(startDate > fullDay){
                    // 빈 날짜(다음달)
                        const empty = document.createElement('td');
                        empty.innerHTML = '<span></span>';
                        calendarBody.children[i].appendChild(empty);
                    }
                    else{
                        const date = document.createElement('td');
                        date.classList = `date${startDate}`;
                        date.innerHTML = `<span>${startDate}</span><div class="history_list"><ul></ul></div>`;
                        calendarBody.children[i].appendChild(date);
                    
                        startDate++;
                    }
                }
            }
            dataInsert();
        }

        calendarDraw();
        
        // 이전달 이동
        prevButton.addEventListener('click',()=>{
            month--;
            if (month < 0) {
                month = 11;
                year--;
            }
            calendarDraw();
        });

        // 다음달 이동
        nextButton.addEventListener('click',()=>{
            month++;
            if (month > 11) {
                month = 0;
                year++;
            }
            calendarDraw();
        });
    
        // 데이터 삽입 함수
        function dataInsert(){
            dataArray.forEach((data)=>{
                // 기록된 년월일
                const historyYear = data.studydate.getFullYear();
                const historyMonth = data.studydate.getMonth();
                const historyDate = data.studydate.getDate();
        
                // 기록된 시간분초 
                // const historyHour = new Date(data.time * 1000).getHours();
                // const historyMinute = new Date(data.time * 1000).getMinutes();
                // const historySecond = new Date(data.time * 1000).getSeconds();
                

                const hours = Math.floor(data.time / 3600);
                const minutes = Math.floor((data.time % 3600) / 60);
                const seconds = (data.time % 3600) % 60;
                console.log(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toFixed(2)}`);
                
            
                // 년월일 일치시 달력에 기록
                if(year == historyYear && month == historyMonth){
                    const dDay = document.querySelector(`#calendar_body .date${historyDate} ul`);
                    // 입력될 li 
                    const history = `<li class="small">${data.studySubject} ${hours}:${minutes}:${seconds}</li>`;
                    dDay.insertAdjacentHTML('beforeend', history);
                }
            });
        }

        // 총합
        // function timeSum(){
        //     // 총합 시간분초
        //     let sumHour = 0;
        //     let sumMinute = 0;
        //     let sumSecond = 0;

        //     dataArray.forEach((data)=>{
        //         // 기록된 시간분초 
        //         const historyHour = new Date(data.time * 1000).getHours();
        //         const historyMinute = new Date(data.time * 1000).getMinutes();
        //         const historySecond = new Date(data.time * 1000).getSeconds();

        //         sumHour += historyHour;
        //         sumMinute += historyMinute;
        //         sumSecond += historySecond;
        //     });

        //     const sumText = document.getElementById('time_sum');
        //     sumText.innerText = `${sumHour}:${sumMinute}:${sumSecond}`;
            
        // }
        // timeSum();
        const sumText = document.getElementById('time_sum');
        // console.log(totalTime);
        const hours = Math.floor(totalTime / 3600);
        const minutes = Math.floor((totalTime % 3600) / 60);
        const seconds = (totalTime % 3600) % 60;
        sumText.innerText = `${hours}:${minutes}:${seconds}`;

        const avgText = document.getElementById('time_avg');
        const avg = Math.floor(totalTime / dataArray.length);
        const avgHours = Math.floor(avg / 3600);
        const avgMinutes = Math.floor((avg % 3600) / 60);
        const avgSeconds = (avg % 3600) % 60;
        avgText.innerText = `${avgHours}:${avgMinutes}:${avgSeconds}`;

        // 평균
        // function timeAvg(){
        //     // 평균 시간분초
        //     let avgHour = 0;
        //     let avgMinute = 0;
        //     let avgSecond = 0;

        //     dataArray.forEach((data)=>{
        //         // 기록된 시간분초 
        //         const historyHour = new Date(data.time * 1000).getHours();
        //         const historyMinute = new Date(data.time * 1000).getMinutes();
        //         const historySecond = new Date(data.time * 1000).getSeconds();

        //         avgHour += historyHour;
        //         avgMinute += historyMinute;
        //         avgSecond += historySecond;
        //     });

        //     avgHour = parseInt(avgHour / dataArray.length);
        //     avgMinute = parseInt(avgMinute / dataArray.length);
        //     avgSecond = parseInt(avgSecond / dataArray.length);

        //     console.log(avgMinute);

        //     const sumText = document.getElementById('time_avg');
        //     sumText.innerText = `${avgHour}:${avgMinute}:${avgSecond}`;
        // }
        // timeAvg();
    });