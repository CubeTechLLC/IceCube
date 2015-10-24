#dd if=boot.bin of=./VM/IceCube.img #This method is flawed if the copied has an original and it was overwritten, for it would not overwrite completely.

all: make floppy hdd usb sdcard cd android

make: license initialize_directories
	nasm source/os.asm -f bin -o out/bin/build/os.img
	
floppy:	license
	nasm source/floppy.asm -f bin -o out/bin/build/mbr/floppy_mbr.img
	cp out/bin/build/mbr/floppy_mbr.img out/bin/release/floppy.img
	test -s out/bin/release/floppy.img && dd if=out/bin/build/os.img of=out/bin/release/floppy.img bs=$(stat -c%s out/bin/release/floppy.img) || dd if=out/bin/build/os.img of=out/bin/release/floppy.img bs=1

hdd: license
	nasm source/hdd.asm -f bin -o out/bin/build/mbr/hdd_mbr.img
	cp out/bin/build/mbr/hdd_mbr.img out/bin/release/hdd.img
	test -s out/bin/release/hdd.img && dd if=out/bin/build/os.img of=out/bin/release/hdd.img bs=$(stat -c%s out/bin/release/hdd.img) || dd if=out/bin/build/os.img of=out/bin/release/hdd.img bs=1
	
usb: license
	nasm source/usb.asm -f bin -o out/bin/build/mbr/usb_mbr.img
	cp out/bin/build/mbr/usb_mbr.img out/bin/release/usb.img
	test -s out/bin/release/usb.img && dd if=out/bin/build/os.img of=out/bin/release/usb.img bs=$(stat -c%s out/bin/release/usb.img) || dd if=out/bin/build/os.img of=out/bin/release/usb.img bs=1

sdcard:	license
	nasm source/sd.asm -f bin -o out/bin/build/mbr/sd_mbr.img
	cp out/bin/build/mbr/sd_mbr.img out/bin/release/sd.img
	test -s out/bin/release/sd.img && dd if=out/bin/build/os.img of=out/bin/release/sd.img bs=$(stat -c%s out/bin/release/sd.img) || dd if=out/bin/build/os.img of=out/bin/release/sd.img bs=1

cd:	license

android: license

initialize_directories:
	test -d out || mkdir out	#Output directory for binaries
	test -d out/bin || mkdir out/bin	#
	test -d out/bin/build || mkdir out/bin/build	#Non final binaries
	test -d out/bin/build/mbr || mkdir out/bin/build/mbr	#OS MBR binaries
	test -d out/bin/export || mkdir out/bin/export	#Archives for github. Designated for ic builds to export packages for releases.
	test -d out/bin/release || mkdir out/bin/release	#Final binaries
	test -d test || mkdir test
	test -d test/VM || mkdir test/VM

run: license
  ifeq ($(OS), Windows_NT)
	.\test\VM\Start_Machine.bat
  else
	./test/VM/Start_Machine
  endif

clean: license
	find | grep .img | xargs rm -f *.img
	rm -R -f ./test/VM/Logs

install: license
	cp out/bin/release/floppy.img ./test/VM/IceCube.img

uninstall: license
	rm -f ./test/VM/IceCube.img

everything: all install run

everything_but_run: all install

remove_everything: uninstall clean

license:
  ifneq ($displayed, yes)
	@echo "IceCube  Copyright (C) 2013-2016  Brandon Andrew Gomez (bgbrandongomez or senorcontento)"
	@echo "This program comes with ABSOLUTELY NO WARRANTY; for details type 'make show_w'."
	@echo "Specific, but relaxed copyright rules in License.txt"
	@display="yes"
  endif
  
show_w: license
	@echo No warranty!

show_c: license
	@echo Conditions not expressed here! Check License.txt