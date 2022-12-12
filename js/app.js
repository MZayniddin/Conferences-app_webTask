const elForm = document.querySelector(".form")
const elName = document.querySelector("#name")
const elSurname = document.getElementById("surname")
const elSharif = document.getElementById("sharif")
const elDate = document.getElementById("date")
const elFromTime = document.getElementById("from");
const elToTime = document.getElementById("to");
const elLectureHeading = document.getElementById("seksiya");
const elTableShowBody = document.getElementById("table-show__body");
const elTitle = document.getElementById("title");

function render(){
  const arr = JSON.parse(localStorage.getItem("conferences")) ? JSON.parse(localStorage.getItem("conferences")) : [];
  elTableShowBody.innerHTML = "";
  const lectureSubjects = filterType(arr);
  lectureSubjects.forEach(lectureSub => {
    const lectures = arr.filter(item => item.lectureSubject === lectureSub);
    const elLectureSubjectRow = document.createElement("tr");
    elLectureSubjectRow.innerHTML = `<th colspan="4" style="text-align: center" >${lectureSub}</td>`;
    elTableShowBody.appendChild(elLectureSubjectRow);
    lectures.forEach(lecture => {
      const lectureDataRow = document.createElement("tr");
      lectureDataRow.innerHTML = `
        <td>${lecture.lectureDate}</td>
        <td>${lecture.startTime} - ${lecture.endingTime}</td>
        <td>${lecture.lectureTitle}</td>
        <td>${lecture.fullName}</td>
      `
      elTableShowBody.appendChild(lectureDataRow)
    })
  })
}

render();

elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if(elFromTime.value < elToTime.value){
      const conferenceArr = JSON.parse(localStorage.getItem("conferences")) ? JSON.parse(localStorage.getItem("conferences")) : [];
      const newConference = {
        id: conferenceArr[conferenceArr.length - 1] ? conferenceArr[conferenceArr.length - 1].id + 1 : 0,
        fullName: `${elSurname.value.charAt(0).toUpperCase() + elSurname.value.slice(1)} ${elName.value[0].toUpperCase()}. ${elSharif.value[0].toUpperCase()}.`,
        lectureSubject: elLectureHeading.value,
        lectureDate: configureDate(elDate),
        startTime: elFromTime.value,
        endingTime: elToTime.value,
        lectureTitle: elTitle.value
      }
      conferenceArr.push(newConference);
      localStorage.setItem("conferences", JSON.stringify(conferenceArr))
      render();
    }else {
      alert("Vaqtni to'g'ri kiriting!");
    }
  })
  
  
function configureDate(date){
  return date.value.split("-").reverse().join(".")
}

function filterType(arr){
  let types = [];
  arr.forEach(({lectureSubject}) => {
    if(!types.includes(lectureSubject)){
      types.push(lectureSubject);
    }
  })
  return types;
}