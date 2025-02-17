import { Slifer, Font, Color, Rectangle, Vector2, type keys } from 'slifer';
import { files } from './files';
import Game from './game';

class Terminal {
	static screenText: string[] = [
		"VAULT TERMINAL HQ",
		"welcome to vault terminal.",
		"use the help command to list all possible commands"
	];
	static playerType: string = "";

	private static letters : keys[] = [
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 
		'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
		'q', 'r', 's', 't', 'u', 'v', 'w',
		'x', 'y', 'z', '.' 
	];
	
	private static white : Color = new Color(255, 255, 255, 255);
	private static gray : Color = new Color(60, 60, 60, 255);
	private static orange: Color = new Color(245, 123, 66, 255);
	
	private static time = 0;
	private static cursor = new Rectangle(
		new Vector2(32, 32 + this.screenText.length * 18),
		new Vector2(4, 14)
	);
	private static cursorState = "idle";
	private static currDirectory = "";

	private static termCheck(term: string) {
		return this.playerType.includes(term);
	}

	private static runCommand(command: string) {
		if (this.termCheck('exit')) {
			Slifer.isRunning = false;
		}

		if (this.termCheck('help')) {
			this.screenText = [
				"VAULT TERMINAL HQ",
				"run |FileName| - Run an executable file",
				"open |FileName| - Open a text file",
				"ls - List all files in directory",
				"help - List's all commands",
				"exit - closes the terminal",
			]
		}

		if (this.termCheck('ls')) {
			this.screenText = [
				"VAULT TERMINAL HQ"
			];
			files.forEach((file) => {
				if (file.location == this.currDirectory) {
					this.screenText.push(`${file.name}.${file.fileType}`);
				}
			})
		}

		if (this.termCheck('run')) {
			const fileName = this.playerType.split(' ')[1];
			if (fileName == undefined) {
				this.screenText = [
					"VAULT TERMINAL HQ",
					"File name needs to be added"
				]
			} else {
				files.forEach((file) => {
					if (file.location == this.currDirectory) {
						if (file.name == fileName) {
							if (file.fileType != "exe") {
								this.screenText = [
									"VAULT TERMINAL HQ",
									"File needs to be an executable"
								]
							} else {
								Game.state = fileName;
							}
						}
					}
				})
			}
		}

		if (this.termCheck('open')) {
			const fileName = this.playerType.split(' ')[1];
			if (fileName == undefined) {
				this.screenText = [
					"VAULT TERMINAL HQ",
					"File name needs to be added"
				]
			} else {
				files.forEach((file) => {
					if (file.location == this.currDirectory) {
						if (file.name == fileName) {
							if (file.fileType != "txt") {
								this.screenText = [
									"VAULT TERMINAL HQ",
									"File needs to be a text file"
								];
							} else {
								this.screenText = file.content!;
							}
						}
					}
				});
			}
		}
	
		this.playerType = "";
	}

	static update() {
		this.time += Slifer.deltaTime;


		if (Math.floor(this.time) % 2 == 0) {
			this.cursorState = "idle";
		}
				
		this.letters.forEach((letter) => {
			if (Slifer.Keyboard.isPressed(letter)) {
				this.playerType += letter;
				this.cursorState = "typing";
			}
		})

		if (Slifer.Keyboard.isPressed('backspace')) {
			this.playerType = this.playerType.slice(0, -1);
			this.cursorState = "typing";
		}

		if (Slifer.Keyboard.isPressed("space")) {
			this.playerType += ' ';
			this.cursorState = "typing";
		}

		if (Slifer.Keyboard.isPressed("return")) {
			this.runCommand(this.playerType);
		}
	}

	static draw(font: Font) {
		Slifer.Graphics.print("$", 32, 32 + (this.screenText.length * 18), font, this.orange);
		Slifer.Graphics.print(this.playerType, 48, 32 + (this.screenText.length * 18), font, this.white);
		this.cursor.position.y = 32 + (this.screenText.length * 18);

		if (this.cursorState == "idle") {
			if (Math.floor(this.time) % 2 == 0) {
				this.cursor.position.x = 48 + Slifer.Graphics.getTextSize(font, this.playerType).width;
				Slifer.Graphics.drawRect(this.cursor, this.gray);
			}
		} else {
			this.cursor.position.x = 48 + Slifer.Graphics.getTextSize(font, this.playerType).width;
			Slifer.Graphics.drawRect(this.cursor, this.gray);
		}
		
	
		this.screenText.forEach((text, index) => {
			Slifer.Graphics.print(text, 32, 32 + (index * 18), font, this.white)
		})
	}
}

export default Terminal;
