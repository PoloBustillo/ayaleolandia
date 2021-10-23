/** @format */
import { passwordStrength } from "check-password-strength";
import axios from "axios";

export function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
export function validatePhone(phone) {
  var re = /\d{10}/;
  return re.test(phone);
}

export function validateFormData(loginScreen, data) {
  let validation = { isValid: true, validationMsgs: [] };

  if (data.email?.length == 0) {
    validation.isValid = false;
    validation.validationMsgs.push({
      msg: "Email es requerido",
      type: "error",
      trigger: "email",
    });
  }
  if (passwordStrength(data.password).id < 2) {
    validation.validationMsgs.push({
      msg: "Contraseña debil, ¿Seguro que quiere continuar?",
      trigger: "password",
      type: "warning",
    });
  }
  if (data.password?.length == 0) {
    validation.isValid = false;
    validation.validationMsgs.push({
      msg: "Contraseña es requerida",
      type: "error",
      trigger: "password",
    });
  }
  if (!validateEmail(data.email)) {
    validation.isValid = false;
    validation.validationMsgs.push({
      msg: "Email no es valido",
      type: "error",
      trigger: "email",
    });
  }

  if (!loginScreen) {
    if (!data.check) {
      validation.isValid = false;
      validation.validationMsgs.push({
        msg: "Necesita aceptar los terminos y condiciones",
        type: "error",
        trigger: "check",
      });
    }

    if (!data.nombre && data.nombre.length == 0) {
      validation.isValid = false;
      validation.validationMsgs.push({
        msg: "Nombre requerido",
        type: "error",
        trigger: "name",
      });
    }
    if (data.phone?.length == 0) {
      validation.isValid = false;
      validation.validationMsgs.push({
        msg: "Teléfono requerido",
        type: "error",
        trigger: "phone",
      });
    }
    if (!validatePhone(data.phone)) {
      validation.isValid = false;
      validation.validationMsgs.push({
        msg: "Teléfono invalido",
        type: "error",
        trigger: "phone",
      });
    }
  }

  return validation;
}

export function hasError(obj, key, value) {
  let isValid = false;
  for (const property in obj) {
    for (const propertyErrors in obj[property]) {
      if (propertyErrors === key) {
        if (obj[property][key] === value) {
          isValid = true;
        }
      }
    }
  }
  return isValid;
}

export const errorFirebaseMap = new Map([
  ["auth/user-not-found", "Usuario no esta registrado."],
  ["auth/uid-already-exists", "Usuario ya existe con ese uid."],
  ["auth/phone-number-already-exists", "Teléfono ya esta registrado."],
  ["auth/invalid-phone-number", "Teléfono invalido."],
  ["auth/invalid-password", "Contraseña no valida (almenos 6 caracteres)."],
  ["auth/invalid-email", "Email no es valido."],
  ["auth/email-already-exists", "Email ya existe."],
  ["auth/email-already-in-use", "Email ya existe."],
  ["auth/wrong-password", "Contraseña no es correcta."],
  ["auth/weak-password", "Contraseña no valida (almenos 6 caracteres)."],
  [
    "auth/too-many-requests",
    "Cuenta bloqueada, por favor entrar en 'Olvide mi contraseña'",
  ],
  [
    "auth/popup-closed-by-user",
    "Cerro la ventana de autentificación antes de iniciar sesión",
  ],
]);

export function getURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchGet(path) {
  const requestUrl = getURL(path);
  const response = await axios.get(requestUrl);
  return response.data;
}
