let usuarioEncontrado = null; // guardamos el usuario encontrado

document
  .getElementById("form-recuperar")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const mensaje_usuario = document.getElementById("mensaje_usuario");
    const mensaje_correo = document.getElementById("mensaje_correo");
    const mensaje_general = document.getElementById("mensajeGeneral");
    const bloque = document.getElementById("bloque-nueva-password");

    const nombreUsuario = document.getElementById("nombreUsuario").value.trim();
    const correo = document.getElementById("correo").value.trim();

    // Si el bloque de nueva contraseña está visible → estamos en paso 2
    if (bloque.style.display === "block") {
      const nuevaPassword = document
        .getElementById("nuevaPassword")
        .value.trim();
      const confirmarPassword = document
        .getElementById("confirmarPassword")
        .value.trim();
      const mensaje_nuevaPassword = document.getElementById(
        "mensaje_nuevaPassword",
      );
      const mensaje_confirmarPassword = document.getElementById(
        "mensaje_confirmarPassword",
      );

      // Validar nueva contraseña
      const tieneMayuscula = /[A-Z]/.test(nuevaPassword);
      const tieneNumero = /[0-9]/.test(nuevaPassword);
      const largoCorrecto =
        nuevaPassword.length >= 6 && nuevaPassword.length <= 18;

      if (!tieneMayuscula || !tieneNumero || !largoCorrecto) {
        mensaje_nuevaPassword.textContent = "la contraseña no es válida ;(";
        return;
      } else {
        mensaje_nuevaPassword.textContent = "correcto :)";
        mensaje_nuevaPassword.className = "text-success";
      }

      if (nuevaPassword !== confirmarPassword) {
        mensaje_confirmarPassword.textContent =
          "las contraseñas no coinciden ;(";
        return;
      } else {
        mensaje_confirmarPassword.textContent = "correcto :)";
        mensaje_confirmarPassword.className = "text-success";
      }

      // Actualizar la contraseña en localStorage
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const index = usuarios.findIndex(
        (u) => u.usuario === usuarioEncontrado.usuario,
      );
      usuarios[index].password = nuevaPassword;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert(" Contraseña actualizada correctamente!");
      window.location.href = "login.html";
      return;
    }

    // 1: verificar usuario y correo
    mensaje_usuario.textContent = "";
    mensaje_correo.textContent = "";
    mensaje_general.textContent = "";

    if (nombreUsuario.length < 3) {
      mensaje_usuario.textContent =
        "el nombre de usuario no puede estar vacío ;(";
      return;
    }

    if (correo === "") {
      mensaje_correo.textContent = "el correo no puede estar vacío ;(";
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarioEncontrado = usuarios.find(
      (u) => u.usuario === nombreUsuario && u.correo === correo,
    );

    if (!usuarioEncontrado) {
      mensaje_general.textContent = "No encontramos ese usuario o correo :C";
      mensaje_general.className = "text-danger";
      return;
    }

    // Si existe → mostramos el bloque de nueva contraseña
    mensaje_general.textContent =
      " Usuario verificado! Ingresa tu nueva contraseña.";
    mensaje_general.className = "text-success";
    bloque.style.display = "block";
    document.querySelector("button[type=submit]").textContent =
      "Cambiar contraseña";
  });
