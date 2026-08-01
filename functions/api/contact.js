function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderRows(fields) {
  return Object.entries(fields)
    .filter(([, value]) => value)
    .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`)
    .join('\n');
}

async function fileToBase64(file) {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.EMAIL_KEY) {
    return Response.json({ success: false, message: 'Server email is not configured.' }, { status: 500 });
  }

  const contentType = request.headers.get('content-type') || '';

  let fields = {};
  let attachments;

  try {
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) continue;
        fields[key] = value;
      }
      const file = formData.get('attachment');
      if (file && typeof file !== 'string' && file.size > 0) {
        const base64 = await fileToBase64(file);
        attachments = [{ filename: file.name, content: base64 }];
      }
    } else {
      fields = await request.json();
    }
  } catch {
    return Response.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, subject, ...rest } = fields;

  if (!name || !email) {
    return Response.json({ success: false, message: 'Name and email are required.' }, { status: 400 });
  }

  const emailPayload = {
    from: 'onboarding@resend.dev',
    to: ['dadisteelball@outlook.com','wlshanshi@rz-public.sd.cninfo.net'],
    reply_to: email,
    subject: subject || `New Inquiry from ${name}`,
    html: `
      <h2>${escapeHtml(subject || 'New Inquiry')}</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${renderRows(rest)}
    `,
  };

  if (attachments) {
    emailPayload.attachments = attachments;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.EMAIL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailPayload),
  });

  const result = await response.json();

  if (!response.ok) {
    return Response.json({ success: false, message: result?.message || 'Failed to send email.' }, { status: response.status });
  }

  return Response.json({ success: true, result });
}
