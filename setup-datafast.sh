#!/bin/bash
# Setup Datafast analytics with Vercel proxy
# Usage: ./setup-datafast.sh <website-id> <domain>
# Example: ./setup-datafast.sh dfid_Mq8wt9KvIisuofpYWZouo liliansevoumian.fr

set -e

WEBSITE_ID="$1"
DOMAIN="$2"

if [ -z "$WEBSITE_ID" ] || [ -z "$DOMAIN" ]; then
  echo "Usage: $0 <website-id> <domain>"
  echo "Example: $0 dfid_Mq8wt9KvIisuofpYWZouo liliansevoumian.fr"
  exit 1
fi

echo "==> Setting up Datafast proxy for $DOMAIN ($WEBSITE_ID)"

# 1. Create serverless function
mkdir -p api
cat > api/dfst-events.js << 'FUNC'
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientIp =
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    '';

  const response = await fetch('https://datafa.st/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': req.headers['user-agent'] || '',
      'Origin': req.headers['origin'] || '',
      'x-datafast-real-ip': clientIp,
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.text();
  res.status(response.status).setHeader('Content-Type', 'application/json').send(data);
}
FUNC
echo "    Created api/dfst-events.js"

# 2. Create or update vercel.json with the script rewrite
REWRITE='{ "source": "/js/script.js", "destination": "https://datafa.st/js/script.cookieless.js" }'

if [ -f vercel.json ]; then
  # Check if rewrite already exists
  if grep -q '"/js/script.js"' vercel.json; then
    echo "    vercel.json already has /js/script.js rewrite — skipped"
  else
    # Add rewrite to existing rewrites array, or create it
    if grep -q '"rewrites"' vercel.json; then
      # Insert into existing rewrites array (before the closing bracket)
      sed -i '' 's|\(\"rewrites\": \[\)|\1\n    '"$REWRITE"',|' vercel.json
      echo "    Added rewrite to existing vercel.json"
    else
      # Add rewrites key (before closing brace)
      sed -i '' 's|\(}\)$|,\n  "rewrites": [\n    '"$REWRITE"'\n  ]\n}|' vercel.json
      echo "    Added rewrites section to vercel.json"
    fi
  fi
else
  cat > vercel.json << EOF
{
  "rewrites": [
    $REWRITE
  ]
}
EOF
  echo "    Created vercel.json"
fi

# 3. Print the script tag to add manually
echo ""
echo "==> Done! Add this script tag to your <head>:"
echo ""
echo "    <script defer data-website-id=\"$WEBSITE_ID\" data-domain=\"$DOMAIN\" data-api-url=\"/api/dfst-events\" src=\"/js/script.js\"></script>"
echo ""
echo "    For Astro: add is:inline attribute"
echo "    <script is:inline defer data-website-id=\"$WEBSITE_ID\" data-domain=\"$DOMAIN\" data-api-url=\"/api/dfst-events\" src=\"/js/script.js\"></script>"
echo ""
