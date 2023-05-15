const fs = require('fs');
const { google } = require('googleapis');

// Ruta al archivo de credenciales JSON descargado desde Google Cloud Console
const credentialsFilePath = 'D:/cristian trabajo/CM ARTS PRODUCCION/nuvevoexp/credenciales.json'; // Actualiza la ruta según tu archivo de credenciales

async function showImportedContacts() {
    try {
      // Leer el archivo de credenciales
      const credentials = JSON.parse(fs.readFileSync(credentialsFilePath));
  
      // Autenticación
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
      });
      const authClient = await auth.getClient();
  
      // Crear cliente de la API de Google People
      const people = google.people({
        version: 'v1',
        auth: authClient,
      });
  
      // Obtener los contactos importados
      const importedContacts = await people.people.connections.list({
        resourceName: 'people/me',
        personFields: 'names,phoneNumbers',
      });
  
      console.log('Contactos importados:');
      const contacts = importedContacts?.data?.connections || [];
  
      if (contacts.length === 0) {
        console.log('No se encontraron contactos importados.');
      } else {
        contacts.forEach((contact) => {
          const name = contact.names?.[0]?.displayName || 'N/A';
          const phoneNumber = contact.phoneNumbers?.[0]?.value || 'N/A';
  
          console.log('Nombre:', name);
          console.log('Número de teléfono:', phoneNumber);
          console.log('------------------------');
        });
      }
    } catch (error) {
      console.error('Error al obtener los contactos:', error.message);
    }
  }
  
  showImportedContacts();