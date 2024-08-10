function smoothScrolling() {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

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

    page1Loading()
  });

  if (localStorage.length > 0) {
    formDiv.style.display = "none";
    main.style.display = "initial";
  }
}

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
  tl.to("#loader",{
    display:"none",
    delay:0.5
  })

  setTimeout(function () {
    clearInterval(loaderInterval);

    page1Loading();
  }, 3100);
}

function page2Animation() {
  var tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page2",
      scroller: "body",
      start: "top -5%",
      end: "top -120%",
      scrub: 2,
    },
  });

  tl2.to("#page2, #page3, #page1-content", {
    backgroundColor: "#388699",
  });
  tl2.to("#page2, #page3", {
    backgroundColor: "#D6E2E5",
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


function page3and4Animation() {
  gsap.to("#page3 .page3-side-content", {
    y: -300,
    scrollTrigger: {
      trigger: "#page3",
      scroller: "body",
      start: "top -15%",
      end: "top -60%",
      scrub: 2,
      pin: true,
      // markers: true,
    },
  });

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page4",
      scroller: "body",
      start: "top 0",
      end: "top -100%",
      scrub: 1,
      pin: true,
    },
  });

  tl.to(
    "#page4-content-inner",
    {
      y: "-12vh",
      duration: 1,
      delay: 0.5,
    },
    "anim"
  );
  tl.from(
    "#h1two",
    {
      opacity: 0,
      duration: 1,
      delay: 0.5,
    },
    "anim"
  );
  tl.to(
    "#page4-content-inner",
    {
      y: "-24.5vh",
      duration: 1,
      delay: 0.5,
    },
    "anim2"
  );
  tl.from(
    "#h1three",
    {
      opacity: 0,
      duration: 1,
      delay: 0.5,
    },
    "anim2"
  );

document.querySelector("#certificate-content h1").innerHTML = localStorage.getItem('username')

}






loadingAnimation()
formDivAppearance();
smoothScrolling()
page2Animation();
page3and4Animation();


// localStorage.clear()