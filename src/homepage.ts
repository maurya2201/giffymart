interface Gifs {
  id: number,
  images: {
    original: {
      url: string
    }},
  title: string
}

enum StatusCode {
  success = 200,
  notfound = 404
}

const url: string = `https://api.giphy.com/v1/gifs/trending?api_key=p3AuEIa3Poh0WuTFAVVL8USukT5Sf33M&rating=g&bundle=messaging_non_clips`;
const listing = document.getElementsByClassName("row")[0];

const getGiffy = async (): Promise<void> => {
  try {
    const data: Response = await fetch(url);
    if (data.status === StatusCode.success) {
      const giffy = await data.json();
      const gifs: Gifs[] = giffy.data;
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
    } else if (data.status === StatusCode.notfound) {
      alert(`Data not found.`)
    }
  } catch (error) {
    console.log(error);
  }
}
getGiffy();

const search = document.getElementsByName("search")[0] as HTMLInputElement;
search.addEventListener('change', async (event): Promise<void> => {
  try {
    const value = (event.target as HTMLInputElement).value;
    const data: Response = await fetch(url);
    if (data.status === StatusCode.success) {
      const giffy = await data.json();
      const gifs: Gifs[] = giffy.data;
      const searchItem: Gifs[] = gifs.filter(({ title }) => title.toLowerCase().includes(value.toLowerCase()));
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
    } else if (data.status === StatusCode.notfound) {
      alert(`Data not found.`);
    }
  } catch (error) {
    console.log(error);
  }
});

function getGif(id: string):void{
  location.href = `gifview.html?id=${id}`;
}
