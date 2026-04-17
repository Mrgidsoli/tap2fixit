exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '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',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 250,
        system: 'You are a helpful AI assistant for tap2fixit in Jacksonville FL. Help with services, pricing, location, bookings. Be short and friendly. Address: 9016 Lem Turner Rd Jacksonville FL 32208. Phone: +1 904 765-9588. Hours: Mon-Fri 9AM-6PM Sat 10AM-4PM Sun Closed. Services: iPhone Screen $79-$199, Laptop Screen $85-$150, Virus Cleaning $65-$150, Windows 11 $145-$175, Battery/Memory from $65, Gaming PC $250-$475, Apple $150-$175, Free Diagnosis always free.',
        messages: body.messages
      })
    });

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch(error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
