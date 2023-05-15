// const fs = require('fs');
// const { google } = require('googleapis');
// const xlsx = require('xlsx');

// // Ruta al archivo XLSX con los datos de los contactos
// const contactsFilePath = 'D:/cristian trabajo/CM ARTS PRODUCCION/nuvevoexp/PRUEBA.xlsx'; // Actualiza la ruta según tu archivo de datos

// // Ruta al archivo de credenciales JSON descargado desde Google Cloud Console
// const credentialsFilePath = 'D:/cristian trabajo/CM ARTS PRODUCCION/nuvevoexp/credenciales.json'; // Actualiza la ruta según tu archivo de credenciales

// async function importContacts() {
//   try {
//     // Leer el archivo de credenciales
//     const credentials = JSON.parse(fs.readFileSync(credentialsFilePath));

//     // Autenticación
//     const auth = new google.auth.GoogleAuth({
//       credentials,
//       scopes: ['https://www.googleapis.com/auth/contacts'],
//     });
//     const authClient = await auth.getClient();

//     // Crear cliente de la API de Google Contacts
//     const people = google.people({
//       version: 'v1',
//       auth: authClient,
//     });

//     // Leer el archivo XLSX y procesar los contactos
//     const workbook = xlsx.readFile(contactsFilePath);
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const contacts = xlsx.utils.sheet_to_json(worksheet);

//     for (const contact of contacts) {
//       try {
//         const { name, phone } = contact;

//         const requestBody = {
//           names: [{ displayName: name }],
//           phoneNumbers: [{ value: '+'+phone, type: 'mobile' }],
//         };

//         // Importar el contacto a Google Contacts
//         const res = await people.people.createContact({
//           requestBody,
//         });
//         console.log('Contacto importado:', res.data);
//       } catch (error) {
//         console.error('Error al importar el contacto:', error.message);
//       }
//     }

//     console.log('Importación de contactos finalizada');
//   } catch (error) {
//     console.error('Error al importar los contactos:', error.message);
//   }
// }

// importContacts();
const fs = require('fs');
const { google } = require('googleapis');
const xlsx = require('xlsx');

// Ruta al archivo XLSX con los datos de los contactos
const contactsFilePath = 'D:/cristian trabajo/CM ARTS PRODUCCION/nuvevoexp/PRUEBA.xlsx'; // Actualiza la ruta según tu archivo de contactos

// Ruta al archivo de credenciales JSON descargado desde Google Cloud Console
const credentialsFilePath = 'D:/cristian trabajo/CM ARTS PRODUCCION/nuvevoexp/credenciales.json'; // Actualiza la ruta según tu archivo de credenciales

async function importContacts() {
  try {
    // Leer el archivo de credenciales
    const credentials = JSON.parse(fs.readFileSync(credentialsFilePath));

    // Autenticación
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/contacts'],
    });
    const authClient = await auth.getClient();

    // Crear cliente de la API de Google People
    const people = google.people({
      version: 'v1',
      auth: authClient,
    });

    // Leer el archivo XLSX y procesar los contactos
    const workbook = xlsx.readFile(contactsFilePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const contacts = xlsx.utils.sheet_to_json(worksheet);

    for (const contact of contacts) {
      try {
        const { name, phone } = contact;

        const contactData = {
          names: [
            {
              displayName: name,
            },
          ],
          phoneNumbers: [
            {
              value: '+'+phone,
              type: 'mobile',
            },
          ],
        };

        // Importar el contacto a Google Contacts
        const res = await people.people.createContact({
          requestBody: contactData,
        });

        console.log('Contacto importado:', res.data);
      } catch (error) {
        console.error('Error al importar el contacto:', error.message);
      }
    }

    console.log('Importación de contactos finalizada');
  } catch (error) {
    console.error('Error al importar los contactos:', error.message);
  }
}

importContacts();