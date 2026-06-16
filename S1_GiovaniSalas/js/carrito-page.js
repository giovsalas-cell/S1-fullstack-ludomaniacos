document.addEventListener("DOMContentLoaded", () => {
  // Verificar sesión
  const sesion = JSON.parse(sessionStorage.getItem("sesion"));
  if (!sesion || !sesion.logueado) {
    window.location.href = "login.html";
    return;
  }

  const listaCarrito = document.getElementById("lista-carrito");
  const mensajeVacio = document.getElementById("mensajeVacio");
  const resumen = document.getElementById("resumen");
  const totalEl = document.getElementById("total");

  function renderCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
      mensajeVacio.style.display = "block";
      resumen.style.display = "none";
      return;
    }

    mensajeVacio.style.display = "none";
    resumen.style.display = "block";

    let total = 0;

    carrito.forEach((producto, index) => {
      total += producto.precio * producto.cantidad;

      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4";
      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${producto.imagen}" class="card-img-top card-producto-img" alt="${producto.nombre}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">${producto.nombre}</h5>
            <p class="text-success fw-bold fs-5">$${producto.precio.toLocaleString()}</p>
            <div class="d-flex align-items-center gap-2 mt-auto">
              <button class="btn btn-outline-dark btn-sm" onclick="cambiarCantidad(${index}, -1)">−</button>
              <span>${producto.cantidad}</span>
              <button class="btn btn-outline-dark btn-sm" onclick="cambiarCantidad(${index}, 1)">+</button>
              <button class="btn btn-danger btn-sm ms-auto" onclick="eliminarProducto(${index})">Eliminar</button>
            </div>
          </div>
        </div>
      `;
      listaCarrito.appendChild(col);
    });

    totalEl.textContent = `$${total.toLocaleString()}`;
  }

  // Cambiar cantidad
  window.cambiarCantidad = (index, cambio) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) {
      carrito.splice(index, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  };

  // Eliminar producto
  window.eliminarProducto = (index) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  };

  // Botón comprar
  document.getElementById("btn-comprar").addEventListener("click", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const nombres = carrito
      .map((p) => `• ${p.nombre} x${p.cantidad}`)
      .join("\n");
    alert(
      ` ¡Compra exitosa!\n\nProductos comprados:\n${nombres}\n\n¡Gracias por tu compra en Ludomaniacos!`,
    );
    localStorage.removeItem("carrito");
    renderCarrito();
  });

  renderCarrito();
});
