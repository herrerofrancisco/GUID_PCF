# GUID PCF Control
PCF de tipo field para Dynamics 365 Model Driven.

Este PCF sirve para copiar el Guid de un registro en el portapapeles.

----------------------------------------------------------------------

Comandos:
Dentro de la carpeta de la solucion:
Pac solution init --publisher-name <example> --publisher-prefix <example> 
Pac solution add-reference --path <PATH de la carpeta>

Compilar:
First time: 
msbuild /t:build /restore

Next time onwards: 
msbuild
