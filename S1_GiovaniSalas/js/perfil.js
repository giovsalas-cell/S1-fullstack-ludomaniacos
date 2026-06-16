document.addEventListener("DOMContentLoaded", () => {
  // Verificamos que haya sesión activa
  const sesion = JSON.parse(sessionStorage.getItem("sesion"));
  if (!sesion || !sesion.logueado) {
    window.location.href = "login.html";
    return;
  }

  // Traemos el usuario actual desde localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const index = usuarios.findIndex((u) => u.usuario === sesion.usuario);
  const usuarioActual = usuarios[index];

  // Precargamos los datos actuales en el formulario
  document.getElementById("nombreUsuario").value = usuarioActual.usuario;
  document.getElementById("direccion").value = usuarioActual.direccion || "";

  // Enviamos el formulario
  document.getElementById("form-perfil").addEventListener("submit", (e) => {
    e.preventDefault();

    const mensaje_general = document.getElementById("mensajeGeneral");
    const mensaje_nombreUsuario = document.getElementById(
      "mensaje_nombreUsuario",
    );
    const mensaje_password = document.getElementById("mensaje_password");
    const mensaje_confirmar = document.getElementById("mensaje_confirmar");

    const nuevoNombreUsuario = document
      .getElementById("nombreUsuario")
      .value.trim();
    const nuevaDireccion = document.getElementById("direccion").value.trim();
    const nuevaPassword = document.getElementById("nuevaPassword").value.trim();
    const confirmarPassword = document
      .getElementById("confirmarPassword")
      .value.trim();

    let correcto = true;

    // Validar nombre de usuario
    if (nuevoNombreUsuario.length < 3) {
      mensaje_nombreUsuario.textContent =
        "el nombre de usuario debe tener al menos 3 caracteres ;(";
      correcto = false;
    } else {
      // Verificar que no exista otro usuario con ese nombre
      const existe = usuarios.some(
        (u, i) =>
          u.usuario.toLowerCase() === nuevoNombreUsuario.toLowerCase() &&
          i !== index,
      );
      if (existe) {
        mensaje_nombreUsuario.textContent =
          "ese nombre de usuario ya existe ;(";
        correcto = false;
      } else {
        mensaje_nombreUsuario.textContent = "correcto :)";
        mensaje_nombreUsuario.className = "text-success";
      }
    }

    // Validar contraseña solo si la escribió
    if (nuevaPassword !== "") {
      const tieneMayuscula = /[A-Z]/.test(nuevaPassword);
      const tieneNumero = /[0-9]/.test(nuevaPassword);
      const largoCorrecto =
        nuevaPassword.length >= 6 && nuevaPassword.length <= 18;

      if (!tieneMayuscula || !tieneNumero || !largoCorrecto) {
        mensaje_password.textContent = "la contraseña no es válida ;(";
        correcto = false;
      } else if (nuevaPassword !== confirmarPassword) {
        mensaje_confirmar.textContent = "las contraseñas no coinciden ;(";
        correcto = false;
      } else {
        mensaje_password.textContent = "correcto :)";
        mensaje_password.className = "text-success";
        mensaje_confirmar.textContent = "correcto :)";
        mensaje_confirmar.className = "text-success";
      }
    }

    if (correcto) {
      // Actualizamos los datos
      usuarios[index].usuario = nuevoNombreUsuario;
      usuarios[index].direccion = nuevaDireccion;
      if (nuevaPassword !== "") {
        usuarios[index].password = nuevaPassword;
      }

      // Guardamos en localStorage
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      // Actualizamos la sesión con el nuevo nombre de usuario
      sessionStorage.setItem(
        "sesion",
        JSON.stringify({
          logueado: true,
          usuario: nuevoNombreUsuario,
          nombre: usuarioActual.nombre,
          rol: usuarioActual.rol,
        }),
      );

      mensaje_general.textContent = "Perfil actualizado correctamente!";
      mensaje_general.className = "text-success";
    }
  });
});
