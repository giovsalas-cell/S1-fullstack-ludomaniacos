document.getElementById("form-login").addEventListener("submit", (event) => {
  event.preventDefault();
  mensaje_validacion.textContent = "";

  const usuario = document.getElementById("nombreUsuario").value.trim();
  const password = document.getElementById("password").value.trim();

  //validacion de que los campos de login no esten vacios
  if (usuario.length < 3) {
    mensaje_usuario.textContent =
      "el nombre de usuario no puede estar vacio ;(";
    mensaje_usuario.className = "text-danger";
    formulario_correcto = false;
    return;
  } else {
    mensaje_usuario.textContent = "";
  }
  if (password.length < 3) {
    mensaje_password.textContent = "la contraseña no puede estar vacia ;(";
    mensaje_password.className = "text-danger";
    formulario_correcto = false;
    return;
  } else {
    mensaje_password.textContent = "";
  }

  //abrimos el almacen

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  //buscamos al usuario
  const usuario_encontrado = usuarios.find(
    (u) => u.usuario === usuario && u.password === password,
  );

  if (!usuario_encontrado) {
    mensaje_validacion.textContent = "Usuario o contraseña Incorrectos :C";
    return;
  }

  //creando sesion

  sessionStorage.setItem(
    "sesion",
    JSON.stringify({
      logueado: true,
      usuario: usuario_encontrado.usuario,
      nombre: usuario_encontrado.nombre,
      rol: usuario_encontrado.rol,
    }),
  );

  if (usuario_encontrado.rol === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "index.html";
  }
});
