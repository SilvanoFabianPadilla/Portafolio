export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "⚠ El campo Nombre no puede estar vacio.",
    patternMismatch:
      "⚠ Debe contener minimo 5 y máximo 50 caracteres, no puede contener numeros y no puede contener caracteres especiales.",
  },
  email: {
    valueMissing: "⚠ El campo Correo Electrónico no puede estar vacio.",
    typeMismatch: "⚠ El correo no es válido",
  },
  asunto: {
    valueMissing: "⚠ El campo Asunto no puede estar vacio",
    patternMismatch: "⚠ Debe contener minimo 5 y máximo 50 caracteres.",
  },
  mensaje: {
    valueMissing: "⚠ El campo Mensaje no puede estar vacio",
    patternMismatch: "⚠ Debe contener minimo 5 y máximo 300 caracteres.",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad.";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
