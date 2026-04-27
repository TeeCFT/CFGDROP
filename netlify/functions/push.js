export async function handler(event, context) {
  const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY;

  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${ONESIGNAL_API_KEY}`
      },
      body: JSON.stringify({
        app_id: "e8570777-dace-4284-b39c-351bc509b7a3",
        included_segments: ["All"],
        contents: {
          en: "🔥 NEW CONFIG LIVE — TAP TO UNLOCK"
        },
        url: "https://cfg.itachigoat.co.za"
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
