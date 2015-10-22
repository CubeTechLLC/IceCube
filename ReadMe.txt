IceCube is copyrighted with All Rights Reserved with very loose rules described under License.txt.

---------------------------------------------------------------------
CubeTech is a LLC (Limited Liability Corporation) business. For those that do not know what that means, it means 
the business can only be sued for business property and not the owner's property. More about business types can 
be found at <http://taxes.about.com/od/taxplanning/a/incorporating_2.htm>.

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