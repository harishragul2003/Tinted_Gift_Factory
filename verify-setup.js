#!/usr/bin/env node

/**
 * Surprise Basket - Setup Verification Script
 * Checks if all dependencies and configurations are correct
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}`),
};

let errors = 0;
let warnings = 0;

// Check Node.js version
function checkNodeVersion() {
  log.header('Checking Node.js Version...');
  const version = process.version;
  const major = parseInt(version.split('.')[0].substring(1));
  
  if (major >= 18) {
    log.success(`Node.js ${version} (Required: v18+)`);
  } else {
    log.error(`Node.js ${version} is too old. Please upgrade to v18 or higher.`);
    errors++;
  }
}

// Check if directories exist
function checkDirectories() {
  log.header('Checking Project Structure...');
  
  const requiredDirs = [
    'frontend',
    'backend',
    'frontend/src',
    'backend/config',
    'backend/controllers',
    'backend/routes',
    'backend/middleware',
  ];
  
  requiredDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      log.success(`Directory exists: ${dir}`);
    } else {
      log.error(`Missing directory: ${dir}`);
      errors++;
    }
  });
}

// Check if package.json files exist
function checkPackageFiles() {
  log.header('Checking Package Files...');
  
  const packageFiles = [
    'frontend/package.json',
    'backend/package.json',
  ];
  
  packageFiles.forEach(file => {
    if (fs.existsSync(file)) {
      log.success(`Found: ${file}`);
      
      // Check if node_modules exists
      const dir = path.dirname(file);
      const nodeModules = path.join(dir, 'node_modules');
      
      if (fs.existsSync(nodeModules)) {
        log.success(`Dependencies installed: ${dir}`);
      } else {
        log.warning(`Dependencies not installed: ${dir}`);
        log.info(`Run: cd ${dir} && npm install`);
        warnings++;
      }
    } else {
      log.error(`Missing: ${file}`);
      errors++;
    }
  });
}

// Check environment files
function checkEnvFiles() {
  log.header('Checking Environment Files...');
  
  const envFiles = [
    { path: 'backend/.env', example: 'backend/.env.example' },
    { path: 'frontend/.env', example: 'frontend/.env.example' },
  ];
  
  envFiles.forEach(({ path: envPath, example }) => {
    if (fs.existsSync(envPath)) {
      log.success(`Found: ${envPath}`);
      
      // Check if file has content
      const content = fs.readFileSync(envPath, 'utf8');
      if (content.trim().length > 0) {
        log.success(`${envPath} has configuration`);
      } else {
        log.warning(`${envPath} is empty`);
        warnings++;
      }
    } else {
      if (fs.existsSync(example)) {
        log.warning(`Missing: ${envPath} (example exists)`);
        log.info(`Run: cp ${example} ${envPath}`);
      } else {
        log.error(`Missing: ${envPath} and ${example}`);
        errors++;
      }
      warnings++;
    }
  });
}

// Check required files
function checkRequiredFiles() {
  log.header('Checking Required Files...');
  
  const requiredFiles = [
    'frontend/src/App.tsx',
    'frontend/src/main.tsx',
    'frontend/index.html',
    'backend/server.js',
    'backend/config/db.js',
    'README.md',
  ];
  
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      log.success(`Found: ${file}`);
    } else {
      log.error(`Missing: ${file}`);
      errors++;
    }
  });
}

// Check database schema
function checkDatabaseFiles() {
  log.header('Checking Database Files...');
  
  if (fs.existsSync('backend/database/schema.sql')) {
    log.success('Database schema file exists');
    log.info('Remember to run this SQL in your Supabase project');
  } else {
    log.error('Missing: backend/database/schema.sql');
    errors++;
  }
}

// Check configuration files
function checkConfigFiles() {
  log.header('Checking Configuration Files...');
  
  const configFiles = [
    'frontend/tsconfig.json',
    'frontend/vite.config.ts',
    'frontend/tailwind.config.js',
    'frontend/postcss.config.js',
  ];
  
  configFiles.forEach(file => {
    if (fs.existsSync(file)) {
      log.success(`Found: ${file}`);
    } else {
      log.warning(`Missing: ${file}`);
      warnings++;
    }
  });
}

// Print summary
function printSummary() {
  log.header('Verification Summary');
  
  console.log('');
  if (errors === 0 && warnings === 0) {
    log.success('All checks passed! Your setup looks good. 🎉');
    console.log('');
    log.info('Next steps:');
    console.log('  1. Update backend/.env with your database credentials');
    console.log('  2. Run database schema in Supabase');
    console.log('  3. Start backend: cd backend && npm run dev');
    console.log('  4. Start frontend: cd frontend && npm run dev');
  } else {
    if (errors > 0) {
      log.error(`Found ${errors} error(s) that need to be fixed.`);
    }
    if (warnings > 0) {
      log.warning(`Found ${warnings} warning(s) that should be addressed.`);
    }
    console.log('');
    log.info('Please fix the issues above and run this script again.');
  }
  console.log('');
}

// Main execution
function main() {
  console.log('');
  console.log('🎁 Surprise Basket - Setup Verification');
  console.log('========================================');
  
  checkNodeVersion();
  checkDirectories();
  checkPackageFiles();
  checkEnvFiles();
  checkRequiredFiles();
  checkDatabaseFiles();
  checkConfigFiles();
  printSummary();
  
  process.exit(errors > 0 ? 1 : 0);
}

main();
