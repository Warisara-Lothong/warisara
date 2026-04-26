//
// Variables
//
const list          = document.getElementById("list");
const showGPAResult = document.getElementById("show-gpa-result");
const showHistory   = document.getElementById("show-history");
const buttonAdd     = document.getElementById("buttonAdd");
const buttonReset   = document.getElementById("buttonReset");
const buttonCal     = document.getElementById("buttonCal");

console.log(list)
console.log(showGPAResult)
console.log(showHistory)
console.log(buttonAdd)
console.log(buttonReset)
console.log(buttonCal)

//
// Methods
//
// function handleReset() {
//   console.log("Handle Reset")
// }
// buttonReset.addEventListener("click",handleReset)

// function handleAdd() {
//   console.log("Handle Add")
// }
// buttonAdd.addEventListener("click",handleAdd)

// function handleCal() {
//   console.log("Handle Calculate")
// }
// buttonCal.addEventListener("click",handleCal)

//ฟังก์ชัน เริ่มด้วยการตั้งชื่อ เขียนสั่งปริ้นว่าจะขึ้นอะไรหลังจากทำกิจกรรมใดๆ ต่อมาเอาตัวแปรมาใส่และเพิ่มกิจกรรม


// Inits & Event Listeners
//
buttonAdd.addEventListener("click", handleAdd);
buttonReset.addEventListener("click", handleReset);
buttonCal.addEventListener("click", handleCal);

function handleAdd() {
  list.classList.remove("hidden");
  list.insertAdjacentHTML(
    "beforeend",
    `<div class="row grid grid-cols-3 gap-3 pt-3">
      <input
        type="text"
        placeholder="Subject"
        class="subject bg-base border border-stone-200 px-3 py-2 rounded-sm w-full outline-none focus:border-lime focus:ring-1 focus:ring-lime/20 transition-all duration-150 text-sm"
      />
      <select
        class="grade bg-base border border-stone-200 px-3 py-2 rounded-sm w-full outline-none focus:border-lime focus:ring-1 focus:ring-lime/20 transition-all duration-150 text-sm"
      >
        <option value="" disabled selected>GPA</option>
        <option value="4">4</option>
        <option value="3.5">3.5</option>
        <option value="3">3</option>
        <option value="2.5">2.5</option>
        <option value="2">2</option>
        <option value="1.5">1.5</option>
        <option value="1">1</option>
      </select>
      <input
        type="text"
        placeholder="Credit"
        class="credit bg-base border border-stone-200 px-3 py-2 rounded-sm w-full outline-none focus:border-lime focus:ring-1 focus:ring-lime/20 transition-all duration-150 text-sm"
      />
    </div>`
  );
}

function handleReset() {
  list.innerHTML = "";
  list.classList.add("hidden");
}

function getRowsData() {
  const rows = document.querySelectorAll(".row");
  let data = [];

  rows.forEach((row) => {
    const subject = row.querySelector(".subject").value;
    const gpa     = Number(row.querySelector(".grade").value);
    const credit  = Number(row.querySelector(".credit").value);

    if (!subject || gpa <= 0 || credit <= 0) return;

    data.push({ subject, gpa, credit });
  });

  return data;
}
function calculateGPA(data) {
  let totalCredit = 0;
  let totalPoint = 0;

  data.forEach((d) => {
    totalPoint += d.gpa * d.credit;
    totalCredit += d.credit;
  });

  return {
    gpa: totalPoint / totalCredit,
    totalPoint,
    totalCredit,
  };
}
function handleCal() {
  const rowData = getRowsData();

  if (rowData.length === 0) {
    throw new Error("Data Empty");
  }

  const avgGPA = calculateGPA(rowData);

  showGPAResult.classList.remove("hidden");
  showGPAResult.innerHTML = `<p>GPA: ${avgGPA.gpa.toFixed(2)}</p>`;
}