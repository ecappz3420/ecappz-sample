import { refreshZohoAccessToken, getZohoCreatorRecords } from './utils/zohoAuth';

export default async function Page() {
  let records = [];

  try {
    const access_token = await refreshZohoAccessToken();
    console.log(access_token);

    
    const appLinkName = 'admin'; 
    const reportName = 'All_Projects'; 
    const response = await getZohoCreatorRecords(access_token, appLinkName, reportName);
    records = response.data || [];
  } catch (error) {
    console.error('Error fetching records:', error);
  }

  return (
    <div>
      <h1>Zoho Creator Records</h1>
      <ul>
        {records.map((record, index) => (
          <li key={index}>{JSON.stringify(record)}</li>
        ))}
      </ul>
    </div>
  );
}
