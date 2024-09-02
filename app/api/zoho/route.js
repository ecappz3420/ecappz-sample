import { NextResponse } from 'next/server';
import { refreshZohoAccessToken } from '../../utils/zohoAuth';
import { getZohoCreatorRecords } from '../../utils/zohoAuth';

export async function GET() {
  try {
    const access_token = await refreshZohoAccessToken();

    const appLinkName = 'admin';
    const reportName = 'All_Projects';

    const records = await getZohoCreatorRecords(access_token, appLinkName, reportName);

    return NextResponse.json({ records });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch records from Zoho Creator' }, { status: 500 });
  }
}
