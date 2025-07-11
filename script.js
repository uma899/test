const list = [
  {
    id: 1,
    name: "Uma1",
    phone: 121385,
  },
  {
    id: 2,
    name: "Uma2",
    phone: 212385,
  },
  {
    id: 3,
    name: "Uma3",
    phone: 132385,
  },
  {
    id: 4,
    name: "Uma4",
    phone: 124385,
  },
  {
    id: 5,
    name: "Uma5",
    phone: 125385,
  },
  {
    id: 6,
    name: "Uma6",
    phone: 123856,
  },
  {
    id: 7,
    name: "Uma7",
    phone: 123857,
  },
  {
    id: 8,
    name: "Uma8",
    phone: 187235,
  },
  {
    id: 9,
    name: "Uma9",
    phone: 129385,
  },
];

const fragment = document.createDocumentFragment();
const contacts = document.getElementById("contacts");

list.forEach((e) => {
  const li = document.createElement("li");
  li.innerHTML = `<p style="z-index: 6;">${e.name}</p>`;
  li.setAttribute("id", e.id);
  li.setAttribute("name", e.name);
  li.setAttribute("phone", e.phone);
  fragment.appendChild(li);
});

contacts.appendChild(fragment);

contacts.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    event.target.innerHTML =
      event.target.innerHTML +
      `<div class='circle' style = "left: ${event.clientX}px"></div>`;

    setTimeout(() => {
      document.querySelector('.circle').remove()
      window.location.href = `./chat.html?contact=${event.target.getAttribute(
        "phone"
      )}&name=${event.target.getAttribute("name")}`;
    }, 300);
  }
});
