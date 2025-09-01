# 🚀 Gyani Deployment Guide

This guide provides comprehensive instructions for deploying Gyani to various platforms.

## 📋 Pre-Deployment Checklist

### ✅ Required Files
- [ ] All source code files are present
- [ ] `package.json` with all dependencies
- [ ] Environment variables configured
- [ ] Build scripts working locally
- [ ] No sensitive data in code

### ✅ Environment Variables
```bash
# Optional - App works without these
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
PORT=3000
```

### ✅ Local Testing
```bash
# Test development build
npm run dev

# Test production build
npm run build
npm start

# Verify all features work
npm run health-check
```

## 🌐 Platform-Specific Deployment

### 1. Vercel (Recommended) ⭐

**Why Vercel?**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Serverless functions
- Free tier available

**Deployment Steps:**

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and deploy
   vercel login
   vercel
   ```

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**
   ```bash
   # Add via Vercel dashboard or CLI
   vercel env add OPENAI_API_KEY
   vercel env add GOOGLE_API_KEY
   ```

4. **Custom Domain (Optional)**
   ```bash
   vercel domains add your-domain.com
   ```

### 2. Netlify 🌟

**Deployment Steps:**

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository

2. **Build Settings**
   ```yaml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/:splat"
     status = 200
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add `OPENAI_API_KEY` and `GOOGLE_API_KEY`

### 3. Railway 🚂

**Deployment Steps:**

1. **Connect Repository**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   railway link
   railway up
   ```

2. **Environment Variables**
   ```bash
   railway variables set OPENAI_API_KEY=your_key
   railway variables set GOOGLE_API_KEY=your_key
   railway variables set PORT=3000
   ```

### 4. Heroku 🟣

**Deployment Steps:**

1. **Prepare for Heroku**
   ```bash
   # Install Heroku CLI
   # Create Procfile
   echo "web: npm start" > Procfile
   ```

2. **Deploy**
   ```bash
   heroku create your-app-name
   heroku config:set OPENAI_API_KEY=your_key
   heroku config:set GOOGLE_API_KEY=your_key
   git push heroku main
   ```

### 5. DigitalOcean App Platform 🌊

**Deployment Steps:**

1. **Create App**
   - Go to DigitalOcean App Platform
   - Connect your repository

2. **Configure**
   ```yaml
   # .do/app.yaml
   name: gyani-finance-app
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/your-repo
       branch: main
     run_command: npm start
     build_command: npm run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: OPENAI_API_KEY
       value: your_key
       type: SECRET
     - key: GOOGLE_API_KEY
       value: your_key
       type: SECRET
   ```

### 6. AWS (Advanced) ☁️

**Using AWS Amplify:**

1. **Setup**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   amplify init
   ```

2. **Deploy**
   ```bash
   amplify add hosting
   amplify publish
   ```

**Using AWS EC2:**

1. **Launch EC2 Instance**
   - Choose Ubuntu 20.04 LTS
   - Configure security groups (ports 80, 443, 22)

2. **Setup Server**
   ```bash
   # SSH into instance
   ssh -i your-key.pem ubuntu@your-instance-ip
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Clone and setup
   git clone your-repo-url
   cd your-repo
   npm install
   npm run build
   
   # Start with PM2
   pm2 start server/index.js --name gyani
   pm2 startup
   pm2 save
   ```

## 🔧 Advanced Configuration

### Custom Domain Setup

1. **DNS Configuration**
   ```
   Type: CNAME
   Name: www
   Value: your-deployment-url.vercel.app
   
   Type: A
   Name: @
   Value: your-server-ip (if using VPS)
   ```

2. **SSL Certificate**
   - Most platforms provide automatic HTTPS
   - For custom servers, use Let's Encrypt:
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

### Environment-Specific Builds

```bash
# Development
NODE_ENV=development npm run dev

# Staging
NODE_ENV=staging npm run build

# Production
NODE_ENV=production npm run build
```

### Performance Optimization

1. **Enable Compression**
   ```javascript
   // server/index.js
   const compression = require('compression');
   app.use(compression());
   ```

2. **Static File Caching**
   ```javascript
   app.use(express.static('dist', {
     maxAge: '1y',
     etag: false
   }));
   ```

3. **CDN Setup**
   - Use Cloudflare for global CDN
   - Configure caching rules
   - Enable minification

## 📊 Monitoring & Analytics

### Health Monitoring

```bash
# Add health check endpoint
curl https://your-domain.com/api/health
```

### Error Tracking

1. **Sentry Integration**
   ```bash
   npm install @sentry/node @sentry/react
   ```

2. **Google Analytics**
   ```html
   <!-- Add to index.html -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

### Performance Monitoring

1. **Lighthouse CI**
   ```bash
   npm install -g @lhci/cli
   lhci autorun
   ```

2. **Web Vitals**
   ```javascript
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
   
   getCLS(console.log);
   getFID(console.log);
   getFCP(console.log);
   getLCP(console.log);
   getTTFB(console.log);
   ```

## 🔒 Security Considerations

### Production Security

1. **Environment Variables**
   - Never commit API keys
   - Use platform-specific secret management
   - Rotate keys regularly

2. **HTTPS Enforcement**
   ```javascript
   // Redirect HTTP to HTTPS
   app.use((req, res, next) => {
     if (req.header('x-forwarded-proto') !== 'https') {
       res.redirect(`https://${req.header('host')}${req.url}`);
     } else {
       next();
     }
   });
   ```

3. **Security Headers**
   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```

### API Security

1. **Rate Limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

2. **Input Validation**
   ```javascript
   const { body, validationResult } = require('express-validator');
   
   app.post('/api/chat',
     body('messages').isArray(),
     body('provider').isIn(['openai', 'google', 'local']),
     (req, res) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }
       // Process request
     }
   );
   ```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **API Errors**
   ```bash
   # Check environment variables
   echo $OPENAI_API_KEY
   
   # Test API endpoints
   curl -X POST https://your-domain.com/api/health
   ```

3. **Memory Issues**
   ```bash
   # Increase Node.js memory limit
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

### Debugging

1. **Enable Debug Logs**
   ```javascript
   // server/index.js
   if (process.env.NODE_ENV === 'development') {
     app.use((req, res, next) => {
       console.log(`${req.method} ${req.path}`, req.body);
       next();
     });
   }
   ```

2. **Error Logging**
   ```javascript
   app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).json({ error: 'Something went wrong!' });
   });
   ```

## 📈 Post-Deployment

### Performance Testing

```bash
# Load testing with Artillery
npm install -g artillery
artillery quick --count 10 --num 5 https://your-domain.com
```

### SEO Optimization

1. **Meta Tags**
   ```html
   <meta name="description" content="Learn investing with Gyani - Your AI-powered financial education companion">
   <meta name="keywords" content="investment education, stock market, financial literacy, India">
   ```

2. **Sitemap Generation**
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://your-domain.com/</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```

### Analytics Setup

1. **Google Analytics 4**
2. **User behavior tracking**
3. **Conversion funnel analysis**
4. **Performance metrics**

## 🎉 Success Checklist

- [ ] Application loads successfully
- [ ] All features work as expected
- [ ] API endpoints respond correctly
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable
- [ ] Security headers configured
- [ ] Monitoring and alerts set up
- [ ] Backup and recovery plan in place

## 📞 Support

If you encounter issues during deployment:

1. Check the troubleshooting section
2. Review platform-specific documentation
3. Test locally first
4. Check environment variables
5. Verify all dependencies are installed

---

**🌟 Congratulations! Your Gyani application is now live and helping users learn about finance!**