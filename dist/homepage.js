"use strict";
sessionStorage.setItem("disabled", JSON.stringify(true));
const buttonState = JSON.parse(sessionStorage.getItem("disabled") ?? "false");
sessionStorage.setItem("limit", JSON.stringify(10));
let limit = JSON.parse(sessionStorage.getItem("limit") ?? "0");
let offset = JSON.parse(sessionStorage.getItem("offset") ?? "0");
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["success"] = 200] = "success";
    StatusCode[StatusCode["notfound"] = 404] = "notfound";
})(StatusCode || (StatusCode = {}));
const listing = document.getElementsByClassName("row")[0];
const getGiffy = async () => {
    try {
        const data = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=9GaVk1p91HoQYGpAnDTcGEYnlXP9Hbyp&limit=${limit}&offset=${offset}&rating=g&bundle=messaging_non_clips`);
        if (data.status === StatusCode.success) {
            const giffy = await data.json();
            const gifs = giffy.data;
            let gif = ``;
            gifs.forEach(({ id, title, images }) => {
                gif += `
    <div class="col-4">
    <div onclick="getGif('${id}')" class="card" style="width: 18rem;">
  <img src="${images.original.url}" loading="lazy" height="150px" width="200px" class="card-img-top" alt="${title}">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
  </div>
</div>
</div>
    `;
            });
            listing.innerHTML = gif;
        }
        else if (data.status === StatusCode.notfound) {
            alert(`Data not found.`);
        }
    }
    catch (error) {
        console.log(error);
    }
};
getGiffy();
const search = document.getElementsByName("search")[0];
search.addEventListener('change', async (event) => {
    try {
        const value = event.target.value;
        const data = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=9GaVk1p91HoQYGpAnDTcGEYnlXP9Hbyp&rating=g&bundle=messaging_non_clips`);
        if (data.status === StatusCode.success) {
            const giffy = await data.json();
            const gifs = giffy.data;
            const searchItem = gifs.filter(({ title }) => title.toLowerCase().includes(value.toLowerCase()));
            let gif = ``;
            searchItem.forEach(({ id, title, images }) => {
                gif += `
    <div class="col-4">
    <div onclick="getGif('${id}')" class="card" style="width: 18rem;">
  <img src="${images.original.url}" loading="lazy" height="100px" width="100px" class="card-img-top" alt="${title}">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
  </div>
</div>
</div>
    `;
            });
            listing.innerHTML = gif;
        }
        else if (data.status === StatusCode.notfound) {
            alert(`Data not found.`);
        }
    }
    catch (error) {
        console.log(error);
    }
});
function getGif(id) {
    location.href = `gifview.html?id=${id}`;
}
const nextButton = document.getElementById("next");
nextButton.addEventListener("click", () => {
    if (offset === 50) {
        nextButton.disabled = buttonState;
    }
    else {
        sessionStorage.setItem("offset", JSON.stringify(offset + 10));
        alert(`Loading next data!`);
        location.reload();
    }
});
const previousButton = document.getElementById("previous");
previousButton.addEventListener("click", () => {
    if (offset === 10) {
        previousButton.disabled = buttonState;
    }
    else {
        sessionStorage.setItem("offset", JSON.stringify(offset - 10));
        alert(`Loading previous data!`);
        location.reload();
    }
});
