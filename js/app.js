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