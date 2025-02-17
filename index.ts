import { Slifer, Color, Font, Cursor } from 'slifer';
import Terminal from './src/terminal';
import Adv from './src/adv';
import Game from './src/game';

const window = Slifer.createWindow("Game", 640, 480);

export const white = new Color(255, 255, 255, 255);
export const black = new Color(0, 0, 0, 255);
const cursor = new Color(65, 65, 65, 255);

const font = new Font("./font.ttf", 12);
const defCursor = new Cursor("./adv/default-cursor.png");

Adv.load();

while (!Slifer.shouldClose()) {
	Slifer.Graphics.setBackground(black);

	Slifer.setCursor(defCursor);

	switch (Game.state) {
		case "terminal":
			Terminal.update();

			Terminal.draw(font);
			break;
		case "adv":
			Adv.update();

			Adv.draw(font);
			break;
	}
	
	Slifer.Graphics.render();
}
