const elForm = document.querySelector(".form")
const elName = document.querySelector("#name")
const elSurname = document.getElementById("surname")
const elSharif = document.getElementById("sharif")
const elDate = document.getElementById("date")
const elFromTime = document.getElementById("from");
const elToTime = document.getElementById("to");
const elLectureHeading = document.getElementById("seksiya");
const elTableShowBody = document.getElementById("table-show__body");

function render(){
  const arr = JSON.parse(localStorage.getItem("conferences")) ? JSON.parse(localStorage.getItem("conferences")) : [];
  elTableShowBody.innerHTML = "";
  filterTypes(arr).forEach(lecture => {
    const lecuturesArr = arr.filter(item => item.lectureTitle === lecture)
    console.log(arr.filter(item => item.lectureTitle === lecture))
    const lectureTitleRow = document.createElement("tr");
    lectureTitleRow.innerHTML = `<th scope="row" colspan=4 style="text-align: center">${lecture}</th>`;
    elTableShowBody.appendChild(lectureTitleRow)
    lecuturesArr.forEach(lecture => {
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
  console.log()
}

render();

elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if(elFromTime.value < elToTime.value){
      const conferenceArr = JSON.parse(localStorage.getItem("conferences")) ? JSON.parse(localStorage.getItem("conferences")) : [];
      const newConference = {
        id: conferenceArr[conferenceArr.length - 1] ? conferenceArr[conferenceArr.length - 1].id + 1 : 0,
        fullName: `${elSurname.value.charAt(0).toUpperCase() + elSurname.value.slice(1)} ${elName.value[0].toUpperCase()}. ${elSharif.value[0].toUpperCase()}.`,
        lectureTitle: elLectureHeading.value,
        lectureDate: configureDate(elDate),
        startTime: elFromTime.value,
        endingTime: elToTime.value
      }
      conferenceArr.push(newConference);
      localStorage.setItem("conferences", JSON.stringify(conferenceArr))
      render();
    }else {
      alert("Vaqtni to'g'ri kiriting!")
    }
  })
  
  
function configureDate(date){
  return date.value.split("-").reverse().join(".")
}

function filterTypes(arr) {
  const types = [];
  arr.forEach(({lectureTitle}) => {
    if(!types.includes(lectureTitle)){
      types.push(lectureTitle)
    }
  });
  return types;
}