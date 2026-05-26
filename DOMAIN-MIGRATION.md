# Domain Migration Guide
## From `careplasma.nyctailblazers.com` → `careplasma.com`

This guide walks Care Plasma through migrating their hosted site from the NYC Tailblazers subdomain to their own `careplasma.com` domain. The site lives in the `kaoz625/care-plasma` GitHub repo and is deployed via **Cloudflare Pages**.

---

## Step 1 — Connect the Repo to Cloudflare Pages

> _Do this once. Skip if already done._

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to **Workers & Pages → Create application → Pages → Connect to Git**
3. Select the `kaoz625/care-plasma` repository
4. Set build settings:
   - **Framework preset:** None
   - **Build command:** _(leave blank)_
   - **Build output directory:** `/` (root)
5. Click **Save and Deploy**
6. Cloudflare will assign a preview URL like `care-plasma-abc.pages.dev`

---

## Step 2 — Add the Subdomain (careplasma.nyctailblazers.com)

This makes the site live at `careplasma.nyctailblazers.com` while the client prepares their own domain.

1. In your Cloudflare Pages project → **Custom domains → Add a custom domain**
2. Enter: `careplasma.nyctailblazers.com`
3. Cloudflare will prompt you to add a DNS record. In **Cloudflare DNS for nyctailblazers.com**, add:
   - **Type:** CNAME
   - **Name:** `careplasma`
   - **Target:** `<your-project>.pages.dev`
   - **Proxy status:** Proxied (orange cloud)
4. Wait 1–5 minutes. The site will be live at `https://careplasma.nyctailblazers.com`

---

## Step 3 — Switch to careplasma.com (When Ready)

When the client is ready to go live on their own domain:

### 3a. Add careplasma.com to Cloudflare Pages
1. In the Pages project → **Custom domains → Add a custom domain**
2. Enter: `careplasma.com` — then repeat for `www.careplasma.com`
3. Cloudflare will show the DNS records needed

### 3b. Update careplasma.com DNS
Log in to wherever careplasma.com's DNS is managed (e.g., GoDaddy, Namecheap, Cloudflare) and update:

| Type  | Name | Value                              |
|-------|------|------------------------------------|
| CNAME | `@`  | `<your-project>.pages.dev`        |
| CNAME | `www`| `<your-project>.pages.dev`        |

> If the registrar does not support CNAME on the root (`@`), use an **A record** pointing to Cloudflare's IPs instead, or transfer the domain to Cloudflare for full CNAME flattening.

### 3c. Update the CNAME file in this repo
1. Edit `CNAME` in this repo and change its content to:
   ```
   careplasma.com
   ```
2. Commit and push to the `main` branch
3. Cloudflare Pages will redeploy automatically

### 3d. Add a redirect from the old subdomain (optional but recommended)
Create a `_redirects` file in the repo root:
```
https://careplasma.nyctailblazers.com/* https://careplasma.com/:splat 301
```
This ensures anyone who bookmarked the old URL is forwarded seamlessly.

---

## Step 4 — SSL (Automatic)

Cloudflare Pages handles SSL for all custom domains automatically. Both `careplasma.com` and `www.careplasma.com` will get free HTTPS certificates within minutes of DNS propagation.

---

## Step 5 — Verify

After DNS propagates (usually 5–30 minutes, up to 24 hours):

- [ ] `https://careplasma.com` loads the site
- [ ] `https://www.careplasma.com` redirects or loads correctly
- [ ] SSL padlock is green
- [ ] All internal links work (they are all relative, so no changes needed)
- [ ] Social links work: Facebook, Instagram, YouTube
- [ ] Google Maps embed loads on Location and Home pages
- [ ] Booking form submits correctly

---

## Quick Reference

| Item | Value |
|------|-------|
| GitHub repo | `kaoz625/care-plasma` |
| Current subdomain | `careplasma.nyctailblazers.com` |
| Target domain | `careplasma.com` |
| Hosting | Cloudflare Pages (static, no build step) |
| Support email | `info@careplasma.com` |
| Support phone | `212.996.9500` |

---

_Guide prepared by NYC Tailblazers. Questions? Email admin@nyctailblazers.com_
