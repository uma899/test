const list = [
  {
    id: 1,
    name: "Raju1",
    phone: 121385,
  },
  {
    id: 2,
    name: "Raju2",
    phone: 212385,
  },
  {
    id: 3,
    name: "Raju3",
    phone: 132385,
  },
  {
    id: 4,
    name: "Raju4",
    phone: 124385,
  },
  {
    id: 5,
    name: "Raju5",
    phone: 125385,
  },
  {
    id: 6,
    name: "Raju6",
    phone: 123856,
  },
  {
    id: 7,
    name: "Raju7",
    phone: 123857,
  },
  {
    id: 8,
    name: "Raju8",
    phone: 187235,
  },
  {
    id: 9,
    name: "Raju9",
    phone: 129385,
  },
  {
    id: 10,
    name: "Raju10",
    phone: 120385,
  },  {
    id: 11,
    name: "Raju11",
    phone: 121185,
  },  {
    id: 12,
    name: "Raju12",
    phone: 121285,
  },  
];

const contacts = document.getElementById("contacts");


let screenTotalWidth = screen.width;

window.addEventListener('resize', handleResize);

function handleResize(){
  screenTotalWidth = screen.width;
}


document.addEventListener("DOMContentLoaded", (e) => {

  document.getElementById("search").value = "";
  renderContacts(list);
});

function renderContacts(filteredList) {
  const fragment = document.createDocumentFragment();

  contacts.innerHTML = "";
  filteredList.forEach((e) => {
    const li = document.createElement("li");
    li.innerHTML = `<p style="z-index: 6;">${e.name}</p>`;
    li.setAttribute("id", e.id);
    li.setAttribute("name", e.name);
    li.setAttribute("phone", e.phone);
    fragment.appendChild(li);
  });

  contacts.appendChild(fragment);
}


let debounceTimeout;


search.addEventListener("keyup", (e) => {
  let searchValue = document.getElementById("search").value;

  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    renderContacts(filterList(searchValue));
  }, 200)
});

function filterList(searchValue) {
  if (!searchValue) {
    return list;
  }
  let filteredList = [];
  list.forEach((e) => {
    if (e.name.includes(searchValue)) {
      filteredList.push(e);
    }
  });
  return filteredList;
}

contacts.addEventListener("click", function (event) {
  let redirectURL = `./chat.html?contact=${event.target.getAttribute("phone")}&name=${event.target.getAttribute("name")}`
  if (event.target.tagName === "LI") {
    event.target.innerHTML =
      event.target.innerHTML +
      `<div class='circle' style = "left: ${event.clientX}px"></div>`;

    setTimeout(() => {
      document.querySelector(".circle").remove();
      if (screenTotalWidth >= 700){
        let chatWindow = document.querySelector('iframe');
        chatWindow.setAttribute('src', redirectURL)
      }
      else{
        window.location.href = redirectURL;
      }
    }, 300);
  }
});
