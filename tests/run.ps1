# Runs all automated checks. Usage:  powershell -File tests\run.ps1
# 1) static checks on files (manifest, service worker file list, icons, script order, version match)
# 2) browser tests (data, game logic, UI play-through, storage robustness, audio, drawings, layout at 9 screen sizes) in headless Chrome
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$fail = New-Object System.Collections.ArrayList
function Fail($m) { [void]$fail.Add($m); Write-Host "  FAIL: $m" -ForegroundColor Red }

Write-Host "== static checks =="
$index = Get-Content (Join-Path $root "index.html") -Raw -Encoding UTF8
$sw = Get-Content (Join-Path $root "sw.js") -Raw -Encoding UTF8
$app = Get-Content (Join-Path $root "app.js") -Raw -Encoding UTF8
$swFiles = [regex]::Matches(([regex]::Match($sw, 'const FILES = \[(.*?)\];', 'Singleline').Groups[1].Value), '"([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
foreach ($f in $swFiles) { if ($f -ne "./" -and -not (Test-Path (Join-Path $root $f))) { Fail "sw.js lists a file that does not exist: $f" } }
$refs = [regex]::Matches($index, '(?:src|href)="([^"#]+)"') | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_ -notmatch '^https?:' }
foreach ($r in $refs) { if (-not (Test-Path (Join-Path $root $r))) { Fail "index.html references a missing file: $r" } elseif ($swFiles -notcontains $r) { Fail "index.html uses $r but sw.js does not precache it (offline would break)" } }
$vSw = [regex]::Match($sw, 'VERSION = "([^"]+)"').Groups[1].Value; $vApp = [regex]::Match($app, 'VERSION = "([^"]+)"').Groups[1].Value
if ($vSw -ne $vApp) { Fail "VERSION mismatch: sw.js=$vSw app.js=$vApp" } else { Write-Host "  version $vApp (sw.js and app.js agree)" }
try { $m = Get-Content (Join-Path $root "manifest.json") -Raw -Encoding UTF8 | ConvertFrom-Json
  foreach ($i in $m.icons) { if (-not (Test-Path (Join-Path $root $i.src))) { Fail "manifest icon missing: $($i.src)" } }
  if ($m.start_url -ne "./" -or $m.scope -ne "./") { Fail "manifest start_url/scope must be ./" }
  if ($m.display -ne "standalone") { Fail "manifest display must be standalone" }
} catch { Fail "manifest.json is not valid JSON: $_" }
Add-Type -AssemblyName System.Drawing
foreach ($i in $m.icons) { $p = Join-Path $root $i.src; if (Test-Path $p) { $img = [System.Drawing.Image]::FromFile($p); $want = ($i.sizes -split 'x')[0]; if ($img.Width -ne [int]$want -or $img.Height -ne [int]$want) { Fail "icon $($i.src) is $($img.Width)x$($img.Height), manifest says $($i.sizes)" }; $img.Dispose() } }
if ($index -notmatch 'noindex') { Fail "index.html lost its noindex meta tag" }
if ($index -notmatch 'lang="he" dir="rtl"') { Fail "index.html must be lang=he dir=rtl" }
# privacy: no personal data in the repo files that ship
$mine = git -C $root config user.email
foreach ($f in (git -C $root ls-files)) { if ($f -match '\.(js|html|css|json|md|ps1)$') { $t = Get-Content (Join-Path $root $f) -Raw -Encoding UTF8; if ($mine -and $t.Contains($mine)) { Fail "owner email found in $f" } } }

Write-Host "== browser tests =="
$chrome = @("C:\Program Files\Google\Chrome\Application\chrome.exe", "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $chrome) { Fail "Chrome not found"; exit 1 }
$page = "file:///" + ((Join-Path $root "tests\test.html") -replace '\\', '/')
$outFile = Join-Path $env:TEMP "frooky-test-dump.html"
if (Test-Path $outFile) { Remove-Item $outFile -Force }
$argList = @("--headless", "--disable-gpu", "--allow-file-access-from-files", "--virtual-time-budget=240000", "--window-size=1000,900", "--dump-dom", ('"' + $page + '"'))
Start-Process -FilePath $chrome -ArgumentList $argList -RedirectStandardOutput $outFile -RedirectStandardError ($outFile + ".err") -NoNewWindow -Wait
$txt = [System.IO.File]::ReadAllText($outFile, [System.Text.Encoding]::UTF8)
$m2 = [regex]::Match($txt, '<pre id="out"[^>]*>(.*?)</pre>', 'Singleline')
if (-not $m2.Success -or $m2.Groups[1].Value.Trim() -eq "") { Fail "the test page produced no result (it crashed or timed out)"; $fail | ForEach-Object { }; exit 1 }
$json = [System.Net.WebUtility]::HtmlDecode($m2.Groups[1].Value) | ConvertFrom-Json
Write-Host ("  passed: {0}   failed: {1}" -f $json.passed, $json.failed)
foreach ($n in $json.passedNames) { Write-Host "  ok   $n" -ForegroundColor DarkGreen }
foreach ($f in $json.fails) { Fail $f }
foreach ($w in $json.warns) { Write-Host "  warn $w" -ForegroundColor Yellow }
if ($fail.Count) { Write-Host ("`n{0} problem(s)" -f $fail.Count) -ForegroundColor Red; exit 1 } else { Write-Host "`nALL GOOD" -ForegroundColor Green }
