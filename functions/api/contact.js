export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // 获取前端提交的数据
    const data = await request.json();

    const {
      name,
      email,
      company,
      phone,
      message
    } = data;


    // 基础校验
    if (!name || !email || !message) {
      return Response.json(
        {
          success: false,
          message: "Missing required fields"
        },
        {
          status: 400
        }
      );
    }


    // 调用 Resend
    const resendResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({

          // 测试阶段使用
          from: "onboarding@resend.dev",

          // 必须填写你的 Resend 注册邮箱
          to: [
            "你的Resend注册邮箱@example.com"
          ],

          subject:
            `New Website Inquiry - ${name}`,

          html: `
            <h2>New Customer Inquiry</h2>

            <p>
              <strong>Name:</strong>
              ${name}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Company:</strong>
              ${company || ""}
            </p>

            <p>
              <strong>Phone:</strong>
              ${phone || ""}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <p>
              ${message}
            </p>

          `
        })
      }
    );


    const result = await resendResponse.json();


    if (!resendResponse.ok) {

      return Response.json(
        {
          success: false,
          resendError: result
        },
        {
          status: 500
        }
      );
    }


    return Response.json({
      success: true,
      message: "Email sent successfully"
    });


  } catch (error) {

    return Response.json(
      {
        success: false,
        error: error.message
      },
      {
        status: 500
      }
    );
  }
}