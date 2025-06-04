# Togetherhood - Events Platform

Togetherhood is a community-based event platform built to help local organisations create and share events.

Members of the community can browse events, sign up for events, and add events directly to their Google Calendar. Staff members can manage events through a secure dashboard.

**Live site:** https://togetherhood.netlify.app/

## Features

- Browse a list of upcoming community events.
- Sign up for events and retrieve confirmation.
- Add events to your Google Calendar.
- Staff login system with a dedicated dashboard.
- Staff only: View analytics (total events, upcoming events, and number of signups) and create, edit, and delete events.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, JavaScript.
- **Backend:** Supabase (Auth, Dashboard, and Hosting).
- **Calendar Integration:** Google Calendar API.
- **Hosting:** Netlify

## Authentication

- Public users can view and sign up for events.
- Staff members must log in to access the event management dashboard.
- Staff credentials must be pre-authorised in Supabase.

### Test Staff Account

Use the following credentials to explore the staff dashboard:

- Email: staff@example.com
- Password: stafftest123

## Local Setup Instructions

Follow these steps to run the project locally:

1. **Clone the repository**

```
git clone https://github.com/Molly-Hughes/events-platform
cd togetherhood
```

2. **Install dependencies**

Here are the main libraries and tools used in the project:

| Package                 | Purpose                                 |
| ----------------------- | --------------------------------------- |
| `react`, `react-dom`    | Core frontend UI                        |
| `react-router-dom`      | Client-side routing                     |
| `tailwindcss`           | Utility-first CSS framework             |
| `@tailwindcss/vite`     | Tailwind plugin for Vite                |
| `react-icons`           | Icon library for React                  |
| `@supabase/supabase-js` | Supabase client SDK                     |
| `gapi-script`           | Google API script loader (for calendar) |

> Run the following to install all dependencies locally.

```
npm install
```

3. **Set up environment variables**
   Create an .env.local file in the root directory and include the following:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_GOOGLE_API_KEY=your_google_api_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Note: Do not commit an .env.local to version control.

4. **Run the development server**

```
npm run dev
```

## Google Calendar Integration

After signing up for an event, users can click a button to add the event to their Google Calendar. This is implemented using the Google Calendar API and OAuth2 via your developer account credentials.
