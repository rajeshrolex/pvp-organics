# Download dry fruits images from Lorem Picsum (reliable placeholder service with real photos)
# These are royalty-free, high-quality photos

$images = @(
    @{url="https://picsum.photos/id/102/1200/800"; name="cashews.jpg"; desc="Cashew Nuts"},
    @{url="https://picsum.photos/id/225/1200/800"; name="dates-black.jpg"; desc="Dates Black"},
    @{url="https://picsum.photos/id/292/1200/800"; name="dates-white.jpg"; desc="Dates White"},
    @{url="https://picsum.photos/id/133/1200/800"; name="walnuts.jpg"; desc="Walnuts"},
    @{url="https://picsum.photos/id/175/1200/800"; name="raisins-black.jpg"; desc="Black Raisins"},
    @{url="https://picsum.photos/id/199/1200/800"; name="raisins-golden.jpg"; desc="Golden  Raisins"},
    @{url="https://picsum.photos/id/234/1200/800"; name="apricots.jpg"; desc="Dry Apricots"},
    @{url="https://picsum.photos/id/163/1200/800"; name="figs.jpg"; desc="Dry Figs"}
)

Write-Host "🌟 Downloading dry fruits images..." -ForegroundColor Cyan
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($img in $images) {
    $outFile = Join-Path "public" $img.name
    Write-Host "📥 Downloading $($img.desc)..." -ForegroundColor Yellow
    
    try {
        Invoke-WebRequest -Uri $img.url -OutFile $outFile -UserAgent "Mozilla/5.0" -TimeoutSec 30
        $fileSize = (Get-Item $outFile).Length / 1KB
        Write-Host "   ✅ Success - $($img.name) ($([math]::Round($fileSize, 2)) KB)" -ForegroundColor Green
        $successCount++
        Start-Sleep -Milliseconds 500
    }
    catch {
        Write-Host "   ❌ Failed - $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "📊 Download Summary:" -ForegroundColor Cyan
Write-Host "   ✅ Success: $successCount/$($images.Count)" -ForegroundColor Green
Write-Host "   ❌ Failed: $failCount/$($images.Count)" -ForegroundColor Red

if ($successCount -eq $images.Count) {
    Write-Host ""
    Write-Host "🎉 All images downloaded successfully!" -ForegroundColor Green
}
