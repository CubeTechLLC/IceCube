;IceCube - It is an OS which allows privacy, usability (as in easy to use), and being open source.
;Copyright (C) 2013-2014  Brandon Andrew Gomez (bgbrandongomez)

;This file is part of IceCube.

;This program is free software: you can redistribute it and/or modify
;it under the terms of the GNU General Public License as published by
;the Free Software Foundation, either version 3 of the License, or
;(at your option) any later version.

;This program is distributed in the hope that it will be useful,
;but WITHOUT ANY WARRANTY; without even the implied warranty of
;MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;GNU General Public License for more details.

;You should have received a copy of the GNU General Public License
;along with this program.  If not, see <http://www.gnu.org/licenses/>.

;--------------------------------------------------------------------------------------------------------------------------------------

;1234567890-10-1234567890-10-1234567890-10-1234567890-10-1234567890-10-1234567890-10-1234567890-10-1234567890-10-1234567890-10-12345678
;The above is a line tester. There should be nine full lines and a tenth line that ends at eight. If it is not that way, then you 
;won't see the code the way I see it. I used the Geany editor which has color so this file is more legible.
;--------------------------------------------------------------------------------------------------------------------------------------

;http://en.wikibooks.org/wiki/X86_Assembly/X86_Architecture - Register Architecture (AH means A High and AL means A Low)
;http://en.wikipedia.org/wiki/X86_assembly_language#Registers - Register Uses
;http://en.wikipedia.org/wiki/BIOS_interrupt_call - Bios Uses with Register
;http://faydoc.tripod.com/cpu/lodsb.htm - Pages on Assembly commands such as lodsb
;http://www.techonthenet.com/ascii/chart.php - Ascii Table for use with db
;http://en.wikipedia.org/wiki/INT_10H - Instructions on interrupt 0x10
;http://stackoverflow.com/questions/10168743/x86-assembly-which-variable-size-to-use-db-dw-dd - DB,DW,DD
;http://en.wikipedia.org/wiki/BIOS_Color_Attributes - Bios color hex codes for print_color function
;http://www.win.tue.nl/~aeb/comp/8051/set8051.html - Opcode Chart
;https://sites.google.com/site/ibmmainframeassembly/system/app/pages/subPages?path=/Home/mnemonics - More Assembly Instructions
;http://wiki.osdev.org/Boot_Sequence - MBR
;http://wiki.osdev.org/Babystep2 - Explanation of mov ax, 0x07c0
;http://www.ctyme.com/intr/rb-0069.htm - Set Video Mode
;http://wiki.osdev.org/Text_Mode_Cursor - How to move the cursor.
;-These links to the pages are redundant, but it helps with teaching assembly for a person might not understand the page or it's down.-

;In attempts to make common sets of instructions into functions and fixing the glitches in the color printing function, I have lost 
;a lot of efficiency (if you consider a couple of extra assembly commands not efficient (especially if the function use compounds)), 
;but the goal is to keep it as efficient as possible, while preventing security holes as much as possible.

;A function that compounds is like a credit card, as the unpaid dues compound with interest, the multiple uses of the functions, 
;multiplies the use of the extra assembly commands (or codes if you prefer to say it that way).

;It is not necessary to put jmp hang after a return instruction in case someone jumps to the function as it causes the code to return to hang
;anyway if their was no call of any sort before and the jmp hang will not protect you from a forced return either.

;A forced return is if you block return statements from compilation in a mini script but fail to block jmp of any form and the hacker 
;jumps to a system call.

;A mini script is the compilation of any snippet of code to do low level work. The best way to protect against it is by letting the 
;user analyze the code and have them compile it (it is actually better to force the user to compile on device so developers have a 
;tough time taking advantage of them and writing viruses).

;It is different from an app which uses the api to do a simple task and different from a program which uses its own instructions, 
;and can do a lot more.

;boot.asm in x86 assembly
   mov ax, 0x07c0 ;Save address 0x07c0 to ax since ds can not directly be written to by a hex code.
   mov ds, ax     ;Move ax which has the hex code to dx so the bios knows to skip the partition table and load the os.
   ;mov bl, 0xF    ;Set default color to white for function bios_print_color if no other color is sure to be present.
   mov ah, 0x0 ;Attempt to set width to 80, height to 25, and to color mode for text interfaces from Tandy 2000 on the table.
   mov al, 0x8 ;Set video mode hex code.
   int 0x10    ;Call interrupt 0x10 for the bios print text.

   mov bl, 0xB ;Set colored text to cyan.
   ;mov si, msg ;Store variable msg to si to write to screen.
   ;call bios_print_color ;Call color printing function.
   ;jmp loop ;Jump to loop in case of any code between this and loop (Remove this for one assembly line increase in efficiency).

   loop: ;This is the main execution area of the os.
   mov si, msg ;Store variable msg to si to write to screen again.
   call bios_print_color ;Print the message in color.
   call bios_print_space_color ;Print a color space so the person to type here later can type in color.
   ;mov ah, 0x0 ;Tell bios to read character from keyboard.
   ;int 0x16 ;Send the interrupt to tell bios. The character is stored in al.
   ;mov ah, 0x0E ;Tell bios to print character from al.
   ;int 0x10 ;Send interrupt to tell bios.
   jmp loop ;Restart loop to keep os in order.

bios_print_newline: ;I did not use \n or \r as this is not being stored in file, it is more efficient, and it is not a security concern.
   mov dl, 0 ;Reset cursor to the beginning of the row.
   add dh, 1 ;Increase cursor row by one. The calling code is responsible for checking the screen size (so this is more efficient).
   mov ah, 0x02 ;Set to cursor mode.
   int 0x10  ;Call interrupt 0x10 for the bios screen handling.
   ret ;Return back to caller function.

bios_print_space: ;The reason their are no jumps to combine these functions is because jumps take up the processor time.
   mov al, " "    ;This is the character used for printing a space using the gray text printing function.
   mov ah, 0x0E   ;This is the gray print command.
   int 0x10       ;This is the print interrupt to write to the screen.
   ret            ;Return to the previous call address in execution.

bios_print_space_color: ;The color space allows keyboard characters to already have a color when written into in the future.
   cmp dl, 80           ;See if cursor is at the end of the screen. Width=80
   je bios_print_space_color_linejump ;Only jump works with conditions, not a call or a ret (otherwise this would be a call statement).
   mov al, " "          ;Make the character a space.
   mov ah, 0x09         ;Make the character a color character.
   int 0x10             ;Print the space to the screen.
   add dl, 1            ;Add one to the cursor position.
   mov ah, 0x02         ;Set mode to cursor position.
   int 0x10             ;Call 0x10 interrupt so the bios can change cursor position.
   ret                  ;Return to previous call address and continue execution.

bios_print_space_color_linejump: ;Jump label for bios_print_space_color so a new line can be printed if the cursor is at the end of 
                                 ;the screen.
   call bios_print_newline    ;Call new line printing function.
   jmp bios_print_space_color ;Return to bios_print_space_color to print a space.

bios_print:lodsb ;lodsb means to load a string a byte at a time (from an address).
   or al, al ;Definitely not the most efficient method but this allows the code to terminate before a extra space can be written.
   ;This basically checks for null termination, for if their wasn't a null termination on the string, it will keep reading.
   jz bios_print_return ;Jump to return statement before writing a space. Return statements do not allow conditions so a jump is used.
   mov ah, 0x0E ;Move 0x0E (14) to register ah which the bios checks on int 0x10 (16) and it means to write character to screen.
   int 0x10  ;Call bios interrupt 10 to print text to string. Refer to article "Bios Uses with Register" to learn about bios 
   ;interrupts.
   or al, al ;Compares register al to itself. Confused (read below)? This is used instead of cmp al, 0 is because it is 1 byte shorter.
   jnz bios_print ;Jump back to print another character. Jump codes check above code for value if it is supposed to check.

bios_print_return: ;Return marker for regular printing, hence the naming scheme.
   ret ;Return to calling address. Requires that address use call function and not jump.

bios_print_color:lodsb ;Refer to bios_print for lodsb definition. Specify hex value to register bl to change color.
   or al, al ;Continued from bios_print's comment. This prevents hacking (possibly no worrying) and errors from a one byte overflow.
   jz bios_print_color_return ;Jump to return statement before writing a space. Same as the regular print function.
   
   cmp dl, 80 ;Check to see if the cursor is at the end of the screen. This only works if the video mode is set as: Width=80, Height=25
   je bios_print_color_linejump ;Jump to print a new line if at end of screen. The video mode should only be as above.
   ;You are responsible for changing all the code properly such as the code two lines above when setting the video mode.

bios_print_color_linejump_return: ;Put return function here to save 2 compounded lines of assembly code and to prevent losing a 
                                  ;character due to loading twice until next print.
   mov ah, 0x09 ;Move 0x09 (9) function code to register ah which the bios checks on int 0x10 (16). 
   int 0x10  ;Call bios interrupt 10 to print text to string. Refer to article "Bios Uses with Register" to learn about bios 
   ;interrupts.
   add dl, 1 ;Increase dl register by one which will increase cursor position. Function code 0x09 does not automatically move cursor.
   mov ah, 0x02 ;Move 0x02 (2) to register ah so the cursor position can be increased by one.
   int 0x10  ;Call interrupt 0x10 for the bios to pick up. This is for actually changing the cursor position.
   or al, al ;Compares register al to itself. Confused (read below)? This is used instead of cmp al, 0 is because it is 1 byte shorter.
   jnz bios_print_color ;Jump back to print another character. Jump codes check above code for value if it is supposed to check.

bios_print_color_return: ;Return marker for printing in color, hence the naming scheme.
   ret      ;Return to calling function of bios_print_color (The function that calls bios_print_color).

bios_print_color_linejump: ;Since you can't call or return from a function conditionally, you jump to a mini function.
   call bios_print_newline ;Then you call the newline function so you can type less code (even though it is less efficient).
   jmp bios_print_color_linejump_return ;Last you jump past the label that loads a new character from a string then print the last 
   ;loaded character on the new line since on the color function doesn't automatically do this.

hang: ;hang is just an infinite loop that does nothing in between.
   jmp hang ;Jump back to hang.

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;            Stick all variables below here. -- Data Storage -- Stick all variables below here.            ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

   msg db 'Welcome to Brandon', "'s OS.", 0 ;Variable message with hex code zero at the end. This does not automatically null 
   ;terminate. It is recommended to null terminate otherwise you are asking for problems.
   ;width db 'b234567890123456789012345678901234567890123456789012345678901234567890123456789e', 0 ;Print to make sure width is 80.
   times 510-($-$$) db 0 ;Pad rest of mbr with zeros until padded 510th byte. $ means current address. $$ means address of first line.
   db 0x55 ;Write 511th byte to bootloader to start marking drive as bootable.
   db 0xAA ;Write 512th byte to bootloader to end marking drive as bootable.