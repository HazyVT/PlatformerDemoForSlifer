import { Slifer, Font, Vector2, Image, Canvas, Cursor, Rectangle } from 'slifer';
import { white } from '..';

// 290, 155 , 330, 190
// 286, 330, 330, 360 
// 176, 165, 235, 224 

class Adv {

	private static map: number[][] = [
		[2],
		[1]
	]
	private static pos : Vector2 = new Vector2(0, 1);
	private static hall: Image;
	private static room: Image;

	private static canvas: Canvas;
	private static defCurs : Cursor;
	private static downCurs : Cursor;
	private static upCurs : Cursor;
	private static leftCurs : Cursor;
	private static rightCurs : Cursor;
	private static inspectCurs: Cursor;

	private static hallToRoom : Rectangle;
	
	static load() {
		this.hall = new Image("./adv/hall.png")
		this.room = new Image('./adv/room.png');
		this.canvas = new Canvas(160, 120);

		this.defCurs = new Cursor("./adv/default-cursor.png");
		this.rightCurs = new Cursor("./adv/right.png");
		this.leftCurs = new Cursor("./adv/left.png");
		this.downCurs = new Cursor("./adv/down.png");
		this.upCurs = new Cursor("./adv/up.png");
		this.inspectCurs = new Cursor("./adv/inspect.png");

		Slifer.setCursor(this.defCurs);
	}

	static update() {
		const room = this.map[this.pos.y][this.pos.x];
		const mpos = Slifer.Mouse.getPosition();

		Slifer.setCursor(this.defCurs);
		
		switch (room) {
			case 1:
				if (mpos.x >= 290 && mpos.x <= 330 && mpos.y >= 155 && mpos.y <= 190) {
					Slifer.setCursor(this.upCurs);
					if (Slifer.Mouse.isPressed('left')) {
						this.pos.y -= 1;
					}
				}
				break;
			case 2:
				if (mpos.x >= 286 && mpos.x <= 330 && mpos.y >= 330 && mpos.y <= 360) {
					Slifer.setCursor(this.downCurs);
					if (Slifer.Mouse.isPressed('left')) {
						this.pos.y += 1;
					}
				}

				if (mpos.x >= 176 && mpos.x <= 235 && mpos.y >= 165 && mpos.y <= 224) {
					Slifer.setCursor(this.inspectCurs);
				}
				break;
		}		
	}	

	static draw(font: Font) {

		
		const room = this.map[this.pos.y][this.pos.x];
		switch (room) {
			case 1:
				this.canvas.draw(this.hall, 0, 0);
				break;
			case 2:
				this.canvas.draw(this.room, 0, 0);
				break;
		}


		Slifer.Graphics.drawEx(this.canvas, (640 - 320) / 2, (480 - 240) / 2, 2, 2);
	}
}

export default Adv;
