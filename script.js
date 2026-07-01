document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.getElementById("navbar");
  var scrollUpBtn = document.getElementById("scrollUp");
  var menuBtn = document.getElementById("menuBtn");
  var menu = document.getElementById("menu");

  // sticky navbar + scroll-up button
  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
    if (window.scrollY > 500) {
      scrollUpBtn.classList.add("show");
    } else {
      scrollUpBtn.classList.remove("show");
    }
  });

  scrollUpBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // mobile menu toggle
  menuBtn.addEventListener("click", function () {
    menu.classList.toggle("active");
    menuBtn.querySelector("i").classList.toggle("active");
  });

  document.querySelectorAll(".menu-link").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("active");
      menuBtn.querySelector("i").classList.remove("active");
    });
  });

  // scrollspy - highlight active nav link
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".menu-link");
  window.addEventListener("scroll", function () {
    var scrollPos = window.scrollY + 140;
    sections.forEach(function (sec) {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove("active-link");
          if (link.getAttribute("href") === "#" + sec.id) {
            link.classList.add("active-link");
          }
        });
      }
    });
  });

  // typed role text (vanilla, no dependency)
  var roles = ["IT Support", "System Administrator", "Mobile App Developer", "Network Administrator"];
  var roleEl = document.getElementById("typedRole");
  var ri = 0, ci = 0, deleting = false;

  function typeLoop() {
    var current = roles[ri];
    if (!deleting) {
      ci++;
      roleEl.textContent = current.slice(0, ci);
      if (ci === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      ci--;
      roleEl.textContent = current.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 90);
  }
  typeLoop();

  // career day counter (professional "uptime" since Jan 2023)
  var careerStart = new Date("2023-01-01T00:00:00");
  var careerDaysEl = document.getElementById("careerDays");
  if (careerDaysEl) {
    var diffDays = Math.floor((Date.now() - careerStart.getTime()) / 86400000);
    careerDaysEl.textContent = diffDays.toLocaleString("id-ID");
  }

  // animate skill bars when they scroll into view
  var bars = document.querySelectorAll(".bars .line");
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach(function (bar) {
    observer.observe(bar);
  });

  // contact form -> forward to WhatsApp
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var inputs = form.querySelectorAll("input, textarea");
      var name = inputs[0].value;
      var email = inputs[1].value;
      var subject = inputs[2].value;
      var message = inputs[3].value;
      var text =
        "Halo Riki, saya " + name + " (" + email + ").%0ASubjek: " + subject + "%0APesan: " + message;
      window.open("https://wa.me/6283879111344?text=" + text, "_blank");
    });
  }
});