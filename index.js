/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = "296283188050-9943v8fjfuve52kha5e0aevvn6780se3.apps.googleusercontent.com";
const API_KEY = "AIzaSyDizOE-wImR66A5Ev7q-4ZlCzYTkgEWtJ0";

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

// Authorization scopes required by the API
const SCOPES = "https://www.googleapis.com/auth/calendar";

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById("authorize_button").style.visibility = "hidden";
document.getElementById("signout_button").style.visibility = "hidden";
document.getElementById("event_form").style.visibility = "hidden";

/** Load Google API */
function gapiLoaded() {
  gapi.load("client", initializeGapiClient);
}

/** Initialize API Client */
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC]
  });
  gapiInited = true;
  maybeEnableButtons();
}

/** Load Google Identity Services */
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: ""
  });
  gisInited = true;
  maybeEnableButtons();
}

/** Enable buttons after libraries load */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById("authorize_button").style.visibility = "visible";
  }
}

/** Handle Google Sign-in */
function handleAuthClick() {
  tokenClient.callback = async resp => {
    if (resp.error !== undefined) {
      throw resp;
    }
    document.getElementById("signout_button").style.visibility = "visible";
    document.getElementById("event_form").style.visibility = "visible";
    document.getElementById("authorize_button").innerText = "Refresh";
    await listUpcomingEvents();
  };

  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    tokenClient.requestAccessToken({ prompt: "" });
  }
}

/** Handle Google Sign-out */
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken("");
    document.getElementById("event_list").innerHTML = "";
    document.getElementById("authorize_button").innerText = "Authorize";
    document.getElementById("signout_button").style.visibility = "hidden";
    document.getElementById("event_form").style.visibility = "hidden";
  }
}

/** Fetch & Display Upcoming Events */
async function listUpcomingEvents() {
  let response;
  try {
    const request = {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime"
    };
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    document.getElementById("event_list").innerHTML = `<p class="error">${err.message}</p>`;
    return;
  }

  const events = response.result.items;
  const eventListContainer = document.getElementById("event_list");
  eventListContainer.innerHTML = ""; // Clear previous events

  if (!events || events.length == 0) {
    eventListContainer.innerHTML = `<p class="no-events">No events found.</p>`;
    return;
  }

  events.forEach(event => {
    const eventItem = document.createElement("div");
    eventItem.classList.add("event-item");

    eventItem.innerHTML = `
      <div class="event-header">
        <h3>${event.summary}</h3>
        <a href="${event.htmlLink}" target="_blank" class="event-link">📅 Open in Calendar</a>
      </div>
      <p><strong>Date & Time:</strong> ${new Date(event.start.dateTime || event.start.date).toLocaleString()}</p>
      <p><strong>Description:</strong> ${event.description || "No description provided."}</p>
    `;

    eventListContainer.appendChild(eventItem);
  });
}

/** Add Event to Google Calendar */
const addEvent = () => {
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const date = document.getElementById("date").value;
  const start = document.getElementById("st").value;
  const end = document.getElementById("et").value;

  const startTime = new Date(`${date}T${start}`).toISOString();
  const endTime = new Date(`${date}T${end}`).toISOString();

  var event = {
    summary: title,
    location: "Google Meet",
    description: desc,
    start: {
      dateTime: startTime,
      timeZone: "America/Los_Angeles"
    },
    end: {
      dateTime: endTime,
      timeZone: "America/Los_Angeles"
    },
    attendees: [{ email: "abc@google.com" }, { email: "xyz@google.com" }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 }
      ]
    }
  };

  var request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event
  });

  request.execute(() => {
    listUpcomingEvents(); // Refresh event list after adding
  });
};
