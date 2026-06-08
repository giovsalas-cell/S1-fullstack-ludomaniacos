// Crear admin si no existe (se ejecuta en todas las páginas)
const usuariosInit = JSON.parse(localStorage.getItem("usuarios")) || [];
const adminExiste = usuariosInit.some((u) => u.rol === "admin");
if (!adminExiste) {
  usuariosInit.push({
    usuario: "admin",
    password: "admin",
    rol: "admin",
  });
  localStorage.setItem("usuarios", JSON.stringify(usuariosInit));
}

// Leemos la sesión
const sesion = JSON.parse(sessionStorage.getItem("sesion"));

if (!sesion || !sesion.logueado) {
  // Sin sesión → mostramos login y registro
  document.getElementById("nav-login").style.display = "block";
  document.getElementById("nav-registro").style.display = "block";
} else if (sesion.rol === "admin") {
  // Admin → mostramos panel admin y cerrar sesión
  document.getElementById("nav-admin").style.display = "block";
  document.getElementById("nav-cerrar").style.display = "block";
} else {
  // Usuario normal → mostramos perfil, carrito y cerrar sesión
  document.getElementById("nav-perfil").style.display = "block";
  document.getElementById("nav-carrito").style.display = "block";
  document.getElementById("nav-cerrar").style.display = "block";
}

// Botón cerrar sesión
const btnCerrar = document.getElementById("btn-cerrar-sesion");
if (btnCerrar) {
  btnCerrar.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem("sesion");
    window.location.href = "login.html";
  });
}
