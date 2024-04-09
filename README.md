A instalação manual do OpenCV apresenta menos erros. Para fazer a instalação manual no Ubuntu 22.04 execute o seguinte comando

```
apt-get install libopencv
```

É necessário instlar o "cmake" e "python"

```
apt install cmake python3.9
```

Adicione as seguintes variaveis de ambiente no .bashrc ou .zshrc

```
export OPENCV_BUILD_ROOT=~/opencv
export OPENCV4NODEJS_AUTOBUILD_OPENCV_VERSION=4.6.0
```
