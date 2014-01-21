IceCube - It is an OS which allows privacy, usability (as in easy to use), and being open source.
Copyright (C) 2013-2014  Brandon Andrew Gomez (bgbrandongomez)

This file is part of IceCube.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

---------------------------------------------------------------------

For those on Windows, open the ReadMe in Notepad++ instead of the regular Notepad.
----------------------------------------------------------------------------------
My project can be called Ice Cube or IceCube, as I first called it Ice Cube, but now I prefer to call it IceCube.

To manually compile and run the Ice Cube type:
nasm boot.asm -f bin -o boot.bin
dd if=boot.bin of=./VM/IceCube.img
./VM/Start_Machine

For those without dd, just run "cp boot.bin ./VM/IceCube.img" (without the quotes) to achieve the same effect.

For those with Windows, replace cp with xcopy such as "xcopy boot.bin .\VM\IceCube.img"
	and replace nasm with nasmw such as "nasmw boot.asm -f bin -o boot.bin".

Opening the MakeFile and looking where there is a name with a semicolon, such as "everything:" (without the quotes) gives you all the options available for the MakeFile.

Comments:
--------
	I have noticed that the bios_print function I have worked on is also at http://wiki.osdev.org/Babystep2 under the procedure tab as I pretty much almost made the same exact code and have not realized that this code even existed then.
There are major differences though. One difference is the lodsb placement. Another is the extra "or al, al" line that ensures a proper finish of the line of text. That is the first irony of this project.