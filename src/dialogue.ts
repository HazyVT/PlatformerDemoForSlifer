import { Slifer, Rectangle, Vector2, Font } from 'slifer';
import { white, black } from '..';

class Dialogue {

	wRect: Rectangle;
	bRect: Rectangle;
	time: number;
	close: boolean;
	dialogue: string;

	private show = "";

	constructor(dialogue: string) {
		this.wRect = new Rectangle(
			new Vector2(160, 20),
			new Vector2(320, 60)
		);

		this.bRect = new Rectangle(
			new Vector2(164, 24),
			new Vector2(312, 52)
		);
		this.time = 0;
		this.dialogue = dialogue;
		this.close = false;
	}

	update() {
		this.time += Slifer.deltaTime * 8;
		this.show = this.dialogue.substring(0, Math.floor(this.time));	

		if (Math.floor(this.time) > this.dialogue.length) {
			this.close = true;
		}
	}

	draw(font: Font) {
		Slifer.Graphics.drawRect(this.wRect, white);
		Slifer.Graphics.drawRect(this.bRect, black);
		Slifer.Graphics.print(this.show, 168, 28, font, white);
		
	}
}

export default Dialogue;
