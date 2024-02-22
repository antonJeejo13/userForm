const name = document.querySelector("#name");
const email = document.querySelector("#email");
const age = document.querySelector("#age");
const contact = document.querySelector("#contact");

const submitBtn = document.querySelector("button");
const tbody = document.querySelector("tbody");

let users = [];

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (!name.value || !email.value || !age.value || !contact.value) {
    alert("Please enter user details");
    return;
  }
  const userData = {
    name: name.value,
    email: email.value,
    age: age.value,
    contact: contact.value,
  };
  users.push(userData);
  saveToStorage();
  displayData();
  name.value = "";
  email.value = "";
  age.value = "";
  contact.value = "";
});

function displayData() {
  tbody.innerHTML = "";
  users.forEach((user, index) => {
    const tr = document.createElement("tr");
    const nameData = document.createElement("td");
    const emailData = document.createElement("td");
    const ageData = document.createElement("td");
    const contactData = document.createElement("td");
    const button = document.createElement("button");

    nameData.innerText = user.name;
    emailData.innerText = user.email;
    ageData.innerText = user.age;
    contactData.innerText = user.contact;
    button.innerText = "Delete";
    button.onclick = function () {
      deleteUser(index);
    };

    tr.append(nameData);
    tr.append(emailData);
    tr.append(ageData);
    tr.append(contactData);
    tr.append(button);
    tbody.append(tr);
  });
}

function deleteUser(id) {
  users = users.filter((user, index) => index !== id);
  saveToStorage();
  displayData();
}

//browser storage only string, number and boolean
function saveToStorage() {
  localStorage.setItem("usersData", JSON.stringify(users));
}

function initialData() {
  let storageData = localStorage.getItem("usersData");
  if (storageData) {
    users = JSON.parse(storageData);
    displayData();
  }
}

initialData();
