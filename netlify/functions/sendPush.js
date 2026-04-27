export async function handler(event, context) {
  try {
    // 1. GET TOKENS FROM SUPABASE
    const res = await fetch("https://YOUR_PROJECT.supabase.co/rest/v1/push_tokens?select=token", {
      headers: {
        apikey: process.env.SUPABASE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`
      }
    });

    const data = await res.json();
    const tokens = data.map(t => t.token).filter(Boolean);

    if (!tokens.length) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "No tokens found" })
      };
    }

    // 2. SEND PUSH VIA FIREBASE
    const pushRes = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=${process.env.FIREBASE_SERVER_KEY}`
      },
      body: JSON.stringify({
        registration_ids: tokens,
        notification: {
          title: "🔥 NEW CONFIG LIVE",
          body: "Tap to unlock now"
        },
        data: {
          url: "https://cfg.itachigoat.co.za"
        }
      })
    });

    const pushData = await pushRes.json();

    return {
      statusCode: 200,
      body: JSON.stringify(pushData)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
