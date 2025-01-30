import Slifer, { Image, Vector2, Rectangle } from "slifer";

const red = Slifer.Graphics.makeColor(255, 0, 0, 10);


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
    private static idleImage: Image;
    private static jumpImage: Image;
    private static current_sprite = 0;
    private static image: Image;
    private static animating: boolean = true;
    private static animation: string;
    private static flip = false;
    private static gravity = 0.2;
    private static jumpSpeed = 5;

    private static groundedRect: Rectangle;

    public static load() {
        this.idleImage = Slifer.Graphics.loadImage("./art/Sir-BC_stop.png");
        this.jumpImage = Slifer.Graphics.loadImage("./art/Sir-BC_jump.png");
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk1.png")
        );
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk2.png")
        );
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk3.png")
        );
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk4.png")
        );
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk5.png")
        );
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk6.png")
        );
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk7.png")
        );
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk8.png")
        );

        this.image = this.idleImage;
		        this.rect = new Rectangle(
        	new Vector2(this.position.x, this.position.y),
        	new Vector2(this.size.x, this.size.y)
        );

        this.groundedRect = new Rectangle(
            new Vector2(this.rect.position.x, this.rect.position.y + this.rect.size.y -1),
            new Vector2(this.rect.size.x, 1)
        );
    }

    public static checkForGrounded(rect: Rectangle) {
        if (this.groundedRect.isColliding(rect)) {
            this.yvel =
                Number(Slifer.Keyboard.isPressed("space")) * -this.jumpSpeed;

            if (this.xvel != 0) {
            	if (this.xvel > 0) this.flip = true;
                            if (this.xvel < 0) this.flip = false;
            
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
                        new Vector2(this.rect.position.x, this.rect.position.y  + Math.sign(this.yvel)),
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
                new Vector2(this.rect.position.x + Math.sign(this.xvel), this.rect.position.y),
                new Vector2(this.rect.size.x, this.rect.size.y)
            );

            while (!xvelSignRect.isColliding(rect)) {
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

        if (this.yvel < 4) {
            this.yvel += this.gravity;
        }
        if (this.current_sprite >= this.walkImages.length) {
            this.current_sprite = 0;
        }

        var move =
            Number(Slifer.Keyboard.isDown("d")) -
            Number(Slifer.Keyboard.isDown("a"));

        this.xvel = move * this.speed;

        this.chooseAnimation(this.xvel);


        objects.forEach((rect) => {
        	this.checkForGrounded(rect);

        	this.checkVerticalColl(rect);
        	this.checkHorizontalColl(rect);
        })

        


       this.updatePosition();
    }

    public static updatePosition() {
        this.rect.position.x += this.xvel;
        this.rect.position.y += this.yvel;
    }

    private static animate() {
        this.animating = true;
    }

    private static chooseAnimation(xm: number) {
		this.animation = "jump";
		        	this.animating = false;
		        	this.image = this.jumpImage;
    }

    public static draw() {
        Slifer.Graphics.drawEx(
            this.image,
            this.rect.position,
            0,
            new Vector2(3, 3),
            this.flip
        );

        //Slifer.Graphics.drawRect(this.rect, red)
    }
}

export default Player;
