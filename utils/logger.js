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

export const logInfo = (
  method = "LOGGER",
  data = source,
  msg = "NONE",
  extra
) => {
  let new_resources = { ...resources, ...extra };

  logtail.info(
    `🚀 INFO 🚀 -- Method: ${method} - Data: ${JSON.stringify(
      data,
      null,
      "\t"
    )} - Msg: ${msg}`,
    {
      tracing: new_resources,
    }
  );
};

export const logError = (
  method = "LOGGER",
  data = source,
  msg = "NONE",
  extra
) => {
  let new_resources = { ...resources, ...extra };

  logtail.error(
    `🎃 ERROR 🎃 -- Method: ${method} - Data: ${JSON.stringify(
      data,
      null,
      "\t"
    )} - Msg: ${msg}`,
    {
      tracing: new_resources,
    }
  );
};

export const logWarning = (
  method = "LOGGER",
  data = source,
  msg = "NONE",
  extra
) => {
  let new_resources = { ...resources, ...extra };

  logtail.warn(
    `✨ WARNING ✨ -- Method: ${method} - Data: ${JSON.stringify(
      data,
      null,
      "\t"
    )} - Msg: ${msg}`,
    {
      tracing: new_resources,
    }
  );
};
