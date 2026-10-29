var darkLight = document.getElementById('theme-toggle-button')
var html = document.documentElement;
if (localStorage.getItem('theme') === "dark") {
    html.classList.add('dark')
}
else {
    html.classList.remove('dark')
}
darkLight.addEventListener('click', function () {
    toggleTheme();
})
function toggleTheme() {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }
    else {
        html.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////

var cardContainer = document.getElementById('testimonials-carousel')
var card = document.querySelector('.testimonial-card').offsetWidth;
var nextBtn = document.getElementById('next-testimonial')
var preBtn = document.getElementById('prev-testimonial')
var indicators = document.querySelectorAll('.carousel-indicator')

var totalCards = cardContainer.children.length;

console.log(totalCards);


var currentIndex = 0
nextBtn.addEventListener('click', function () {
    currentIndex++;
    console.log(currentIndex);
    if (currentIndex === totalCards - 2) {
        currentIndex = 0
    }
    autoplay()
})


preBtn.addEventListener('click', function () {
    currentIndex--;
    console.log(currentIndex);
    if (currentIndex < 0) {
        currentIndex = totalCards - 3
    }
    autoplay();
})

function autoplay() {
    cardContainer.style.transform = `translateX(${currentIndex * card}px)`
    ubdateIndicators()
}


function ubdateIndicators() {
    for (var i = 0; i < indicators.length; i++) {
        if (i === currentIndex) {
            //    carousel-indicator w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600 transition-all duration-300 hover:scale-125 cursor-pointer
            // carousel-indicator w-3 h-3 rounded-full bg-slate-400 bg-accent transition-all duration-300 hover:scale-125 cursor-pointer
            indicators[i].classList.remove("dark:bg-slate-600", "bg-slate-400")
            indicators[i].classList.add("bg-accent", "scale-125")
        }
        else {
            indicators[i].classList.add("dark:bg-slate-600", "bg-slate-400")
            indicators[i].classList.remove("bg-accent", "scale-125")
        }
    }

    for (var i = 0; i < indicators.length; i++) {
        indicators[i].addEventListener('click', function (e) {
            currentIndex = parseInt(e.currentTarget.getAttribute('data-index'), 10)
            autoplay();
        })
    }
}
autoplay();

/////////////////////////////////////////////////////////////////////////////////////////////////////////

var filterBtns = document.querySelectorAll('.portfolio-filter')
var gridItem = document.querySelectorAll('.portfolio-item')

for (var i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener('click', function (e) {
        // console.log(e.currentTarget.getAttribute("data-filter"));

        var filter = e.currentTarget.getAttribute("data-filter")
        for (var j = 0; j < filterBtns.length; j++) {
            filterBtns[j].classList.remove(
                "active",
                "shadow-primary/50",
                "shadow-lg",
                "bg-linear-to-r",
                "from-primary",
                "to-secondary",
                "text-white",
            );
            filterBtns[j].classList.add(
                "bg-white",
                "dark:bg-slate-800",
                "dark:text-slate-300",
                "text-slate-600",
                "border",
                "border-slate-300",
                "dark:border-slate-700"
            )

        }
        e.currentTarget.classList.remove(
            "bg-white",
            "dark:bg-slate-800",
            "dark:text-slate-300",
            "text-slate-600",
            "border",
            "border-slate-300",
            "dark:border-slate-700")
        e.currentTarget.classList.add(
            "active",
            "shadow-primary/50",
            "shadow-lg",
            "bg-linear-to-r",
            "from-primary",
            "to-secondary",
            "text-white")
        for (let i = 0; i < gridItem.length; i++) {
            gridItem[i].style.transition = "opacity 0.3s, transform 0.3s"
            gridItem[i].style.transform = "scale(0.8)"
            gridItem[i].style.opacity = "0"
            setTimeout(() => {
                gridItem[i].style.display = 'none';
            }, 400)

            var category = gridItem[i].getAttribute("data-category")
            if (filter == category || filter == 'all') {
                setTimeout(() => {
                    gridItem[i].style.display = "block";
                    setTimeout(() => {
                        gridItem[i].style.transition = "opacity 0.3s, transform 0.3s"
                        gridItem[i].style.transform = "scale(1)"
                        gridItem[i].style.opacity = "1"
                    }, 100)
                }, 400)
            }
        }
    })
}
//////////////////////////////////////////////////////////////////////////////
var scrollTop = document.getElementById('scroll-to-top');

window.addEventListener('scroll', function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTop.style.display = "block"
    }
    else {
        scrollTop.style.display = "none"
    }
    scrollTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
})
///////////////////////////////////////////////////////////////////////////////
var navAnchor = document.querySelectorAll('.nav-links a')
var sections = document.querySelectorAll('section')

window.addEventListener('scroll', function () {
    scroolSpy();
})
function scroolSpy() {
    var currentId = "";
    for (var i = 0; i < sections.length; i++) {
        var currentSection = sections[i];

        if (scrollY >= currentSection.offsetTop) {
            currentId = currentSection.getAttribute('id')
        }
    }
    for (var i = 0; i < navAnchor.length; i++) {
        if (navAnchor[i].getAttribute('href') === `#${currentId}`) {
            navAnchor[i].classList.add('active')
        }
        else {
            navAnchor[i].classList.remove('active')
        }
    }
}
//////////////////////////////////////////////////////////////////
const rootElement = document.documentElement;
const openSidebarButton = document.querySelector("#settings-toggle");
const sidebar = document.querySelector("#settings-sidebar");
const closeSidebarButton = document.querySelector("#close-settings");
const fontOptions = document.querySelectorAll(".font-option");
const colorOptions = document.querySelector("#theme-colors-grid");
const resetBtn = document.querySelector("#reset-settings")
function openSidebar() {
    sidebar.classList.remove("translate-x-full");
    openSidebarButton.style.setProperty("right", "20rem");
    sidebar.setAttribute("aria-hidden", "false");

}
function closeSidebar() {
    sidebar.classList.add("translate-x-full");
    openSidebarButton.style.setProperty("right", "0");
    sidebar.setAttribute("aria-hidden", "true");
}
function changeFont(e) {
    const dataOption = e.target.closest("button.font-option");
    if (dataOption) {
        const fontValue = dataOption.dataset.font;
        document.body.classList.remove(`font-alexandria`, `font-tajawal`, `font-cairo`);
        document.body.classList.add(`font-${fontValue}`);
        for (let i = 0; i < fontOptions.length; i++) {
            fontOptions[i].classList.remove("active", "border-primary", "bg-slate-50", "dark:bg-slate-800");
            fontOptions[i].classList.add("border-slate-200", "dark:border-slate-700");

            if (fontOptions[i] === document.querySelector(`button[data-font="${fontValue}"]`)) {
                fontOptions[i].classList.remove("border-slate-200", "dark:border-slate-700");
                fontOptions[i].classList.add("active", "border-primary", "bg-slate-50", "dark:bg-slate-800");
            }
        }
    }
}

function changeThemeColor(e) {
    const colorOption = e.target.closest("button");
    if (colorOption) {
        const primaryColor = colorOption.dataset.primary;
        const secondaryColor = colorOption.dataset.secondary;
        rootElement.style.setProperty("--color-primary", primaryColor);
        rootElement.style.setProperty("--color-secondary", secondaryColor);
        rootElement.style.setProperty("--color-accent", secondaryColor);
        for (let i = 0; i < colorOptions.children.length; i++) {
            colorOptions.children[i].classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
            if (colorOptions.children[i] === colorOption) {
                colorOptions.children[i].classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
            }

        }

    }



}



function resetTheme() {
    closeSidebarButton.click()
    fontOptions[0].click();
    colorOptions.children[0].click()

}

// ========== event listeners ===========//
if (openSidebarButton)
    openSidebarButton.addEventListener("click", openSidebar);
if (closeSidebarButton)
    closeSidebarButton.addEventListener("click", closeSidebar);

if (fontOptions)
    for (let i = 0; i < fontOptions.length; i++) {
        fontOptions[i].addEventListener("click", function (e) {
            changeFont(e);
        });
    }

if (colorOptions)
    colorOptions.addEventListener("click", function (e) {
        changeThemeColor(e);
    })

if(resetBtn)
    resetBtn.addEventListener("click", resetTheme)