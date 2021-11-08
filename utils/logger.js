/** @format */

import { Logtail as Browser } from "@logtail/browser";

const source = "CLIENT";
const logtail = new Browser(process.env.NEXT_PUBLIC_LOGTAIL_KEY);

const resources = {
  source: source,
  start_date: new Date().toDateString(),
  userAgent: window.navigator.userAgent,
  correlationId: Date.now().toString(36) + Math.random().toString(36).substr(2),
};
Object.freeze(resources);

/**
 *
 * @param {*} msg Mensaje a logear
 * @param {*} method Metodo trigger
 * @param {*} extra Data extra
 */
export const logInfo = (msg = "NONE", method = "LOGGER", extra = {}) => {
  if (typeof extra !== "object") {
    extra = { data: extra };
  }
  let new_resources = { ...resources, ...extra };
  logtail.info(`🚀 INFO 🚀 -- Method: ${method} - Msg: ${msg}`, {
    tracing: new_resources,
  });
};

/**
 *
 * @param {*} msg Mensaje a logear
 * @param {*} method Metodo trigger
 * @param {*} extra Data extra
 */
export const logError = (msg = "NONE", method = "LOGGER", extra = {}) => {
  if (typeof extra !== "object") {
    extra = { data: extra };
  }
  let new_resources = { ...resources, ...extra };
  logtail.error(`🎃 ERROR 🎃 -- Method: ${method} - Msg: ${msg}`, {
    tracing: new_resources,
  });
};

/**
 *
 * @param {*} msg Mensaje a logear
 * @param {*} method Metodo trigger
 * @param {*} extra Data extra
 */
export const logWarning = (msg = "NONE", method = "LOGGER", extra = {}) => {
  if (typeof extra !== "object") {
    extra = { data: extra };
  }
  let new_resources = { ...resources, ...extra };
  logtail.error(`✨ WARNING ✨ -- Method: ${method} - Msg: ${msg}`, {
    tracing: new_resources,
  });
};
