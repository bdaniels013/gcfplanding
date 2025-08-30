# 🚀 Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub** (already done!)
2. **Go to [vercel.com](https://vercel.com)** and sign in
3. **Click "New Project"**
4. **Import your GitHub repository**: `bdaniels013/gcfplanding`
5. **Configure project settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. **Click "Deploy"**

### Option 2: Deploy from Local Files

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Build your project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

## 🎯 Post-Deployment

### Custom Domain (Optional)
1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### Environment Variables
If you need to add environment variables:
1. Go to project settings
2. Click "Environment Variables"
3. Add any required variables

## 🔄 Automatic Deployments

- **Every push to `main` branch** will automatically trigger a new deployment
- **Preview deployments** are created for pull requests
- **Rollback** to previous versions anytime from the dashboard

## 📊 Performance Monitoring

Vercel provides:
- Real-time performance metrics
- Core Web Vitals tracking
- Analytics dashboard
- Error monitoring

## 🆘 Troubleshooting

### Build Errors
- Check that all dependencies are in `package.json`
- Ensure Node.js version is 16+
- Verify build command works locally

### 3D Graphics Issues
- Check browser console for WebGL errors
- Ensure device supports WebGL
- Test on different browsers

### Performance Issues
- The 3D bundle is large (~1.2MB) - this is normal for 3D graphics
- Consider implementing lazy loading for 3D components
- Use Vercel's edge functions for better performance

## 🌟 Pro Tips

1. **Enable Vercel Analytics** for user behavior insights
2. **Use Vercel Edge Functions** for dynamic content
3. **Set up monitoring** for uptime and performance
4. **Configure caching** for static assets

---

**Your foam party landing page is now live and ready to convert customers! 🎉🌊**
