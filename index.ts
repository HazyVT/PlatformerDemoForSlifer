import { Slifer, Color, Font, Cursor } from 'slifer';
import Terminal from './src/terminal';
import Adv from './src/adv';
import Game from './src/game';

const window = Slifer.createWindow("Game", 640, 480);

const bg = new Color(0, 0, 0, 255);
export const white = new Color(255, 255, 255, 255);
const cursor = new Color(65, 65, 65, 255);

const font = new Font("./font.ttf", 12);

Adv.load();

while (!Slifer.shouldClose()) {
	Slifer.Graphics.setBackground(bg);

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
