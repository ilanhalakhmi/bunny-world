# Tiny local web server for testing the service worker / offline mode:  powershell -ExecutionPolicy Bypass -File tests\serve.ps1 [-Port 8123]
# (localhost counts as a secure context, so the service worker works here exactly like on GitHub Pages.)
param([int]$Port = 8123)
$root = Split-Path -Parent $PSScriptRoot
$mime = @{ ".html" = "text/html; charset=utf-8"; ".js" = "text/javascript; charset=utf-8"; ".css" = "text/css; charset=utf-8"; ".json" = "application/json; charset=utf-8"; ".svg" = "image/svg+xml"; ".png" = "image/png" }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$Port/"); $l.Start()
Write-Host "serving $root on http://localhost:$Port/  (Ctrl+C to stop)"
while ($l.IsListening) {
  $c = $l.GetContext(); Write-Host ("{0} {1}" -f $c.Request.HttpMethod, $c.Request.Url.AbsolutePath); $path =[Uri]::UnescapeDataString($c.Request.Url.AbsolutePath.TrimStart("/")); if ($path -eq "") { $path = "index.html" }
  $file = Join-Path $root ($path -replace "/", "\")
  if ((Test-Path $file -PathType Leaf) -and ($file.StartsWith($root))) {
    $bytes = [System.IO.File]::ReadAllBytes($file); $ext = [System.IO.Path]::GetExtension($file).ToLower()
    $c.Response.ContentType = $(if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" })
    $c.Response.Headers.Add("Cache-Control", "max-age=600")   # like GitHub Pages
    $c.Response.ContentLength64 = $bytes.Length; $c.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else { $c.Response.StatusCode = 404 }
  $c.Response.Close()
}
