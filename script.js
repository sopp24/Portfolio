// Gestion du menu latéral
var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

/* Ouvre le menu latéral */
function openNav() {
  sidenav.classList.add("active");
}

/* Ferme le menu latéral */
function closeNav() {
  sidenav.classList.remove("active");
}

document.querySelectorAll(".item").forEach(item => {
  const images = item.querySelectorAll(".image-container img");
  let index = 0;
  let interval;

  // Assure que la première image est visible au chargement
  images[0].classList.add("active");

  item.addEventListener("mouseenter", () => {
    clearInterval(interval); // Réinitialise le timer pour les transitions
    interval = setInterval(() => {
      // Retire la classe active de l'image actuelle
      images[index].classList.remove("active");
      
      // Passe à l'image suivante
      index = (index + 1) % images.length;
      
      // Ajoute la classe active à l'image suivante
      images[index].classList.add("active");
    }, 3000); // Intervalle de 3 secondes
  });

  item.addEventListener("mouseleave", () => {
    clearInterval(interval); // Arrête le changement d'images lorsque la souris quitte l'élément
    images.forEach(img => img.classList.remove("active")); // Enlève la classe active de toutes les images
    images[0].classList.add("active"); // Remet l'image de base
  });
});


