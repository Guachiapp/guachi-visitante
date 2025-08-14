@echo off
setlocal

REM Definir rutas
set "DESTINO=C:\Codes\NodeJs\dev-server\public\guachi_e"
set "ORIGEN=C:\Codes\VanillaJs\guachi_e\dist"

REM Verificar que la carpeta de origen existe
if not exist "%ORIGEN%" (
    echo La carpeta de origen no existe: %ORIGEN%
    exit /b 1
)

REM Verificar si la carpeta de destino existe; si no, crearla|
if not exist "%DESTINO%" (
    echo La carpeta de destino no existe. Creando: %DESTINO%
    mkdir "%DESTINO%"
    if errorlevel 1 (
        echo Error al crear la carpeta de destino: %DESTINO%
        exit /b 1
    )
)

REM Eliminar contenido del destino (sin borrar la carpeta)
echo Eliminando contenido de %DESTINO%...
del /q "%DESTINO%\*" >nul 2>&1
for /d %%D in ("%DESTINO%\*") do rd /s /q "%%D"

REM Copiar contenido desde origen a destino
echo Copiando contenido desde %ORIGEN% a %DESTINO%...
xcopy "%ORIGEN%\*" "%DESTINO%\" /s /e /y /i

echo Operación completada.
endlocal
