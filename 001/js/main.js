fetch('./js/itemData.json')
  .then(res => res.json())
  .then(itemData => {
    const gridItems = document.querySelector('#grid-items');
    const pageNumber = document.querySelector('.pageNumber');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let page = 0;
    const step = 4;
    const maxPage = Math.floor(itemData.length / step);

    const setItem = () => {
      let htmlText = '';
      const count =
        itemData.length - page * step > step
          ? step
          : itemData.length - page * step;
      for (let i = 0; i < count; i++) {
        const currentNumber = page * step + i;
        const currentItem = itemData[currentNumber];
        const num = ('00' + (i + 1)).slice(-2);
        htmlText += `
          <li class="item${num}">
            <h2 class="title">${currentItem.title}</h2>
            <figure>
              <img src="./images/${currentItem.imgFileName}" alt="">
              </figure>
              <p class="description">${currentItem.description}</p>
          </li>
        `;
        gridItems.innerHTML = htmlText;
      }
    };

    setItem();

    leftArrow.addEventListener('click', () => {
      page > 0 && page--;
      pageNumber.textContent = page + 1;
      setItem();
    });
    rightArrow.addEventListener('click', () => {
      maxPage > page && page++;
      pageNumber.textContent = page + 1;
      setItem();
    });
  });
