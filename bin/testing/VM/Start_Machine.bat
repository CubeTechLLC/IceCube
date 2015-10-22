vboxmanage registervm "%CD%\bin\testing\VM\IceCube.vbox"
virtualbox --startvm "Ice Cube"
vboxmanage unregistervm "%CD%\bin\testing\VM\IceCube.vbox"
vboxmanage closemedium floppy "%CD%\bin\testing\VM\IceCube.img"