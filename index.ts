import Slifer from "slifer";
import Vector2 from "slifer/src/engine/vector";

const window = Slifer.createWindow("Game", new Vector2(640, 480));

while (!Slifer.shouldClose()) {
    Slifer.Graphics.render();
}

Slifer.quit();
