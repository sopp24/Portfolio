// Portfolio — initialisation progressive des interactions.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  // EmailJS n'est chargé que sur les pages Contact.
  if (form && window.emailjs) {
    emailjs.init("LAVHROSudqGZXICfi");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const templateParams = {
        name: document.getElementById("name")?.value?.trim() || "",
        email: document.getElementById("email")?.value?.trim() || "",
        message: document.getElementById("message")?.value?.trim() || ""
      };

      if (formMessage) formMessage.textContent = "Envoi en cours…";

      emailjs.send("service_bq51psq", "template_ohk6pkb", templateParams)
        .then(function () {
          if (formMessage) formMessage.textContent = "Message envoyé avec succès !";
          form.reset();
        })
        .catch(function (error) {
          console.error("Erreur lors de l'envoi", error);
          if (formMessage) formMessage.textContent = "Une erreur est survenue. Réessaie plus tard.";
        });
    });
  }

  // Navigation mobile : certains écrans peuvent ne pas afficher le menu.
  const sidenav = document.getElementById("mySidenav");
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");

  if (sidenav && openBtn && closeBtn) {
    openBtn.addEventListener("click", function (event) {
      event.preventDefault();
      sidenav.classList.add("active");
    });

    closeBtn.addEventListener("click", function (event) {
      event.preventDefault();
      sidenav.classList.remove("active");
    });
  }

  // Diaporama au survol : ignorer proprement les cartes sans image.
  document.querySelectorAll(".item").forEach(function (item) {
    const images = item.querySelectorAll(".image-container img");
    if (!images.length) return;

    let index = 0;
    let interval;
    images[0].classList.add("active");
    if (images.length < 2) return;

    item.addEventListener("mouseenter", function () {
      clearInterval(interval);
      interval = setInterval(function () {
        images[index].classList.remove("active");
        index = (index + 1) % images.length;
        images[index].classList.add("active");
      }, 1000);
    });

    item.addEventListener("mouseleave", function () {
      clearInterval(interval);
      images.forEach(function (img) { img.classList.remove("active"); });
      index = 0;
      images[0].classList.add("active");
    });
  });
});

// Fonction utilisée par les liens « cliquer pour copier » des pages Contact.
function copyToClipboard(element) {
  const text = element?.innerText || "";
  if (!text) return;

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      alert("Texte copié : " + text);
    }).catch(function (error) {
      console.error("Erreur de copie", error);
    });
    return;
  }

  const temporary = document.createElement("textarea");
  temporary.value = text;
  temporary.setAttribute("readonly", "");
  temporary.style.position = "absolute";
  temporary.style.left = "-9999px";
  document.body.appendChild(temporary);
  temporary.select();
  try {
    document.execCommand("copy");
    alert("Texte copié : " + text);
  } catch (error) {
    console.error("Erreur de copie", error);
  } finally {
    temporary.remove();
  }
}
