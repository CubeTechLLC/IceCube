#IceCube - It is an OS which allows privacy, usability (as in easy to use), and being open source.
#Copyright (C) 2013-2014  Brandon Andrew Gomez (bgbrandongomez)

#This file is part of IceCube.

#This program is free software: you can redistribute it and/or modify
#it under the terms of the GNU General Public License as published by
#the Free Software Foundation, either version 3 of the License, or
#(at your option) any later version.

#This program is distributed in the hope that it will be useful,
#but WITHOUT ANY WARRANTY; without even the implied warranty of
#MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#GNU General Public License for more details.

#You should have received a copy of the GNU General Public License
#along with this program.  If not, see <http://www.gnu.org/licenses/>.

#---------------------------------------------------------------------

#dd if=boot.bin of=./VM/IceCube.img #This method is flawed if the copied has an original and it was overwritten, for it would not overwrite completely.

all: make floppy hdd usb sdcard cd android

make:
	test -d mbr || mkdir mbr
	nasm os.asm -f bin -o os.img
	
floppy:	license
	nasm floppy.asm -f bin -o mbr/floppy_mbr.img
	cp mbr/floppy_mbr.img floppy.img
	test -s floppy.img && dd if=os.img of=floppy.img bs=$(stat -c%s floppy.img) seek=1 || dd if=os.img of=floppy.img bs=1 seek=1

hdd: license
	nasm hdd.asm -f bin -o mbr/hdd_mbr.img
	cp mbr/hdd_mbr.img hdd.img
	test -s hdd.img && dd if=os.img of=hdd.img bs=$(stat -c%s hdd.img) seek=1 || dd if=os.img of=hdd.img bs=1 seek=1
	
usb: license
	nasm usb.asm -f bin -o mbr/usb_mbr.img
	cp mbr/usb_mbr.img usb.img
	test -s usb.img && dd if=os.img of=usb.img bs=$(stat -c%s usb.img) seek=1 || dd if=os.img of=usb.img bs=1 seek=1

sdcard:	license
	nasm sd.asm -f bin -o mbr/sd_mbr.img
	cp mbr/sd_mbr.img sd.img
	test -s sd.img && dd if=os.img of=sd.img bs=$(stat -c%s sd.img) seek=1 || dd if=os.img of=sd.img bs=1 seek=1

cd:	license

android: license
	
run: license
  ifeq ($(OS), Windows_NT)
	.\VM\Start_Machine.bat
  else
	./VM/Start_Machine
  endif

clean: license
	find | grep .img | xargs rm -f *.img
	rm -R -f ./VM/Logs

install: license
	cp floppy.img ./VM/IceCube.img

uninstall: license
	rm -f ./VM/IceCube.img

everything: all install run

everything_but_run: all install

remove_everything: uninstall clean

license:
  ifneq ($displayed, yes)
	@echo "IceCube  Copyright (C) 2013-2014  Brandon Andrew Gomez (bgbrandongomez)"
	@echo "This program comes with ABSOLUTELY NO WARRANTY; for details type 'make show_w'."
	@echo "This is free software, and you are welcome to redistribute it"
	@echo "under certain conditions; type 'make show_c' for details."
	@echo ""
	@display="yes"
  endif
  
show_w: license
	@echo No warranty!

show_c: license
	@echo Conditions not expressed here!