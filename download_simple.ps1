# Simple PowerShell script to download dry fruits images
# Using food.com and other sources

Write-Host "Downloading dry fruits images..."

# Cashews
Invoke-WebRequest -Uri "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/cashew-4fbf7e9.jpg" -OutFile "public\cashews.jpg" -UserAgent "Mozilla/5.0"
Write-Host "Downloaded cashews.jpg"

# Dates - Black
Invoke-WebRequest -Uri "https://images.immediate.co.uk/production/volatile/sites/30/2021/02/medjool-dates-9ab9607.jpg" -OutFile "public\dates-black.jpg" -UserAgent "Mozilla/5.0"
Write-Host "Downloaded dates-black.jpg"

# Dates - White/Golden
Invoke-WebRequest -Uri "https://cdn.loveandlemons.com/wp-content/uploads/2020/12/dates.jpg" -OutFile "public\dates-white.jpg" -UserAgent "Mozilla/5.0"
Write-Host "Downloaded dates-white.jpg"

# Walnuts
Invoke-WebRequest -Uri "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/walnuts-de2378f.jpg" -OutFile "public\walnuts.jpg" -UserAgent "Mozilla/5.0"
Write-Host "Downloaded walnuts.jpg"

# Raisins - Black
Invoke-WebRequest -Uri "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/raisins-7c0a05f.jpg" -OutFile "public\raisins-black.jpg" -UserAgent "Mozilla/5.0"
Write-Host "Downloaded raisins-black.jpg"

# Raisins - Golden
Invoke-WebRequest -Uri "https://cdn.loveandlemons.com/wp-content/uploads/2020/01/how-to-cook-quinoa.jpg" -OutFile "public\raisins-golden.jpg" -UserAgent "Mozilla/5.0"
Write-Host "Downloaded raisins-golden.jpg"

# Apricots
Invoke-WebRequest -Uri "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/dried-apricots-2666f82.jpg" -OutFile "public\apricots.jpg" -UserAgent "Mozilla/5.0"
Write-Host "Downloaded apricots.jpg"

# Figs
Invoke-WebRequest -Uri "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/dried-figs-ab1bd45.jpg" -OutFile "public\figs.jpg" -UserAgent "Mozilla/5.0"
Write-Host "Downloaded figs.jpg"

Write-Host "All downloads complete!"
