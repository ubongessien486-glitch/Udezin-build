$backupPath = 'C:\Users\LENOVO\.gemini\antigravity\scratch\Udezin\udezin.md'
$lines = Get-Content -Path $backupPath

$currentFile = $null
$capture = $false
$content = @()

foreach ($line in $lines) {
    if ($line -match '^## (.*)') {
        $currentFile = $matches[1]
        Write-Host "Found file marker: $currentFile"
        $capture = $false
        $content = @()
        continue
    }

    if ($currentFile) {
        if ($line -match '^```.*$') {
            if ($capture) {
                # End of block
                $fullPath = "C:\Users\LENOVO\.gemini\antigravity\scratch\Udezin\$currentFile"
                $dir = Split-Path -Parent $fullPath
                if (!(Test-Path -Path $dir)) { New-Item -ItemType Directory -Path $dir -Force }
                $content | Out-File -FilePath $fullPath -Encoding utf8
                Write-Host "Wrote: $fullPath"
                $currentFile = $null
                $capture = $false
            } else {
                # Start of block
                $capture = $true
            }
            continue
        }

        if ($capture) {
            $content += $line
        }
    }
}
