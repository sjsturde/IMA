var isMenuOpen = false;
var activeDropDownIndex = null;
var isSearchOpen = false;

// Event Listeners
var navMenu = document.querySelector(".navbar--container");
var hamburger = document.querySelector(".hamburger");
var navItems = document.querySelectorAll(".navbar--item--inner");
var mobile_xs = document.querySelectorAll(".mobile_x");
var dropdown_xs = document.querySelectorAll(".dropdown_x");
var mobile_backs = document.querySelectorAll(".mobile_back_arrow");
var newfields_mobile = document.querySelector(".newfields_mobile");

hamburger.addEventListener("click", toggleMenu);

//DESKTOP dropdown menu
for (var i = 0; i < navItems.length; i++) {
    var navItem = navItems[i];
    (function (j) {
        navItem.addEventListener("click", function (e) {
            handleNavClick(j);
        });
    })(i);
}

//MOBILE closes
for (var i = 0; i < mobile_xs.length; i++) {
    var mobile_x = mobile_xs[i];
    (function (j) {
        mobile_x.addEventListener("click", toggleMenu);
    })(i);
}

//DESKTOP closes
for (var i = 0; i < dropdown_xs.length; i++) {
    var dropdown_x = dropdown_xs[i];
    (function (j) {
        dropdown_x.addEventListener("click", closeDropDownMenu);
    })(i);
}

//MOBILE return main nav
for (var i = 0; i < mobile_backs.length; i++) {
    var mobile_back_arrow = mobile_backs[i];
    (function (j) {
        mobile_back_arrow.addEventListener("click", returnDropDown);
    })(i);
}

//mobile menu
function toggleMenu() {
    if (isMenuOpen) {
        closeMenu();
        console.log("menu");
    } else {
        openMenu();
    }
}

//MOBILE return main nav
function returnDropDown() {
    navItems[activeDropDownIndex].parentNode.classList.remove("open");
    navItems[activeDropDownIndex].parentNode.parentNode.classList.remove("open");
    setTimeout(function () {
        newfields_mobile.classList.remove("open");
    }, 300);
    activeDropDownIndex = null;
    newTitle(activeDropDownIndex);
}

//MOBILE menu
function closeMenu() {
    navMenu.classList.remove("open");
    if (activeDropDownIndex != null) {
        navItems[activeDropDownIndex].parentNode.classList.remove("open");
    }
    console.log(activeDropDownIndex);
    isMenuOpen = false;
    activeDropDownIndex = null;
}
function openMenu() {
    navMenu.classList.add("open");
    isMenuOpen = true;
}

//DESKTOP dropdown menu
function handleNavClick(i) {
    console.log("hello");
    if (activeDropDownIndex == null) {
        openDropDownMenu(i);
        activeDropDownIndex = i;
        setTimeout(function () {
            newTitle(activeDropDownIndex);
        }, 250);
    } else if (activeDropDownIndex == i) {
        console.log(activeDropDownIndex, "before close");
        closeDropDownMenu();
        activeDropDownIndex = null;
    } else {
        console.log(activeDropDownIndex, "should be switching");
        switchDropDownMenu(i);
        activeDropDownIndex = i;
    }
}

//DESKTOP dropdown menu
function closeDropDownMenu() {
    navItems[activeDropDownIndex].parentNode.classList.remove("open");
    setTimeout(function () {
        newfields_mobile.classList.remove("open");
    }, 500);
}
function openDropDownMenu(i) {
    navItems[i].parentNode.classList.add("open");
    navItems[i].parentNode.parentNode.classList.add("open");
    newfields_mobile.classList.add("open");
    console.log(activeDropDownIndex, "open_click");
}
function switchDropDownMenu(i) {
    navItems[activeDropDownIndex].parentNode.classList.remove("open");
    setTimeout(function () {
        navItems[i].parentNode.classList.add("open");
    }, 250);
}

////mobile titles
var titles = ["do & see", "shop & eat", "give & join", "educate & learn"];

function newTitle(i) {
    if (activeDropDownIndex == null) {
        document.getElementById("dropdown_header").textContent = "";
    } else {
        document.getElementById("dropdown_header").textContent = titles[activeDropDownIndex];
    }
}

///gallery transform
var gallery_contents = document.querySelectorAll(".featured-gallery-content");
var featured = document.getElementById("do_see--featured-highlighted");

for (i = 0; i < gallery_contents.length; i++) {
    var gallery_content = gallery_contents[i];
    gallery_content.addEventListener("mouseover", function (e) {
        highlight_event(e.currentTarget);
    });
}


function highlight_event(eventTarget) {
    featured.innerHTML = eventTarget.innerHTML;
}