# StreamFlix — Streaming UI Clone

A responsive, Netflix-inspired **frontend demo** built with plain HTML, CSS and JavaScript. It is branded as StreamFlix rather than using Netflix branding.

## Features
- Responsive dark streaming-service layout
- Hero feature section and title cards
- Search by title or genre
- Genre filter
- Details modal
- Add/remove titles from My List (stored in memory until page refresh)
- Toast feedback and mobile-friendly layout
- No build step or framework required

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a browser, or run a simple local server:
   ```bash
   python -m http.server 8000
   ```
3. Visit `http://localhost:8000`.

## Deploy to AWS S3 static website hosting
This is a static frontend, so you can host it with S3. For a production/public website, AWS recommends serving the private S3 bucket through CloudFront rather than making the bucket public.

### Quick S3 setup
1. Open AWS Console → **S3** → Create bucket (choose a globally unique name and your region).
2. Upload `index.html`, `styles.css`, `script.js`, and `README.md`.
3. For a public demo using the S3 website endpoint, enable **Static website hosting** in the bucket's Properties and set `index.html` as the index document. This approach requires public-read access and is not recommended for sensitive content.
4. For a safer public deployment, keep the bucket private and configure **CloudFront** with the S3 bucket as origin and Origin Access Control (OAC). Set the default root object to `index.html`, then create the distribution.
5. Open the CloudFront distribution domain to test the site. After changes, invalidate the CloudFront cache (for example `/*`) if needed.

### Optional AWS CLI upload
Configure the AWS CLI first with `aws configure`, then run from the project folder:
```bash
aws s3 sync . s3://YOUR_BUCKET_NAME --exclude ".git/*" --exclude "README.md"
```
If using CloudFront, invalidate after an update:
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## Push to GitHub
From this folder:
```bash
git init
git add .
git commit -m "Add StreamFlix streaming UI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Important limitations
- This is a **frontend UI demo**, not a full streaming service.
- Play buttons show demo messages; there is no video streaming, login, payment, backend, or database.
- My List is held in browser memory and resets on refresh.
- Posters/backdrops load from Unsplash URLs and therefore require an internet connection.
- Use content you own or are licensed to use if you add real movie posters or videos.
