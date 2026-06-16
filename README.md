# RDC Static Web App Starter

A simple static website starter for Azure Static Web Apps.

## Files

- `index.html` - Main landing page
- `styles.css` - Site styling
- `assets/rdc-logo.png` - Logo image
- `staticwebapp.config.json` - Azure Static Web Apps configuration

## How to use

1. Create a new GitHub repository.
2. Upload these files to the root of the repository.
3. In Azure, create a new Static Web App.
4. Connect it to the GitHub repository.
5. Use these build settings:
   - App location: `/`
   - API location: leave blank
   - Output location: leave blank
6. Replace the placeholder booking link and email in `index.html`.

## Quick edits

Search in `index.html` for:

- `https://outlook.office.com/book/`
- `hello@example.com`

Replace those with your Microsoft Bookings link and business email.
