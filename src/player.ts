import Slifer, { type Image, Vector2, Rectangle, AudioSource } from "slifer";
import { approach } from './utils';

class Player {
    public static position: Vector2;
    public static size: Vector2;
    public static rect: Rectangle;
    public static isGrounded = false;
    public static xvel = 0;
    public static yvel = 0;
    public static collisions = new Map([
        ["up", false],
        ["down", false],
        ["right", false],
        ["left", false],
    ]);
    public static speed = 2;

    private static walkImages: Image[] = [];
    private static walkFrames = 8;
    private static idleImage: Image;
    private static jumpImage: Image;
    private static fallImage: Image;
    private static current_sprite = 0;
    private static image: Image;
    private static animating: boolean = true;
    private static animation: string;
    private static flip = false;
    private static gravity = 0.2;
    private static jumpSpeed = 5;
    private static xscale: number = 0;
    private static yscale: number = 0;
    private static hasDouble = true;
    private static jumpsfx: AudioSource;

    private static groundedRect: Rectangle;

    public static load() {
        this.idleImage = Slifer.Graphics.loadImage("./art/frogsir-idle.png");
        this.jumpImage = Slifer.Graphics.loadImage("./art/frogsir-jump.png");
        this.fallImage = Slifer.Graphics.loadImage("./art/frogsir-fall.png");
        this.jumpsfx = Slifer.Audio.loadAudio("./sfx/jump.wav");
		/*
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/frogsir-walk1.png")
        );
        */
        for (let i = 1; i < this.walkFrames+1; i++) {
        	this.walkImages.push(Slifer.Graphics.loadImage(`./art/walk/frogsir-walk${i}.png`));
        }
       

        this.image = this.idleImage;
        this.rect = new Rectangle(
            new Vector2(this.position.x, this.position.y),
            new Vector2(this.size.x, this.size.y)
        );

        this.groundedRect = new Rectangle(
            new Vector2(
                this.rect.position.x,
                this.rect.position.y + this.rect.size.y - 1
            ),
            new Vector2(this.rect.size.x, 1)
        );
    }

    public static checkForGrounded(rect: Rectangle) {
        if (this.groundedRect.isColliding(rect)) {

			if (this.yvel > 1) {
				this.xscale = 1.2;
			}

            this.yvel =
                Number(Slifer.Keyboard.isPressed("space")) * -this.jumpSpeed;
            this.hasDouble = true;

            if (Slifer.Keyboard.isPressed("space")) {
            	this.jumpsfx.play();
            	this.yscale = 2.2;
            }

            

            if (this.xvel != 0) {
                if (this.xvel > 0) this.flip = false;
                if (this.xvel < 0) this.flip = true;

                //console.log(this.position);

                this.animation = "move";
                this.animating = true;
                this.image = this.walkImages[Math.floor(this.current_sprite)];
            } else {
                this.animation = "idle";
                this.current_sprite = 0;
                this.animating = false;
                this.image = this.idleImage;
            }
        }
    }

    public static checkVerticalColl(rect: Rectangle) {
        const yvelRect = new Rectangle(
            new Vector2(this.rect.position.x, this.rect.position.y + this.yvel),
            new Vector2(this.rect.size.x, this.rect.size.y)
        );

        if (yvelRect.isColliding(rect)) {
            const yvelSignRect = new Rectangle(
                new Vector2(
                    this.rect.position.x,
                    this.rect.position.y + Math.sign(this.yvel)
                ),
                new Vector2(this.rect.size.x, this.rect.size.y)
            );

            if (!yvelSignRect.isColliding(rect)) {
                this.rect.position.y += Math.sign(this.yvel);
            }

            this.yvel = 0;
        }
    }

    public static checkHorizontalColl(rect: Rectangle) {
        const xvelRect = new Rectangle(
            new Vector2(this.rect.position.x + this.xvel, this.rect.position.y),
            new Vector2(this.rect.size.x, this.rect.size.y)
        );

        //Slifer.Graphics.drawRect(xvelRect, red);

        if (xvelRect.isColliding(rect)) {
            const xvelSignRect = new Rectangle(
                new Vector2(
                    this.rect.position.x + Math.sign(this.xvel),
                    this.rect.position.y
                ),
                new Vector2(this.rect.size.x, this.rect.size.y)
            );

            if (!xvelSignRect.isColliding(rect)) {
                this.rect.position.x += Math.sign(this.xvel);
            }

            this.xvel = 0;
        }
    }

    public static update(dt: number, objects: Rectangle[]) {
        if (this.animating) this.current_sprite += 0.25;

        this.groundedRect = new Rectangle(
            new Vector2(this.position.x, this.position.y + this.size.y - 4),
            new Vector2(this.size.x, 8)
        );

        if (this.yvel < 10) {
            this.yvel += this.gravity;
        }
        if (this.current_sprite >= this.walkImages.length) {
            this.current_sprite = 0;
        }

        if (this.yvel != 0 && Slifer.Keyboard.isPressed("space") && this.hasDouble) {
            this.yvel = -this.jumpSpeed;
            this.hasDouble = false;
            this.jumpsfx.play();
        }

        var move =
            Number(Slifer.Keyboard.isDown("d")) -
            Number(Slifer.Keyboard.isDown("a"));

        if (move != 0) {
        	this.xvel = approach(this.xvel, this.speed * move, 0.4);
        } else {
        	this.xvel = approach(this.xvel, 0, 0.6);
        }

        this.chooseAnimation(this.xvel);

        objects.forEach((rect) => {
            this.checkForGrounded(rect);

            this.checkVerticalColl(rect);
            this.checkHorizontalColl(rect);
        });

        this.updatePosition();
        this.xscale = approach(this.xscale, 0, 0.09);
        this.yscale = approach(this.yscale, 0, 0.09);
    }

    public static updatePosition() {
        this.rect.position.x += this.xvel;
        this.rect.position.y += this.yvel;
    }

    private static animate() {
        this.animating = true;
    }

    private static chooseAnimation(xm: number) {
    	if (this.yvel > 0) {
    		this.animation = "fall";
    		this.animating = false;
    		this.image = this.fallImage;
    	} else {
    		this.animation = "jump";
    		this.animating = false;
    		this.image = this.jumpImage;
    	}
    }

    public static draw() {
    	const pos = new Vector2(this.rect.position.x - (1 + (this.xscale / 2)), this.rect.position.y - (1 + (this.yscale / 2)));
        Slifer.Graphics.drawEx(
            this.image,
            pos,
            0,
            new Vector2(
            	2 + 1 + (this.xscale / 2), 
            	2 + 1 + (this.yscale / 2)
            ),
            this.flip
        );

        //Slifer.Graphics.drawRect(this.rect, red)
    }

    public static quit() {
    	this.jumpsfx.destroy();
    }
}

export default Player;
