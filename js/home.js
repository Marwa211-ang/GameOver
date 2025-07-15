// ? =============> Global ===============>
   const links = document.querySelectorAll(".menu a");
let gamesData = [];
const loading = document.querySelector(".loading");
const mode = document.getElementById("mode");
// ! =============> When Start ===============>
   
getGames("mmorpg");

if (localStorage.getItem("theme") != null) {
   const themeData = localStorage.getItem("theme"); // light Or dark

   if (themeData === "light") {
      mode.classList.replace("fa-sun", "fa-moon"); // sun to moon
   } else {
      mode.classList.replace("fa-moon", "fa-sun"); // moon to sun
   }

   document.querySelector("html").setAttribute("data-theme", themeData); // light Or dark
}
// * =============> Events ===============>

for (let i = 0; i < links.length; i++) {
   links[i].addEventListener("click", function (e) {
      document.querySelector(".menu .active").classList.remove("active");
      links[i].classList.add("active");

      const category = e.target.innerText; // shoter mmobe pvp

      console.log(category); //log data

      getGames(category); //connect api
   });
}

document.querySelector(".logout-btn").addEventListener("click", function () {
   localStorage.removeItem("uToken");
   location.href = "./index.html";
});

mode.addEventListener("click", function (e) {
   if (mode.classList.contains("fa-sun")) {
      document.querySelector("html").setAttribute("data-theme", "light");
      mode.classList.replace("fa-sun", "fa-moon"); // change icon -->moon

      localStorage.setItem("theme", "light");
   } else {
      mode.classList.replace("fa-moon", "fa-sun"); //change icon -->sun
      document.querySelector("html").setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
   }
});

// ! =============> Functions ===============>

async function getGames(categoryName) {
   loading.classList.remove("d-none"); //show loading

   const options = {
      method: 'GET',
      headers: {
         'x-rapidapi-key': 'd9ffe42252mshc6f362b36e765dep1ba662jsnc26d0d2204c6',
         'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
   };

   const apiResponse = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`,
      options
   );
   const data = await apiResponse.json();
   console.log(data); // log data api
   gamesData = data;
   displayData();
   loading.classList.add("d-none"); // اظهار التحميل
}

function displayData() {
   // [{},{}]
   let gamesBox = ``;
   for (let i = 0; i < gamesData.length; i++) {
      let videoPath = gamesData[i].thumbnail.replace("thumbnail.jpg", "videoplayback.webm"); /// https://www.freetogame.com/g/540/thumbnail.jpg

      gamesBox += `
      <div class="col">
      <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" onclick="showDetails(${gamesData[i].id})" class="card h-100 bg-transparent" role="button" >
         <div class="card-body">

            <figure class="position-relative">
               <img class="card-img-top object-fit-cover h-100" src="${gamesData[i].thumbnail}" />

             <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
              <source src="${videoPath}">
              </video>

            </figure>

            <figcaption>

               <div class="hstack justify-content-between">
                  <h3 class="h6 small"> ${gamesData[i].title} </h3>
                  <span class="badge text-bg-primary p-2">Free</span>
               </div>

               <p class="card-text small text-center opacity-50">
                  ${gamesData[i].short_description}
               </p>

            </figcaption>
         </div>

         <footer class="card-footer small hstack justify-content-between">

            <span class="badge badge-color">${gamesData[i].genre}</span>
            <span class="badge badge-color">${gamesData[i].platform}</span>

         </footer>
      </div>
   </div>
      `;
   }

   document.getElementById("gameData").innerHTML = gamesBox;
}

function startVideo(event) {
   const videoEl = event.currentTarget.querySelector("video");
   videoEl.classList.remove("d-none");
   videoEl.muted = true;

   videoEl.play().catch((error) => {
      if (error.name !== "AbortError") {
         console.error("Video play error:", error);
      }
   });
}

function stopVideo(event) {
   const videoEl = event.currentTarget.querySelector("video");
   videoEl.pause(); // نوقف أولاً
   videoEl.classList.add("d-none");
}


function showDetails(id) {
   location.href = `details.html?id=${id}`;
}




   
   
