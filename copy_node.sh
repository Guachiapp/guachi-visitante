echo "Eliminando archivos en /home/rednaxe7/Codes/Node/node-server-dev/public/*"
sudo rm -rf /home/rednaxe7/Codes/Node/node-server-dev/public/*
echo "Archivos eliminados."
echo ""
echo "Copiar archivos en /home/rednaxe7/Codes/Node/node-server-dev/public/"
sudo cp -r dist/* /home/rednaxe7/Codes/Node/node-server-dev/public/
echo "Archivos copiados"