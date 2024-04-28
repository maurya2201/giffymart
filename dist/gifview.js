"use strict";
var Status;
(function (Status) {
    Status[Status["success"] = 200] = "success";
    Status[Status["notfound"] = 404] = "notfound";
})(Status || (Status = {}));
const gifId = new URLSearchParams(location.search);
const gifs = gifId.get("id");
const getOneGif = async () => {
    try {
        const data = await fetch(`https://api.giphy.com/v1/gifs/${gifs}?api_key=p3AuEIa3Poh0WuTFAVVL8USukT5Sf33M&rating=g`);
        if (data.status == Status.success) {
            const gif = await data.json();
            const viewGif = gif.data;
            const { title, id, images: { original: { url } } } = viewGif;
            let viewGifOne = `
  <div onclick="getGif('${id}')" class="card" style="width:"18rem;">
<img src="${url}" class="card-img-top" alt="${title}" loading="lazy">
<div class="card-body">
  <h5 class="card-title">${title}</h5>
</div>
</div>
  `;
            document.body.innerHTML = viewGifOne;
        }
        else if (data.status === Status.notfound) {
            alert(`Data not found`);
        }
    }
    catch (error) {
        console.log(error);
    }
};
getOneGif();
