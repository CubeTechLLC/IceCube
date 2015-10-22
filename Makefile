#dd if=boot.bin of=./VM/IceCube.img #This method is flawed if the copied has an original and it was overwritten, for it would not overwrite completely.

all: make floppy hdd usb sdcard cd android

make: license initialize_directories
	nasm source/os.asm -f bin -o bin/tmp/os.img
	
floppy:	license
	nasm source/floppy.asm -f bin -o bin/mbr/floppy_mbr.img
	cp bin/mbr/floppy_mbr.img bin/release/floppy.img
	test -s bin/release/floppy.img && dd if=bin/tmp/os.img of=bin/release/floppy.img bs=$(stat -c%s bin/release/floppy.img) seek=1 || dd if=bin/tmp/os.img of=bin/release/floppy.img bs=1 seek=1

hdd: license
	nasm source/hdd.asm -f bin -o bin/mbr/hdd_mbr.img
	cp bin/mbr/hdd_mbr.img bin/release/hdd.img
	test -s bin/release/hdd.img && dd if=bin/tmp/os.img of=bin/release/hdd.img bs=$(stat -c%s bin/release/hdd.img) seek=1 || dd if=bin/tmp/os.img of=bin/release/hdd.img bs=1 seek=1
	
usb: license
	nasm source/usb.asm -f bin -o bin/mbr/usb_mbr.img
	cp bin/mbr/usb_mbr.img bin/release/usb.img
	test -s bin/release/usb.img && dd if=bin/tmp/os.img of=bin/release/usb.img bs=$(stat -c%s bin/release/usb.img) seek=1 || dd if=bin/tmp/os.img of=bin/release/usb.img bs=1 seek=1

sdcard:	license
	nasm source/sd.asm -f bin -o bin/mbr/sd_mbr.img
	cp bin/mbr/sd_mbr.img bin/release/sd.img
	test -s bin/release/sd.img && dd if=bin/tmp/os.img of=bin/release/sd.img bs=$(stat -c%s bin/release/sd.img) seek=1 || dd if=bin/tmp/os.img of=bin/release/sd.img bs=1 seek=1

cd:	license

android: license

initialize_directories:
	test -d bin || mkdir bin
	test -d bin/mbr || mkdir bin/mbr
	test -d bin/release || mkdir bin/release
	test -d bin/testing || mkdir bin/testing
	test -d bin/testing/VM || mkdir bin/testing/VM
	test -d bin/tmp || mkdir bin/tmp

run: license
  ifeq ($(OS), Windows_NT)
	.\bin\testing\VM\Start_Machine.bat
  else
	./bin/testing/VM/Start_Machine
  endif

clean: license
	find | grep .img | xargs rm -f *.img
	rm -R -f ./bin/testing/VM/Logs

install: license
	cp bin/release/floppy.img ./bin/testing/VM/IceCube.img

uninstall: license
	rm -f ./bin/testing/VM/IceCube.img

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