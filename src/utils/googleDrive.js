const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const FILENAME = 'mood_journal_data.json';

let tokenClient;
let gapiInited = false;
let gisInited = false;

export const initGoogleDrive = (onInitComplete) => {
    const checkInit = () => {
        if (gapiInited && gisInited) {
            onInitComplete(true);
        }
    };

    gapi.load('client', async () => {
        await gapi.client.init({
            discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        checkInit();
    });

    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: async (resp) => {
            if (resp.error !== undefined) {
                throw resp;
            }
        },
    });
    gisInited = true;
    checkInit();
};

export const requestLogin = () => {
    return new Promise((resolve, reject) => {
        tokenClient.callback = (resp) => {
            if (resp.error) {
                reject(resp);
            } else {
                resolve(resp);
            }
        };
        tokenClient.requestAccessToken({ prompt: 'consent' });
    });
};

export const findFile = async () => {
    try {
        const response = await gapi.client.drive.files.list({
            q: `name = '${FILENAME}' and trashed = false`,
            fields: 'files(id, name)',
            spaces: 'drive',
        });
        const files = response.result.files;
        if (files && files.length > 0) {
            return files[0].id;
        }
        return null;
    } catch (err) {
        console.error('Error finding file', err);
        throw err;
    }
};

export const readFile = async (fileId) => {
    try {
        const response = await gapi.client.drive.files.get({
            fileId: fileId,
            alt: 'media',
        });
        return response.result; // Should be the JSON object
    } catch (err) {
        console.error('Error reading file', err);
        throw err;
    }
};

export const createFile = async (data) => {
    try {
        const fileContent = JSON.stringify(data);
        const metadata = {
            name: FILENAME,
            mimeType: 'application/json',
        };

        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', new Blob([fileContent], { type: 'application/json' }));

        const accessToken = gapi.client.getToken().access_token;

        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
            body: form,
        });

        return await response.json();
    } catch (err) {
        console.error('Error creating file', err);
        throw err;
    }
};

export const updateFile = async (fileId, data) => {
    try {
        const fileContent = JSON.stringify(data);
        const metadata = {
            mimeType: 'application/json',
        };

        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', new Blob([fileContent], { type: 'application/json' }));

        const accessToken = gapi.client.getToken().access_token;

        const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`, {
            method: 'PATCH',
            headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
            body: form,
        });

        return await response.json();
    } catch (err) {
        console.error('Error updating file', err);
        throw err;
    }
};
