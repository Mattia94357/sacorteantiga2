
// Replace with your own Google Sheets API key and Sheet ID
const API_KEY = 'YOUR_GOOGLE_SHEET_API_KEY';
const SPREADSHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
const RANGE = 'Sheet1!A:B';  // Range where Date and Status are located

// Function to get unavailable dates from Google Sheets
async function getUnavailableDates() {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`);
    const data = await response.json();

    // Extract dates where status is 'unavailable'
    const unavailableDates = data.values.filter(row => row[1] === 'unavailable').map(row => row[0]);

    return unavailableDates;
}

// Function to disable unavailable dates and enable the rest in Flatpickr
async function setupCalendar() {
    const unavailableDates = await getUnavailableDates();

    // Disable unavailable dates and leave the rest available
    flatpickr("#arrivalDate", {
        disable: unavailableDates.map(date => new Date(date)),
        // Optionally, add more settings for your calendar here
    });
}

// Call the function when the page is loaded
window.onload = setupCalendar;
</script>

<!-- Include Flatpickr library -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

<!-- Your Flatpickr calendar input -->
<input type="text" id="arrivalDate" />