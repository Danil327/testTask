
    const imagesBlock = document.querySelectorAll('.image-block'),
          allImages = document.querySelectorAll('.image-block > img'),
          wrapper = document.querySelector('.image-wrapper'),
          countBlock = document.querySelector('.count-image > span'),
          dateBlock = document.querySelector('.current-date > span'),
          overlay = document.querySelector('.overlay'),
          imageBig = document.querySelector('.image-big'),
          modalClose = document.querySelector('.modal-close'),
          hideBtn = document.querySelectorAll('.image-hide'),
          recoveryBtn = document.querySelector('.recovery-button');

    countBlock.textContent = imagesBlock.length;

    //Добавление нуля
    const addZero = (time) => {
        if (time < 10) {
            return time = `0${time}`
        } else {
            return time;
        }
    }
    // Форматирование даты
    const setCurrentTime = () => {
        const date = new Date(),
              day = addZero(date.getDate()),
              month = addZero(date.getMonth() + 1),
              hours = addZero(date.getHours()),
              minutes = addZero(date.getMinutes());

        dateBlock.textContent = `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;

        setInterval(() => {
            setCurrentTime();
        }, 1000);
    }
    setCurrentTime();

    // Открытие больших фото
    wrapper.addEventListener('click', (e) => {
        if (e.target && e.target.tagName === 'IMG') {
            overlay.style.display = 'block';
            allImages.forEach(item => {
                if (e.target === item) {
                    imageBig.src = item.src;
                }
            })
        }
    });
    //Закрытие
    modalClose.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    // Скрытие фото
    let arr = [];
    let arrHideImages = JSON.parse(localStorage.getItem('hideImages'));
    
    if (arrHideImages) {
        arr = arrHideImages;
    }

    wrapper.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('image-hide')) {

            hideBtn.forEach((item, i) => {
                if (e.target === item) {    
                    imagesBlock[i].style.display = 'none';
                    arr.push(imagesBlock[i].id);
                    localStorage.setItem('hideImages', JSON.stringify(arr));
                }
            })
        }
        countBlock.textContent -= 1;
    });


    hideItemsFromPage = () => {
        arrHideImages = JSON.parse(localStorage.getItem('hideImages'));
        
        if (arrHideImages) {
            arrHideImages.forEach(item => {
                imagesBlock[item-1].style.display = 'none';
            })
            countBlock.textContent = imagesBlock.length - arrHideImages.length;
        }   
    }
    hideItemsFromPage();

    // Восстановление фото
    recoveryBtn.addEventListener('click', () => {
        imagesBlock.forEach(item => {
            item.style.display = 'block';
            localStorage.clear();
            arr = [];
        });
        countBlock.textContent = imagesBlock.length;
    });
