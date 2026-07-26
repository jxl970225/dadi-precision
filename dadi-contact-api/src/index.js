export default {
  async fetch(request, env) {

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405
      });
    }

    const data = await request.json();

    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: ["1821853561@qq.com"],
          subject: "Website Inquiry",
          html: `
          <h2>New Inquiry</h2>
          <p>${data.message}</p>
          `
        })
      }
    );

    return new Response(
      await response.text()
    );
  }
};