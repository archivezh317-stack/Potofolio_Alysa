const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");


/* =========================================
   NAVBAR MUNCUL SAAT SCROLL
========================================= */

window.addEventListener("scroll", function () {

    if (window.scrollY > 100) {
        navbar.classList.add("show");
    } else {
        navbar.classList.remove("show");
    }

});


/* =========================================
   MOBILE MENU
========================================= */

menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


/* =========================================
   SMOOTH SCROLL MENU
========================================= */

document.querySelectorAll('.nav-menu a').forEach(function (link) {

    link.addEventListener('click', function (event) {

        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            const startPosition = window.scrollY;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY;

            const distance = targetPosition - startPosition;

            const duration = 1200;

            let startTime = null;


            function animation(currentTime) {

                if (startTime === null) {
                    startTime = currentTime;
                }

                const timeElapsed = currentTime - startTime;

                const progress =
                    Math.min(timeElapsed / duration, 1);


                // Easing supaya awal dan akhir lebih lembut
                const ease =
                    progress < 0.5
                        ? 2 * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 2) / 2;


                window.scrollTo(
                    0,
                    startPosition + distance * ease
                );


                if (progress < 1) {
                    requestAnimationFrame(animation);
                }

            }


            requestAnimationFrame(animation);


            // Tutup menu HP
            navMenu.classList.remove("active");

        }

    });

});
function openProject(projectId) {

    const modal = document.getElementById(projectId);

    if (!modal) return;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeProject(projectId) {

    const modal = document.getElementById(projectId);

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";
}


/* Klik area luar modal untuk menutup */

document.addEventListener("click", function (event) {

    if (
        event.target.classList.contains("project-modal")
    ) {

        event.target.classList.remove("active");

        document.body.style.overflow = "";

    }

});


/* Tombol ESC */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        document
            .querySelectorAll(".project-modal.active")
            .forEach(function (modal) {

                modal.classList.remove("active");

            });

        document.body.style.overflow = "";

    }

});