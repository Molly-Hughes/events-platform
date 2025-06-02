import { gapi } from "gapi-script";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export const initGoogleClient = () => {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", async () => {
      try {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });
        resolve();
      } catch (err) {
        console.error("Google client initialization failed:", err);
        reject(err);
      }
    });
  });
};

export const signInToGoogle = async () => {
  try {
    const authInstance = gapi.auth2.getAuthInstance();
    const user = await authInstance.signIn();
    return user;
  } catch (err) {
    console.error("Google sign-in failed:", err);
    throw new Error("Failed to sign in to Google.");
  }
};

export const addEventToGoogleCalendar = async (event) => {
  try {
    const response = await gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    return response.result;
  } catch (err) {
    console.error("Failed to add event to Google Calendar:", err);
    throw new Error("Failed to add event to calendar.");
  }
};
