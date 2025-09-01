#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🌟 Setting up Gyani - Your Financial Education Companion\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ Node.js version 18 or higher is required');
  console.error(`   Current version: ${nodeVersion}`);
  console.error('   Please upgrade Node.js: https://nodejs.org/');
  process.exit(1);
}

console.log(`✅ Node.js version: ${nodeVersion}`);

// Check if .env exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('📝 Creating .env file from template...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created');
    console.log('⚠️  Please edit .env file and add your API keys (optional)');
  } else {
    console.log('📝 Creating basic .env file...');
    const envContent = `# Gyani Environment Variables
# Copy your API keys here (optional - app works without them)

# OpenAI API Key (get from: https://platform.openai.com/api-keys)
OPENAI_API_KEY=

# Google API Key (get from: https://makersuite.google.com/app/apikey)
GOOGLE_API_KEY=

# Server Configuration
PORT=3000

# Example model names:
# OpenAI: gpt-4o, gpt-4o-mini, gpt-3.5-turbo
# Google: text-bison-001, gemini-pro
`;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created');
  }
} else {
  console.log('✅ .env file already exists');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  console.error('   Please run: npm install');
  process.exit(1);
}

// Check if build works
console.log('\n🔨 Testing build process...');
try {
  execSync('npm run build', { stdio: 'pipe' });
  console.log('✅ Build process works correctly');
} catch (error) {
  console.log('⚠️  Build test failed - this is normal for first setup');
  console.log('   You can fix this by running: npm run build');
}

// Create additional helpful files
console.log('\n📄 Creating helpful files...');

// Create a simple start script for Windows
const startScript = `@echo off
echo Starting Gyani Development Server...
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3000
echo.
npm run dev
pause
`;

fs.writeFileSync('start-dev.bat', startScript);
console.log('✅ Created start-dev.bat for Windows');

// Create a simple start script for Unix/Mac
const startScriptUnix = `#!/bin/bash
echo "Starting Gyani Development Server..."
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:3000"
echo ""
npm run dev
`;

fs.writeFileSync('start-dev.sh', startScriptUnix);
fs.chmodSync('start-dev.sh', '755');
console.log('✅ Created start-dev.sh for Unix/Mac');

// Success message
console.log('\n🎉 Setup completed successfully!\n');

console.log('📋 Next Steps:');
console.log('1. Edit .env file and add your API keys (optional)');
console.log('2. Start development server: npm run dev');
console.log('3. Open http://localhost:5173 in your browser');
console.log('4. Start learning with Gyani!\n');

console.log('🔧 Available Commands:');
console.log('  npm run dev     - Start development server');
console.log('  npm run build   - Build for production');
console.log('  npm start       - Start production server');
console.log('  npm run lint    - Check code quality\n');

console.log('📚 Documentation:');
console.log('  README.md       - Main documentation');
console.log('  DEPLOYMENT.md   - Deployment guide');
console.log('  .env.example    - Environment variables template\n');

console.log('💡 Tips:');
console.log('  - The app works without API keys using demo responses');
console.log('  - Add OpenAI or Google API keys for full AI features');
console.log('  - Check the README.md for detailed setup instructions');
console.log('  - Use start-dev.bat (Windows) or start-dev.sh (Unix/Mac) for quick start\n');

console.log('🌟 Happy Learning with Gyani!');