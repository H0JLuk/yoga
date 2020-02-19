window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //tabs
    let info = document.querySelector('.info-header'),
        infoTabs = document.querySelectorAll('.info-header-tab'),
        infoTabsContent = document.querySelectorAll('.info-tabcontent');

    hideTabs();
    function hideTabs() {
        for (let i = 0; i < infoTabsContent.length; i++) {
            infoTabsContent[i].classList.remove('show');
            infoTabsContent[i].classList.add('hide');
        }
    }
    showTab(0);
    function showTab(elem) {
        if (infoTabsContent[elem].classList.contains('hide')) {
            infoTabsContent[elem].classList.remove('hide');
            infoTabsContent[elem].classList.add('show');
        }
    }

    info.addEventListener('click', (event) => {
        let target = event.target;
        
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < infoTabs.length; i++) {
                if (target == infoTabs[i]) {
                    hideTabs();
                    showTab(i);
                }
            }
        }     
    });

    // slider; click on 4 bottom rectangles
    let sliderMenu = document.querySelector('.slider-dots'),
        sliderBtn = document.querySelectorAll('.dot'),
        sliderContent = document.querySelectorAll('.slider-item'),
        prevBtn = document.querySelector('.prev'),
        nextBtn = document.querySelector('.next');

    hideSliders();
    showSlider(0);

    function showSlider(item) {
        if (sliderContent[item].classList.contains('hide')) {
            sliderContent[item].classList.remove('hide');
            sliderContent[item].classList.add('show');
            sliderBtn[item].style.backgroundColor = '#c78030';
        }
    }

    function hideSliders() {
        for (let i = 0; i < sliderBtn.length; i++) {
            if (sliderContent[i].classList.contains('hide')) {
                continue;
            }
            sliderContent[i].classList.remove('show');
            sliderContent[i].classList.add('hide');
            sliderBtn[i].style.backgroundColor = '#000';
        }
    }

    sliderMenu.addEventListener('click', (event) => {
        let target = event.target;

        if (target && target.classList.contains('dot')) {
            for (let i = 0; i < sliderBtn.length; i++) {
                if (target == sliderBtn[i]) {
                    hideSliders();
                    showSlider(i);
                }
            }
        }
    });

    // slider; click on arrow
    nextBtn.addEventListener('click', next);
    function next() {
        for (let i = 0; i < sliderContent.length; i++) {
            if (sliderContent[i].classList.contains('show')) {

                if (i != 3) {
                    hideSliders();
                    showSlider(i + 1);
                    return;
                } else {
                    hideSliders();
                    showSlider(0);
                    return;
                }
            }
        }
    }

    prevBtn.addEventListener('click', prev);
    function prev() {
        for (let i = 0; i < sliderBtn.length; i++) {
            if (sliderContent[i].classList.contains('show')) {
                if (i) {
                    hideSliders();
                    showSlider(i-1);
                    return;
                } else {
                    hideSliders();
                    showSlider(sliderBtn.length - 1);
                    return;
                }
            }
        }
    }

    // Timer
    let deadline = '2022-2-1';

    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/1000/60) / 60 % 24);
            // hours = Math.floor((t/1000/3600) % 24),
            // days = Math.floor((t/1000/3600) / 24);

        return {
            'total': t,
            // 'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            // days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
        
        function updateClock() {
            let t = getTimeRemaining(endTime);

            for (let i in t) {
                if (t[i] == t.total) continue;
                if (t[i] < 10) {
                    t[i] = '0' + t[i];
                }
            }

            // days.textContent = t['days'];
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
                // days.textContent = 0;
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);
});