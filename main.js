"strict mode";
function toggleShow() {
  var el = document.getElementById("box");
  el.classList.toggle("show");
}

//

let stuf1 = document.querySelector(".stuf1");
let stuf2 = document.querySelector(".stuf2");
let headContainer = document.querySelector(".head-container");
let header = document.querySelector("header");
let popularSEC = document.querySelector(".popular-now");
let sections = document.querySelectorAll(".sections");
let lis = document.querySelectorAll(".nav-child");
let cartnav = document.querySelector(".cartnav");
let shopingcart = document.querySelector(".shoping-cart");
let popular = document.querySelectorAll(".cnt1");
let shopcontainer = document.querySelector(".shopconts");
let total = document.querySelector(".total");
let calose = document.querySelector(".gg-close");
let clearall = document.querySelector(".clear");
console.log(clearall);

let scroll = function () {
  lis.forEach((li) => {
    li.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(e.target.getAttribute("href"));
      const id = e.target.getAttribute("href");
      console.log(id);
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    });
  });
};
scroll();

let remove = function () {
  header.classList.remove("headerHid");
  stuf1.classList.remove("stuf1hid");
  stuf2.classList.remove("stuf2hid");
  headContainer.classList.remove("head-containerhid");
};
remove();

let callback = function (entrys) {
  let [entry] = entrys;

  if (entry.isIntersecting) {
    entry.target.classList.remove("sectionshid");
  }
};
const observer = new IntersectionObserver(callback, {
  root: null,
  threshold: 0.2,
});
sections.forEach((section) => {
  section.classList.add("sectionshid");
  observer.observe(section);
});

//--------------------displaying the map

navigator.geolocation.getCurrentPosition(function (cords) {
  let { latitude, longitude } = cords.coords;
  geo(latitude, longitude);
});
const geo = function (lat, long) {
  const map = L.map("map").setView([lat, long], 12);

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
  ).addTo(map);

  let personicon = L.icon({
    iconUrl: "/imgs/personicon.png",
    shadowUrl: "",

    iconSize: [70, 70], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
  let coffeeicon = L.icon({
    iconUrl: "/imgs/coffeemap.png",
    shadowUrl: "",

    iconSize: [50, 50], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  L.marker([lat, long], { icon: coffeeicon })
    .addTo(map)
    .bindPopup("we locate here.");
};

// end map
// 34.2591840501, -6.5842530004

// show the cart
let containerbig = document.querySelector(".shopconts");
// clearall.addEventListener("click", function () {
//   containerbig.removeChild(".shopcont");
//   console.log("nice");
// });
let newtotl = 0;
cartnav.addEventListener("click", function () {
  shopingcart.classList.toggle("shopcartHid");
  let can = document.querySelectorAll(".trashcan");

  can.forEach((c) => {
    c.addEventListener("click", function (e) {
      let total = +document
        .querySelector(".total")
        .textContent.replace("$", "");
      let current = e.target;
      let currentPricee = current
        .closest(".jnab")
        .querySelector(".shopPrice").textContent;

      let price = Number(currentPricee);
      console.log(price);
      let currentContainer = current.closest(".shopcont");

      currentContainer.remove();
      // newtotl= price
      document.querySelector(".total").textContent = total -= price;
      // console.log(total - price);
      // console.log((total -= price));
      console.log(total);
    });
  });
});

let idk = 0;
let all = 0;
popular.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // let traash = document.querySelector(".trashcan");
    let current = e.target.closest(".popular-container");

    let pic = current.querySelector(".cnt1-div1").dataset.name;
    let name = current.querySelector("h3").textContent;
    let price = +current.querySelector("span").textContent;
    let html = ` <div class="shopcont">
    <img src="/imgs/cofeepics/${pic}.jpg" alt="" />
   <div class="shopconttext">
   <div> 
       <h2><span> ${name}</span></h2>
       <h4>quality 1</h4>
   </div>
   <div class='jnab'> 
   <h3><span class="shopPrice">${price}</span>$</h3>
   <div class='trashcan'><img src="/imgs/delete.png" class='' alt=""> </div>
   
  </div>
        
   
   </div>
  </div>`;

    // console.log(trash);
    all = price += idk;
    idk = price;

    // trash.addEventListener("click", function () {
    //   console.log("deleted");
    // });

    total.textContent = `${all}$`;
    // shopcontainer.insertAdjacentElement("afterbegin", html);
    shopcontainer.insertAdjacentHTML("beforeend", html);
  });
});

calose.addEventListener("click", function () {
  shopingcart.classList.add("shopcartHid");
});
// end show cart

// stig]ky nav
let viewtop = document.querySelector(".top");

let callaback = (entries, observer) => {
  let [entrie] = entries;
  if (!entrie.isIntersecting) {
    document.querySelector(".top").classList.add("headshowr");
    document.querySelector(".shoping-cart").style.marginTop = "9rem";
  } else {
    document.querySelector(".top").classList.remove("headshowr");
    document.querySelector(".shoping-cart").style.marginTop = "0";
  }
};
let options = { root: null, threshold: 0, rootMargin: "-460px" };
const ob = new IntersectionObserver(callaback, options);
ob.observe(document.querySelector("header"));

// trash delete

window.addEventListener("load", () => {
  document.querySelector(".preload").style.display = "none";
  document.body.style.overflow = "unset";
});
