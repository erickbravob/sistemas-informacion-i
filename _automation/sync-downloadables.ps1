param([switch]$Once)
$ErrorActionPreference = 'Stop'
$siteRepo = Split-Path -Parent $PSScriptRoot
$courseRoot = Split-Path -Parent $siteRepo
$logPath = Join-Path $courseRoot '.auto-publicar-actividad-1\publicacion.log'
$documents = @(
  [pscustomobject]@{ Source = (Join-Path $courseRoot 'Docs\TEORIA GENERAL DE SISTEMAS.pptx'); RelativePath = 'materiales/teoria-general-sistemas-2026-10-02.pptx' },
  [pscustomobject]@{ Source = (Join-Path $courseRoot 'Docs\Actividad 1\Informe\Informe_Actividad1_SistemasInformacionI.docx'); RelativePath = 'materiales/actividad-1/informe-actividad-1.docx' },
  [pscustomobject]@{ Source = (Join-Path $courseRoot 'Docs\Actividad 1\Diapositivas\Publicadas\tema-01-uml-requisitos-v26.pptx'); RelativePath = 'materiales/actividad-1/tema-01-uml-requisitos-v26.pptx' },
  [pscustomobject]@{ Source = (Join-Path $courseRoot 'Docs\Actividad 1\Diapositivas\Publicadas\tema-02-actores-casos-v10.pptx'); RelativePath = 'materiales/actividad-1/tema-02-actores-casos-v10.pptx' },
  [pscustomobject]@{ Source = (Join-Path $courseRoot 'Docs\Actividad 1\Diapositivas\Publicadas\tema-03-objetos-estados-v5.pptx'); RelativePath = 'materiales/actividad-1/tema-03-objetos-estados-v5.pptx' },
  [pscustomobject]@{ Source = (Join-Path $courseRoot 'Docs\Actividad 1\Diapositivas\Publicadas\tema-04-modelo-datos-v5.pptx'); RelativePath = 'materiales/actividad-1/tema-04-modelo-datos-v5.pptx' }
)
$allowedPaths = [string[]]($documents | ForEach-Object { $_.RelativePath })
$script:publishFailed = $false
function Write-Log {
  param([string]$Message)
  Add-Content -LiteralPath $logPath -Value ("{0} {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $Message) -Encoding UTF8
}
function Invoke-Git {
  param([string[]]$Arguments)
  $savedPreference = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  try {
    $output = & git -C $siteRepo @Arguments 2>&1
    $exitCode = $LASTEXITCODE
  } finally {
    $ErrorActionPreference = $savedPreference
  }
  foreach ($line in $output) { Write-Log ("git: " + $line) }
  if ($exitCode -ne 0) { throw ("git {0} returned {1}: {2}" -f ($Arguments -join ' '), $exitCode, ($output -join ' ')) }
  return $output
}
function Get-Hash {
  param([string]$Path)
  return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash
}
function Invoke-Publish {
  try {
    $branch = [string]::Join('', @(Invoke-Git -Arguments @('branch', '--show-current'))).Trim()
    if ($branch -ne 'main') { throw 'The automatic copy is not on main; publication stopped.' }
    $dirty = @(Invoke-Git -Arguments @('status', '--porcelain'))
    if ($dirty.Count -gt 0) { throw 'The automatic copy has unrelated local changes; publication stopped without overwriting them.' }

    Invoke-Git -Arguments @('pull', '--rebase', '--autostash', 'origin', 'main') | Out-Null
    foreach ($document in $documents) {
      if (-not (Test-Path -LiteralPath $document.Source -PathType Leaf)) { throw ('Source file missing: ' + $document.Source) }
      $sourceHash = Get-Hash -Path $document.Source
      $destination = Join-Path $siteRepo ($document.RelativePath -replace '/', '\')
      if (-not (Test-Path -LiteralPath $destination) -or (Get-Hash -Path $destination) -ne $sourceHash) {
        Start-Sleep -Seconds 2
        $stableHash = Get-Hash -Path $document.Source
        if ($stableHash -ne $sourceHash) { throw ('File is still being saved; will retry: ' + $document.Source) }
        Copy-Item -LiteralPath $document.Source -Destination $destination -Force
        Write-Log ('Updated: ' + $document.RelativePath)
      }
    }

    $changes = @(Invoke-Git -Arguments (@('diff', '--name-only', '--') + $allowedPaths))
    if ($changes.Count -eq 0) {
      Write-Log 'No downloadable-file changes.'
      return
    }
    Invoke-Git -Arguments (@('add', '--') + $allowedPaths) | Out-Null
    Invoke-Git -Arguments (@('commit', '--only', '-m', 'Actualiza documentos descargables del curso', '--') + $allowedPaths) | Out-Null
    Invoke-Git -Arguments @('push', 'origin', 'main') | Out-Null
    Write-Log 'GitHub publication completed.'
  } catch {
    $script:publishFailed = $true
    Write-Log ('ERROR: ' + $_.Exception.Message)
  }
}

$watchers = @()
if (-not $Once) {
  $directories = @(
    (Join-Path $courseRoot 'Docs'),
    (Join-Path $courseRoot 'Docs\Actividad 1\Informe'),
    (Join-Path $courseRoot 'Docs\Actividad 1\Diapositivas\Publicadas')
  )
  $number = 0
  foreach ($directory in $directories) {
    $watcher = [System.IO.FileSystemWatcher]::new($directory, '*')
    $watcher.IncludeSubdirectories = $false
    $watcher.NotifyFilter = [System.IO.NotifyFilters]::FileName -bor [System.IO.NotifyFilters]::LastWrite -bor [System.IO.NotifyFilters]::Size
    foreach ($eventName in @('Created', 'Changed', 'Renamed')) {
      Register-ObjectEvent -InputObject $watcher -EventName $eventName -SourceIdentifier ("SIS1AutoPublish{0}{1}" -f $number, $eventName) | Out-Null
    }
    $watcher.EnableRaisingEvents = $true
    $watchers += $watcher
    $number++
  }
}
Invoke-Publish
if ($Once) {
  if ($script:publishFailed) { exit 1 }
  exit 0
}
Write-Log 'Watching all six site-hosted downloadable files.'
while ($true) {
  $event = Wait-Event -Timeout 300
  if ($null -ne $event) {
    Start-Sleep -Seconds 3
    foreach ($pending in @(Get-Event)) { Remove-Event -EventIdentifier $pending.EventIdentifier -ErrorAction SilentlyContinue }
    Invoke-Publish
  } else {
    Invoke-Publish
  }
}
