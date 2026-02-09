# PalDeck Quick Start Script
# Run this after setting up your .env file

Write-Host "🚀 PalDeck Quick Start" -ForegroundColor Cyan
Write-Host "=====================`n" -ForegroundColor Cyan

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
    Write-Host "Creating .env from template...`n" -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env file" -ForegroundColor Green
    Write-Host "📝 Please edit .env with your Supabase credentials" -ForegroundColor Cyan
    Write-Host "   1. Go to https://supabase.com" -ForegroundColor White
    Write-Host "   2. Create a project" -ForegroundColor White
    Write-Host "   3. Copy Project URL and anon key" -ForegroundColor White
    Write-Host "   4. Paste into .env file`n" -ForegroundColor White
    
    $continue = Read-Host "Press Enter when ready to continue (or Ctrl+C to exit)"
}

Write-Host "`n📦 Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`n📚 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Setup Supabase (see SETUP.md)" -ForegroundColor White
Write-Host "   2. Run: npm run dev" -ForegroundColor White
Write-Host "   3. Open: http://localhost:5173`n" -ForegroundColor White

Write-Host "📖 For detailed instructions, see:" -ForegroundColor Cyan
Write-Host "   - SETUP.md (complete setup guide)" -ForegroundColor White
Write-Host "   - PROJECT_SUMMARY.md (feature overview)" -ForegroundColor White
Write-Host "   - README.md (project info)`n" -ForegroundColor White

$start = Read-Host "Start development server now? (y/n)"
if ($start -eq "y" -or $start -eq "Y") {
    Write-Host "`n🚀 Starting development server..." -ForegroundColor Cyan
    npm run dev
}
