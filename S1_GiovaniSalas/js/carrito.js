// Agregar producto al carrito desde cualquier página
document.querySelectorAll(".btn-agregar").forEach((boton) => {
  boton.addEventListener("click", () => {
    // Verificar si hay sesión activa
    const sesion = JSON.parse(sessionStorage.getItem("sesion"));
    if (!sesion || !sesion.logueado) {
      alert(" Debes iniciar sesión para agregar productos al carrito");
      window.location.href = "login.html";
      return;
    }

    // Obtenemos los datos del producto
    const nombre = boton.dataset.nombre;
    const precio = parseInt(boton.dataset.precio);
    const imagen = boton.dataset.imagen;

    // Traemos el carrito actual
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificamos si el producto ya está en el carrito
    const existe = carrito.find((p) => p.nombre === nombre);

    if (existe) {
      // Si ya existe, aumentamos la cantidad
      existe.cantidad += 1;
    } else {
      // Si no existe, lo agregamos
      carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }

    // Guardamos el carrito actualizado
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(` ${nombre} agregado al carrito!`);
  });
});
