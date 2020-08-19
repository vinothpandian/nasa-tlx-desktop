# Nasa TLX Desktop version

## Installation

Download the executable from the links below

* [Windows version][windows]
* [Mac version][mac]
* [Debian version - Ubuntu][debian]

---

## OS requirements

### Windows

Windows 7 and later are supported, older operating systems are not supported (and do not work).
Both x86 and amd64 (x64) binaries are provided for Windows. Please note, the ARM version of Windows is not supported for now.

### Mac

Only 64bit binaries are provided for OS X, and the minimum OS X version supported is OS X 10.9.

### Linux

The prebuilt ia32(i686) and x64(amd64) binaries of Electron are built on Ubuntu 12.04, the arm binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.
Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 and later
* Fedora 21
* Debian 8

---

## Hardware requirements

About RAM and CPU, there are no information about that in Electron's docs, but Electron is based on Chromium, so it should need nearly the same requirements:

### Windows

An Intel Pentium 4 processor or later that's SSE2 capable
512 MB of RAM

### Mac

An Intel processor that's 64-bit 512 MB of RAM

### Linux

An Intel Pentium 4 processor or later that's SSE2 capable

---

## To contribute in development

To contribute to the project, read the electron-react-boilerplate guidelines from [here][contribution]

Clone the project using the following command

```
git clone --depth=1 https://github.com/vinothpandian/nasa-tlx-desktop.git
```

---

## Based on

* [Nasa TLX][nasa-tlx]
* [Electron React boilerplate][electron-react-boilerplate]

[mac]: https://github.com/vinothpandian/nasa-tlx-desktop/raw/releases/NasaTLX-1.0.0.dmg
[debian]: https://github.com/vinothpandian/nasa-tlx-desktop/raw/releases/nasa-tlx-desktop_1.0.0_amd64.deb
[windows]: https://github.com/vinothpandian/nasa-tlx-desktop/releases/download/1.0.0/NasaTLX.Setup.1.0.0.exe
[nasa-tlx]: https://humansystems.arc.nasa.gov/groups/tlx/
[electron-react-boilerplate]: https://github.com/chentsulin/electron-react-boilerplate
[contribution]: https://github.com/chentsulin/electron-react-boilerplate/blob/master/README.md
