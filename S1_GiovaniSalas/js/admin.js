document.addEventListener("DOMContentLoaded", () => {
  // Verificar que sea admin
  const sesion = JSON.parse(sessionStorage.getItem("sesion"));
  if (!sesion || !sesion.logueado || sesion.rol !== "admin") {
    window.location.href = "login.html";
    return;
  }

  renderUsuarios();
  renderProductos();
});

// Mostrar tab
window.mostrarTab = (tab) => {
  document.getElementById("seccion-usuarios").style.display =
    tab === "usuarios" ? "block" : "none";
  document.getElementById("seccion-productos").style.display =
    tab === "productos" ? "block" : "none";
  document
    .getElementById("tab-usuarios")
    .classList.toggle("active", tab === "usuarios");
  document
    .getElementById("tab-productos")
    .classList.toggle("active", tab === "productos");
};

// Renderizar usuarios
function renderUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const tbody = document.getElementById("tabla-usuarios");
  tbody.innerHTML = "";

  usuarios.forEach((u, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.usuario}</td>
      <td>${u.nombre || "-"}</td>
      <td>${u.correo || "-"}</td>
      <td><span class="badge ${u.rol === "admin" ? "bg-danger" : "bg-primary"}">${u.rol}</span></td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Eliminar usuario
window.eliminarUsuario = (index) => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (usuarios[index].rol === "admin") {
    alert("No puedes eliminar al administrador!");
    return;
  }
  if (confirm(`¿Eliminar al usuario ${usuarios[index].usuario}?`)) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    renderUsuarios();
  }
};

// Agregar producto
window.agregarProducto = () => {
  const nombre = document.getElementById("prod-nombre").value.trim();
  const precio = parseInt(document.getElementById("prod-precio").value);
  const stock = parseInt(document.getElementById("prod-stock").value);
  const categoria = document.getElementById("prod-categoria").value.trim();
  const mensaje = document.getElementById("mensaje-producto");

  if (!nombre || !precio || !stock || !categoria) {
    mensaje.textContent = "Completa todos los campos ;(";
    mensaje.className = "text-danger";
    return;
  }

  const productos = JSON.parse(localStorage.getItem("productosAdmin")) || [];
  productos.push({ nombre, precio, stock, categoria });
  localStorage.setItem("productosAdmin", JSON.stringify(productos));

  mensaje.textContent = " Producto agregado!";
  mensaje.className = "text-success";

  document.getElementById("prod-nombre").value = "";
  document.getElementById("prod-precio").value = "";
  document.getElementById("prod-stock").value = "";
  document.getElementById("prod-categoria").value = "";

  renderProductos();
};

// Renderizar productos
function renderProductos() {
  const productos = JSON.parse(localStorage.getItem("productosAdmin")) || [];
  const tbody = document.getElementById("tabla-productos");
  tbody.innerHTML = "";

  if (productos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No hay productos agregados aún</td></tr>`;
    return;
  }

  productos.forEach((p, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.nombre}</td>
      <td>$${p.precio.toLocaleString()}</td>
      <td>${p.stock}</td>
      <td>${p.categoria}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Eliminar producto
window.eliminarProducto = (index) => {
  const productos = JSON.parse(localStorage.getItem("productosAdmin")) || [];
  if (confirm(`¿Eliminar ${productos[index].nombre}?`)) {
    productos.splice(index, 1);
    localStorage.setItem("productosAdmin", JSON.stringify(productos));
    renderProductos();
  }
};
