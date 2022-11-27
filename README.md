# IVPN Web

* [About this Repo](#about-repo)
* [Contributing](#contributing)
* [Security Policy](#security)
* [License](#license)
* [Authors](#authors)
* [Installation Guide](#installation)

<a name="about-repo"></a>
## About this Repo

This is the official Git repo of the [IVPN Website](https://www.ivpn.net).

<a name="contributing"></a>
## Contributing

If you are interested in contributing to IVPN Web project, please read our [Contributing Guidelines](/.github/CONTRIBUTING.md).

<a name="security"></a>
## Security Policy

If you want to report a security problem, please read our [Security Policy](/.github/SECURITY.md).

<a name="license"></a>
## License

This project is licensed under the GPLv3 - see the [License](/LICENSE.md) file for details.

<a name="authors"></a>
## Authors

See the [Authors](/AUTHORS) file for the list of contributors who participated in this project.

<a name="installation"></a>
## Installation Guide

> This is an installation summary for running IVPN's static website locally.

**Windows:**

1. Install [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install)
2. Upgrade [WSL to WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)
3. Change the Default Version of WSL to WSL 2

    ```
    wsl --set-default-version 2
    ```
    
4. Install [Docker](https://www.docker.com/) (Documentation: [https://docs.docker.com/](https://docs.docker.com/))
5. Clone or Download the IVPN repository
6. Open Powershell and cd to the previously downloaded repository and run the following commands:
    ```
    docker build -t website:latest --build-arg ENV=staging .
    
    docker run -it --publish 8010:80 website  
    ```
7. Open the website at [http://localhost:8010/](http://localhost:8010/)

**M1 Mac:**

1. Install Docker as well as its prerequisites for your system.
2. Clone or Download the IVPN repository.
3. Open Terminal and cd to the previously download repository and run the following commands:

   
    ```
    docker buildx build --platform linux/amd64 -t website:latest --build-arg ENV=staging .
  
    docker run -it --publish 8010:80 website  
    ```
    
4. Open the website at [http://localhost:8010/](http://localhost:8010/)
