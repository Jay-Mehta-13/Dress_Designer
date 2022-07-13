const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
    keyFile: "sheets_credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

// Create client instance for auth
let getClient = async () => {
    let client = await auth.getClient();
    return client
}

// Instance of Google Sheets API
const spreadsheetId = "1MIrAxKw-FlG611mbvyvovk641ZRxoukTTSRFaK_3jKE"
let getSheets = async (rowData) => {
    let client = getClient()
    const sheets = google.sheets({ version: 'v4', auth: client });

    // Write data into the spreadsheet
    try{
        await sheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1!A:E",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [rowData.material, rowData.pattern, rowData.color, rowData.border, rowData.user]
                ]
            }
        })
        return "Entered Selection"
    }
    catch (error){
        console.error();
        return "Error Occured on Selection Entry"
    }
}

module.exports = { getSheets }