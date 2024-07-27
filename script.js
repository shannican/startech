function locomotiveSetup() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
// locomotiveSetup()

function formDivAppearance() {
  var formDiv = document.querySelector("#form-div");
  var form = document.querySelector("form");
  var main = document.querySelector("#main");
  var input = document.querySelector("form input");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var user = input.value;
    localStorage.setItem("username", user);
    formDiv.style.display = "none";
    main.style.display = "initial";
  });

  if (localStorage.length > 0) {
    formDiv.style.display = "none";
    main.style.display = "initial";
  }
}

formDivAppearance();

function page1Loading() {
  let tl = gsap.timeline();

  tl.from("#page1-hero img", {
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    delay: 0.3,
  });
  tl.from(
    "#page1-hero h3",
    {
      y: 20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.2,
    },
    "-=0.6"
  );
  tl.from(
    "#bg-img1",
    {
      x: -100,
      duration: 0.4,
    },
    "-=0.6"
  );
  tl.from(
    "#bg-img2",
    {
      x: 100,
      duration: 0.4,
    },
    "-=0.6"
  );
}
function loadingAnimation() {
  var growth = document.querySelector(".loader-growth");
  var loader = document.querySelector("#loader");
  var grow = 0;

  var loaderInterval = setInterval(function () {
    grow++;

    growth.style.width = grow + "%";
  }, 18);

  gsap.to("#loader img", {
    rotate: 60,
    duration: 10,
  });

  let tl = gsap.timeline();

  tl.to("#loader img", {
    delay: 2.3,
    opacity: 0,
  });
  tl.to(".loader-text", {
    opacity: 0,
  });
  tl.to("#loader", {
    top: "-100%",
  });

  setTimeout(function () {
    clearInterval(loaderInterval);

    page1Loading();
  }, 3100);
}
page1Loading();

function page2Animation() {
  gsap.to("#page2", {
    backgroundColor: "#388699",
    scrollTrigger: {
      trigger: "#page2",
      scroller: "body",
      start: "top 0%",
      end: "top -20%",
      scrub: 2,
    },
  });
  var page2h2 = document.querySelector("#page2-content-text h2").textContent;

  var splittedText = page2h2.split(" ");

  var clutter = "";

  splittedText.forEach(function (elem) {
    clutter += `<span>${elem}</span> `;
    // console.log(elem)
  });

  document.querySelector("#page2-content-text h2").innerHTML = clutter;

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page2-content-text h2",
      start: "top 75%",
      end: "top 45%",
      scrub: 3,
    },
  });
  tl.from("#page2-content-text h4", {
    opacity: 0,
    duration: 0.5,
  });
  tl.from("#page2-content-text h2 span", {
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    y: 15,
  });
  tl.from("#page2-content-text p", {
    opacity: 0,
    duration: 0.6,
  });
}

page2Animation()


