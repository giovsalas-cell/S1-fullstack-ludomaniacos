//validar correo
function correoValido(correo) {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(correo);
}
//validar contraseña (que tenga mayuscula, que tenga un largo y que clave sea mayor que 6 pero menor de 18 caracteres)
function validarPassword(password) {
  const tieneMayuscula = /[A-Z]/.test(password);
  const tieneNumero = /[0-9]/.test(password);
  const largoCorrecto = password.length >= 6 && password.length <= 18;

  return tieneMayuscula && tieneNumero && largoCorrecto;
}

function validarFechaNacimiento(fechaNacimiento) {
  const fechaActual = new Date();
  const fechaNacimientoDate = new Date(fechaNacimiento);

  const edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();

  return edad;
}

//limpiar formulario

function limpiarFormulario() {
  formulario.reset();
  // limpiar los inputs
  document.getElementById("nombre").value = "";
  document.getElementById("nombreUsuario").value = "";
  document.getElementById("correoUsuario").value = "";
  document.getElementById("password").value = "";
  document.getElementById("passwordRepeat").value = "";
  document.getElementById("fechaNacimiento").value = "";
  document.getElementById("Direccion_despacho").value = "";

  // limpiar clases is-valid e is-invalid
  document.getElementById("nombre").classList.remove("is-valid", "is-invalid");
  document
    .getElementById("nombreUsuario")
    .classList.remove("is-valid", "is-invalid");
  document
    .getElementById("correoUsuario")
    .classList.remove("is-valid", "is-invalid");
  document
    .getElementById("password")
    .classList.remove("is-valid", "is-invalid");
  document
    .getElementById("passwordRepeat")
    .classList.remove("is-valid", "is-invalid");
  document
    .getElementById("fechaNacimiento")
    .classList.remove("is-valid", "is-invalid");
  document
    .getElementById("Direccion_despacho")
    .classList.remove("is-valid", "is-invalid");

  // limpiar mensajes
  // limpiar mensajes Y su color
  document.getElementById("mensaje_nombre").textContent = "";
  document.getElementById("mensaje_nombre").className = "text-danger";

  document.getElementById("mensaje_nombreusuario").textContent = "";
  document.getElementById("mensaje_nombreusuario").className = "text-danger";

  document.getElementById("mensaje_correoUsuario").textContent = "";
  document.getElementById("mensaje_correoUsuario").className = "text-danger";

  document.getElementById("mensaje_password").textContent = "";
  document.getElementById("mensaje_password").className = "text-danger";

  document.getElementById("mensaje_passwordRepeat").textContent = "";
  document.getElementById("mensaje_passwordRepeat").className = "text-danger";

  document.getElementById("mensaje_fechaNacimiento").textContent = "";
  document.getElementById("mensaje_fechaNacimiento").className = "text-danger";

  document.getElementById("mensajeGeneral").textContent = "";
  document.getElementById("mensajeGeneral").className = "text-danger";
}

const formulario = document.getElementById("formularioRegistro");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  //cambia a true si todo esta en orden
  let formulario_correcto = true;

  //recepcion de variables
  const nombre = document.getElementById("nombre");
  const nombre_usuario = document.getElementById("nombreUsuario");
  const correo_usuario = document.getElementById("correoUsuario");
  const contraseña_usuario = document.getElementById("password");
  const confirmar_contraseña = document.getElementById("passwordRepeat");
  const fecha_nacimiento = document.getElementById("fechaNacimiento");

  //is invalid y is valid
  nombre.classList.remove("is-valid", "is-invalid");
  nombre_usuario.classList.remove("is-valid", "is-invalid");
  correo_usuario.classList.remove("is-valid", "is-invalid");
  contraseña_usuario.classList.remove("is-valid", "is-invalid");
  confirmar_contraseña.classList.remove("is-valid", "is-invalid");
  fecha_nacimiento.classList.remove("is-valid", "is-invalid");

  //mensajes de retroalimentacion y validacion
  const mensaje_nombre = document.getElementById("mensaje_nombre");
  const mensaje_nombre_usuario = document.getElementById(
    "mensaje_nombreusuario",
  );
  const mensaje_correo = document.getElementById("mensaje_correoUsuario");
  const mensaje_contraseña = document.getElementById("mensaje_password");
  const mensaje_confirmar_contraseña = document.getElementById(
    "mensaje_passwordRepeat",
  );
  const mensaje_fechaNacimiento = document.getElementById(
    "mensaje_fechaNacimiento",
  );
  const mensaje_general = document.getElementById("mensajeGeneral");

  //is invalid y is valid
  nombre.classList.remove("is-valid", "is-invalid");
  nombre_usuario.classList.remove("is-valid", "is-invalid");
  correo_usuario.classList.remove("is-valid", "is-invalid");
  contraseña_usuario.classList.remove("is-valid", "is-invalid");

  //validacion nombre
  if (nombre.value.length < 3) {
    mensaje_nombre.textContent =
      "el nombre no puede estar vacio o menor de 3 caracteres ;(";
    nombre.classList.add("is-invalid");
    formulario_correcto = false;
  } else {
    nombre.classList.add("is-valid");
    mensaje_nombre.textContent = "correcto :)";
    mensaje_nombre.className = "text-success";
  }
  //fin-validacion nombre

  //validacion nombre de usuario
  if (nombre_usuario.value.length < 3) {
    mensaje_nombre_usuario.textContent =
      "el nombre de usuario no puede estar vacio ;(";
    nombre_usuario.classList.add("is-invalid");
    formulario_correcto = false;
  } else {
    nombre_usuario.classList.add("is-valid");
    mensaje_nombre_usuario.textContent = "correcto :)";
    mensaje_nombre_usuario.className = "text-success";
  }
  //fin-validacion nombre de usuario

  //validacion correo
  if (correoValido(correo_usuario.value)) {
    mensaje_correo.textContent = "correcto :)";
    mensaje_correo.className = "text-success";
    correo_usuario.classList.add("is-valid");
  } else {
    mensaje_correo.textContent = "el correo no es valido ;(";
    mensaje_correo.className = "text-danger";
    correo_usuario.classList.add("is-invalid");
    formulario_correcto = false;
  }
  //validacion contraseña
  if (validarPassword(contraseña_usuario.value)) {
    mensaje_contraseña.textContent = "correcto :)";
    mensaje_contraseña.className = "text-success";

    contraseña_usuario.classList.add("is-valid");
  } else {
    mensaje_contraseña.textContent = "la contraseña no es valida ;(";
    mensaje_contraseña.className = "text-danger";
    contraseña_usuario.classList.add("is-invalid");
    formulario_correcto = false;
  }
  //fin-validacion contraseña

  //confirmar contraseña
  if (contraseña_usuario.value === "") {
    mensaje_confirmar_contraseña.textContent =
      "la contraseña no puede estar vacía ;(";
    mensaje_confirmar_contraseña.className = "text-danger";
    confirmar_contraseña.classList.remove("is-valid");
    confirmar_contraseña.classList.add("is-invalid");
    formulario_correcto = false;
  } else if (contraseña_usuario.value !== confirmar_contraseña.value) {
    mensaje_confirmar_contraseña.textContent =
      "las contraseñas no coinciden ;(";
    mensaje_confirmar_contraseña.className = "text-danger";
    confirmar_contraseña.classList.remove("is-valid");
    confirmar_contraseña.classList.add("is-invalid");
    formulario_correcto = false;
  } else {
    mensaje_confirmar_contraseña.textContent = "correcto :)";
    mensaje_confirmar_contraseña.className = "text-success";
    confirmar_contraseña.classList.remove("is-invalid");
    confirmar_contraseña.classList.add("is-valid");
  }

  //fin confirmar contraseña

  //validacion fecha nacimiento
  if (fecha_nacimiento.value === "") {
    mensaje_fechaNacimiento.textContent =
      "la fecha de nacimiento no puede estar vacía ;(";
    mensaje_fechaNacimiento.className = "text-danger";
    fecha_nacimiento.classList.add("is-invalid");
    formulario_correcto = false;
  } else if (validarFechaNacimiento(fecha_nacimiento.value) < 13) {
    mensaje_fechaNacimiento.textContent = "debes tener al menos 13 años ;(";
    mensaje_fechaNacimiento.className = "text-danger";
    fecha_nacimiento.classList.add("is-invalid");
    formulario_correcto = false;
  } else {
    mensaje_fechaNacimiento.textContent = "correcto :)";
    mensaje_fechaNacimiento.className = "text-success";
    fecha_nacimiento.classList.remove("is-invalid");
    fecha_nacimiento.classList.add("is-valid");
  }

  //fin validacion fecha_nacimiento

  if (formulario_correcto) {
    alert("inscrito");
    mensaje_general.textContent = "inscrito";
    mensaje_general.className = "text-success";
    limpiarFormulario();
  }
});
document.getElementById("btnLimpiar").addEventListener("click", function () {
  limpiarFormulario();
});
