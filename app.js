const express = require('express');
const arp = require('node-arp');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  arp.table((err, entries) => {
    if (err) {
      console.error('Error:', err);
      res.send('An error occurred.');
      return;
    }

    let devices = '';

    entries.forEach((entry) => {
      devices += `<tr><td>${entry.ip}</td><td>${entry.mac}</td></tr>`;
    });

    const html = `
      <html>
        <head>
          <style>
            table {
              font-family: Arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }

            th, td {
              border: 1px solid #ddd;
              padding: 8px;
            }

            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>LAN Devices</h1>
          <table>
            <tr>
              <th>IP Address</th>
              <th>MAC Address</th>
            </tr>
            ${devices}
          </table>
        </body>
      </html>
    `;

    res.send(html);
  });
});

app.listen(port, () => {
  console.log(`Web app listening at http://localhost:${port}`);
});
