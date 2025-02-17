/*
	CODE FOR EVENT SYSTEM

	1. Have a system class that contains all the rules and events
	2. Have a rule class that takes a string and a integer
	3. Have an event class that has an execute function
	4. Have event subclasses extend the base event class
*/

import { Rectangle, Slifer, Vector2 } from 'slifer';
import { font, white, black } from '..';

interface Event {
	finished: boolean;
	rules: Map<string, number>;
	nextEvent?: Event;
	execute() : void;
}

export class Dialogue implements Event {

	finished : boolean = false;
	rules: Map<string, number>;
	dialogue : string;

	private wRect: Rectangle;
	private bRect : Rectangle;
	private time: number;
	private show: string = "";

	constructor(rules: Map<string, number>, dialogue: string) {
		this.rules = rules;
		this.dialogue = dialogue;

		this.wRect = new Rectangle(
			new Vector2(160, 20),
			new Vector2(320, 60)
		);
		
		this.bRect = new Rectangle(
			new Vector2(164, 24),
			new Vector2(312, 52)
		);
		
		this.time = 0;
	}

	execute() {
		this.time += Slifer.deltaTime * 4;
		this.show = this.dialogue.substring(0, Math.floor(this.time));

		if (Math.floor(this.time) > this.dialogue.length) {
			this.finished = true;
		}

		Slifer.Graphics.drawRect(this.wRect, white);
		Slifer.Graphics.drawRect(this.bRect, black);
		Slifer.Graphics.print(this.show, 168, 28, font, white);
	}
}

class System {

	static activeRules : Map<string, number>  = new Map();
	static allEvents : Event[] = [];
	

	static activeEvent : Event | null = null;
	static activeIndex : number = -1;

	private static time = 0;

	
	static setRule(fact: string, value: number) {
		this.activeRules.set(fact, value);
	}

	private static ruleCheck() {
		this.allEvents.forEach((event, index) => {
			if (event.rules.size == this.activeRules.size) {
				let possible = true;

				for (var [key, val] of this.activeRules) {
					const tv = event.rules.get(key);
					if (tv !== val || (tv === undefined && !event.rules.has(key))) {
						possible = false;
					}
				}

				if (possible) {
					this.activeEvent = event;
					this.activeIndex = index;
					
				}
			}
		})
	}

	

	private static executeActiveEvent() {
		if (this.activeEvent != null) {
			this.activeEvent.execute();

			if (this.activeEvent.finished) {
				this.time += Slifer.deltaTime;

				if (Math.floor(this.time) == 2) {
					delete this.allEvents[this.activeIndex];
					this.activeEvent = null;
					this.activeIndex = -1;
					this.time = 0;
				}
				
			}
		}
	}

	static update() {
		
		this.ruleCheck();

		if (this.activeEvent != null) {
			this.executeActiveEvent();	
		}
		
	}
	
}

export default System;
