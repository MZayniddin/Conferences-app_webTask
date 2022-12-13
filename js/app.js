const elForm = document.querySelector(".form");
const elName = document.querySelector("#name");
const elSurname = document.getElementById("surname");
const elSharif = document.getElementById("sharif");
const elDate = document.getElementById("date");
const elFromTime = document.getElementById("from");
const elToTime = document.getElementById("to");
const elLectureHeading = document.getElementById("seksiya");
const elTableShowBody = document.getElementById("table-show__body");
const elTitle = document.getElementById("title");

// RENDER
function render() {
  const arr = JSON.parse(localStorage.getItem("conferences"))
    ? JSON.parse(localStorage.getItem("conferences"))
    : [];
  elTableShowBody.innerHTML = "";
  const lectureSubjects = filterType(arr);
  lectureSubjects.forEach((lectureSub) => {
    const lectures = arr.filter((item) => item.lectureSubject === lectureSub);
    const elLectureSubjectRow = document.createElement("tr");
    elLectureSubjectRow.innerHTML = `<th colspan="4" style="text-align: center" >${lectureSub}</td>`;
    elTableShowBody.appendChild(elLectureSubjectRow);
    lectures.forEach(
      ({id, lectureDate, startTime, endingTime, lectureTitle, fullName }) => {
        const lectureDataRow = document.createElement("tr");
        lectureDataRow.innerHTML = `
        <td>${lectureDate}</td>
        <td>${startTime} - ${endingTime}</td>
        <td>${lectureTitle}</td>
        <td>${fullName}</td>
        <td><i style="cursor: pointer;" data-row-id="${id}" class="fa-solid fa-trash"></i></td>
      `;
        elTableShowBody.appendChild(lectureDataRow);
      }
    );
  });
};
render()

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (elFromTime.value < elToTime.value) {
    const conferenceArr = JSON.parse(localStorage.getItem("conferences"))
      ? JSON.parse(localStorage.getItem("conferences"))
      : [];
    const newConference = {
      id: conferenceArr[conferenceArr.length - 1]
        ? conferenceArr[conferenceArr.length - 1].id + 1
        : 0,
      fullName: `${
        elSurname.value.charAt(0).toUpperCase() + elSurname.value.slice(1)
      } ${elName.value[0].toUpperCase()}. ${elSharif.value[0].toUpperCase()}.`,
      lectureSubject: elLectureHeading.value,
      lectureDate: configureDate(elDate),
      startTime: elFromTime.value,
      endingTime: elToTime.value,
      lectureTitle: elTitle.value,
    };
    conferenceArr.push(newConference);
    localStorage.setItem("conferences", JSON.stringify(conferenceArr));
    render();
  } else {
    alert("Vaqtni to'g'ri kiriting!");
  }
});

//SEARCH

const elFormSearch = document.getElementById("search");
const elTableSearchB = document.getElementById("table-search__body");
const elDateSearch = document.getElementById("s-date");
const elSubjectSearch = document.getElementById("search-seksiya");
const elSpeakerName = document.getElementById("s-speaker");
const elSearchShow = document.getElementById("table-search__body");

elFormSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    elDateSearch.value ||
    elSubjectSearch.value !== "Menyuni ochish" ||
    elSpeakerName.value
  ) {
    const conferenceArr = JSON.parse(localStorage.getItem("conferences"));
    if (filterSearch(conferenceArr).length > 0) {
      renderSearchRusult(filterSearch(conferenceArr));
    } else {
      alert("Hech qanday ma'lumot topilmadi!");
    }
  } else {
    alert("Qidiruv uchun ma'lumot kiriting!");
  }
});

// RENDER SEARCH RESULT
function renderSearchRusult(arr) {
  elTableSearchB.innerHTML = "";
  let counter = 1;
  arr.forEach(({lectureDate, startTime, endingTime, lectureSubject, lectureTitle, fullName}) => {
    const elTableRow = document.createElement("tr");
    elTableRow.innerHTML = `
    <td>${counter++}</td>
    <td>${lectureDate} ${startTime} - ${endingTime}</td>
    <td>${lectureSubject}</td>
    <td>${fullName} - ${lectureTitle}</td>
    `;
    elTableSearchB.appendChild(elTableRow);
  });
}

//DELETE
elTableShowBody.addEventListener("click", (e) => {
  if(e.target.classList.contains("fa-trash")){
    console.log(e.target.dataset.rowId);
    const conferenceArr = JSON.parse(localStorage.getItem("conferences"));
    const removeId = conferenceArr.findIndex(lecture => lecture.id == e.target.dataset.rowId);
    conferenceArr.splice(removeId, 1);
    localStorage.setItem("conferences", JSON.stringify(conferenceArr));
    render();
  }
})

// FUNCTIONS
function filterSearch(arr) {
  let resultArr = [];
  if (elSubjectSearch.value !== "Menyuni ochish") {
    resultArr = arr.filter(
      (item) => item.lectureSubject === elSubjectSearch.value
    );
  }
  if (elDateSearch.value) {
    resultArr = resultArr.filter(
      (item) => item.lectureDate === configureDate(elDateSearch)
    );
  }
  if (elSpeakerName.value) {
    const nameRegex = new RegExp(elSpeakerName.value, "gi");
    resultArr = resultArr.filter((item) => item.fullName.match(nameRegex));
  }
  return resultArr.sort((a, b) => a.lectureDate.localeCompare(b.lectureDate));
}

function filterType(arr) {
  let types = [];
  arr.forEach(({ lectureSubject }) => {
    if (!types.includes(lectureSubject)) {
      types.push(lectureSubject);
    }
  });
  return types;
}

function configureDate(date) {
  return date.value.split("-").reverse().join(".");
}
