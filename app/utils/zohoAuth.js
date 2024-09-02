import axios from "axios";

export async function refreshZohoAccessToken() {
    try {
      const response = await axios.post('https://accounts.zoho.in/oauth/v2/token', null, {
        params: {
          refresh_token: process.env.REFRESH_TOKEN,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: 'refresh_token',
        },
      });
  
      const { access_token } = response.data;
      process.env.ZOHO_ACCESS_TOKEN = access_token;
      return access_token;
    } catch (error) {
      console.error('Failed to refresh Zoho access token', error);
      throw error;
    }
  }

  export async function getZohoCreatorRecords(accessToken, appLinkName, reportName) {
    try {
      const response = await axios.get(`https://creator.zoho.in/api/v2/ecappz/${appLinkName}/report/${reportName}`, {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      });
  
      console.log('Fetched Records:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching records:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
  