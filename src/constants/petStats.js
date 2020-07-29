function round(num, decimals){
return Math.round(Math.pow(10, decimals) * num) / Math.pow(10, decimals);
}

function floor(num, decimals){
return Math.floor(Math.pow(10, decimals) * num) / Math.pow(10, decimals);
}

function formatStat(stat){
let statFloored = Math.floor(stat);
if (statFloored > 0)
	return `§a+${statFloored}`;
else return `§a${statFloored}`;
}

const symbols = {
	health: "❤",
	defense: "❈",
	strength: "❁",
	crit_chance: "☣",
	crit_damage: "☠",
intelligence: "✎",
	speed: "✦",
sea_creature_chance: "α",
magic_find: "✯",
pet_luck: "♣",
	attack_speed: "⚔️",
	true_defense: "❂"
}

class Pet{
	constructor(rarity, level){
		this.rarity = rarity;
		this.level = level; 
	}

get lore(){
	let list = [];
		for(const stat in this.stats){
			switch(stat){
				case "health":
					list.push(`§7Health: ${formatStat(this.stats[stat])}`);
		break;
				case "defense":
		list.push(`§7Defense: ${formatStat(this.stats[stat])}`);
		break;
				case "strength":
		list.push(`§7Strength: ${formatStat(this.stats[stat])}`);
		break;
				case "crit_chance":
		list.push(`§7Crit Chance: ${formatStat(this.stats[stat])}`);
		break;
				case "crit_damage":
		list.push(`§7Crit Damage: ${formatStat(this.stats[stat])}`);
		break;
				case "intelligence":
		list.push(`§7Intelligence: ${formatStat(this.stats[stat])}`);
		break;
				case "speed":
		list.push(`§7Speed: ${formatStat(this.stats[stat])}`);
		break;
				case "bonus_attack_speed":
		list.push(`§7Bonus Attack Speed: ${formatStat(this.stats[stat])}`);
		break;
				case "sea_creature_chance":
		list.push(`§7Sea Creature Chance: ${formatStat(this.stats[stat])}`);
		break;
				case "magic_find":
		list.push(`§7Magic Find: ${formatStat(this.stats[stat])}`);
		break;
				case "pet_luck":
				list.push(`§7Pet Luck: ${formatStat(this.stats[stat])}`);
		break;
				case "true_defense":
					list.push(`§7True Defense: ${formatStat(this.stats[stat])}`);
		break;
		case "ability_damage":
					list.push(`§7Ability Damage: ${formatStat(this.stats[stat])}`);
		break;
				case "damage":
					list.push(`§7Damage: ${formatStat(this.stats[stat])}`);
		break;
			}
		}
	return list;
}
}

/*

Farming Pets

*/

class Bee extends Pet { // todo: finish hive
	get stats(){
		return {
	strength: this.level * 0.25,
			intelligence: this.level * 0.5,
			speed: this.level * 0.1
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let intMult = this.rarity > 3 ? 0.19 : this.rarity > 2 ? 0.14 : this.rarity > 1 ? 0.09 : this.rarity > 0 ? 0.4 : 0.02;
	let strMult = this.rarity > 3 ? 0.14 : this.rarity > 2 ? 0.11 : this.rarity > 1 ? 0.07 : this.rarity > 0 ? 0.4 : 0.02;
		return {
			name: "§6Hive", 
			desc: [`§7Gain §b+${round(this.level*intMult + 1, 1)}${symbols.intelligence} Intelligence §7and §c+${round(this.level*strMult + 1, 1)}${symbols.strength} Strength §7for each nearby bee.`, `§8Max 15 bees`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 1 : 0.5;
		return {
			name: "§6Busy Buzz Buzz", 
			desc: [`§7Has §a${round(this.level*mult, 1)}% §7chance for flowers to drop an extra one`]
		};
	}

	get third() {
		let mult = 0.2;
		return {
			name: "§6Weaponized Honey", 
			desc: [`§7Gain §a${round(5+this.level*mult, 1)}% §7of recieved damage as §6${symbols.health} Absorption`]
		};
	}
}

class Chicken extends Pet {
	get stats(){
		return {
	health: this.level * 2
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 0.5 : this.rariy > 0 ? 0.3 : 0.4;
		return {
			name: "§6Light Feet", 
			desc: [`§7Reduces fall damage by §a${round(this.level*mult, 1)}%`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 1 : 0.8;
		return {
			name: "§6Eggstra", 
			desc: [`§7Killing chickens has a §a${round(this.level*mult, 1)}% §7chance to drop an egg`]
		};
	}

	get third() {
		let mult = 0.3;
		return {
			name: "§6Mighty Chickens", 
			desc: [`§7Chicken minions work §a${round(this.level*mult, 1)}% §7faster while on your island`]
		};
	}
}

class Elephant extends Pet {
	get stats(){
		return {
			intelligence: this.level * 0.75,
	health: this.level * 1
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 2 ? 0.2 : 0.1;
		return {
			name: "§6Stomp", 
			desc: [`§7Gain §a${round(this.level*mult, 1)} ${symbols.defense} Defense §7for every §f100 ${symbols.speed} Speed`]
		};
	}

	get second() {
		let mult = 0.01;
		return {
			name: "§6Walking Fortress", 
			desc: [`§7Gain §c${round(this.level*mult, 1)} ${symbols.health} Health §7for every §a10 ${symbols.defense} Defense`]
		};
	}

	get third() {
		let mult = 0.25;
		return {
			name: "§6Trunk Efficiency", 
			desc: [`§7Grants a §a${round(this.level*mult, 1)}% §7chance to get double crops while farming`]
		};
	}
}

class Pig extends Pet {
	get stats(){
		return {
			intelligence: this.level * 0.75,
	health: this.level * 1
		};
	}

	get abilities(){
		let list = [this.first, this.second];
		if (this.rarity > 1)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 0;
		return {
			name: "§6Ridable", 
			desc: [`§7Right-click your summoned pet to ride it!`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.5 : this.rarity > 0 ? 0.4 : 0.3;
		return {
			name: "§6Run", 
			desc: [`§7Increases the speed of your mount by §a${round(this.level*mult, 1)}%`]
		};
	}

	get third() {
		let mult = this.rarity > 2 ? 0.5 : 0.4;
		return {
			name: "§6Sprint", 
			desc: [`§7While holding an Enchanted Carrot on a Stick, increase the speed of your mount by §a${round(this.level*mult, 1)}%`]
		};
	}
}

class Rabbit extends Pet {
	get stats(){
		return {
	health: this.level * 1,
			speed: this.level * 0.2
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 0.5 : this.rariy > 1 ? 0.4 : 0.3;
		return {
			name: "§6Happy Feet ", 
			desc: [`§7Jump Potions also give §a+${round(this.level*mult, 0)} §7speed`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.3 : 0.25;
		return {
			name: "§6Farming Exp Boost ", 
			desc: [`§7Boosts your Farming Exp by §a${round(this.level*mult, 1)}%`]
		};
	}

	get third() {
		let mult = 0.3;
		return {
			name: "§6Efficient Farming", 
			desc: [`§7Farming minions work §a${round(this.level*mult, 1)}% §7faster while on your island.`]
		};
	}
}

/*

Mining Pets

*/

class Bat extends Pet {
	get stats(){
		return {
	intelligence: this.level * 1,
	speed: this.level * 0.05
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 0.2 : this.rariy > 1 ? 0.15 : 0.1;
		return {
			name: "§6Candy Lover", 
			desc: [`§7Increases the chance for mobs to drop Candy by §a${round(this.level*mult, 1)}%`]
		};
	}

	get second() {
		let mult_intel = this.rarity > 2 ? 0.5 : 0.4;
		let mult_speed = this.rarity > 2 ? 0.3 : 0.2; 
		return {
			name: "§6Nightmare", 
			desc: [`§7During night, gain §a${round(this.level*mult_intel, 1)} §9${symbols.intelligence} Intelligence, §a${round(this.level*mult_speed, 1)} §f${symbols.speed} Speed§7, and night vision`]
		};
	}

	get third() {
		let mult = 0.75;
		return {
			name: "§6Fast Hooks", 
			desc: [`§7Decrease the cooldown of your grapping hook by §a${round(this.level*mult, 1)}%`]
		};
	}
}

class Endermite extends Pet {
	get stats(){
		return {
	intelligence: this.level * 1
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 1 ? 0.5 : 0.4;
		return {
			name: "§6More Stonks", 
			desc: [`§7Gain more exp orbs for breaking end stone and gain a +§a${round(this.level*mult, 1)}% §7chance to get an extra block dropped.`]
		};
	}

	get second() {
		let mult = 0.05;
		return {
			name: "§6Pearl Muncher", 
			desc: [`§7Upon picking up an ender pearl, consume it and gain §a${5 + round(this.level*mult, 1)} §6coins`]
		};
	}

	get third() {
		let mult = 0.4;
		return {
			name: "§6Pearl Powered", 
			desc: [`§7Upon consuming an ender pearl, gain +§a${round(this.level*mult, 1)} §7speed for 10 seconds`]
		};
	}
}

class Rock extends Pet {
	get stats(){
		return {
			defense: this.level * 2,
			true_defense: this.level * 0.1
		};
	}

	get abilities(){
		let list = [this.first, this.second];
		if (this.rarity > 1)
			list.push(this.third);
		if (this.rarity > 3)
			list.push(this.fourth);
		return list;
	}

	get first() {
		let mult = 0;
		return {
			name: "§6Ridable", 
			desc: [`§7Right-click on your summoned pet to ride it!`]
		};
	}

	get second() {
		let mult = 0;
		return {
			name: "§6Sailing Stone", 
			desc: [`§7Sneak to move your rock to your location (15s cooldown)`]
		};
	}

	get third() {
		let mult = this.rarity > 2 ? 0.25 : 0.2;
		return {
			name: "§6Fortify", 
			desc: [`§7While sitting on your rock, gain +§a${round(this.level*mult, 1)}% §7defense`]
		};
	}

	get fourth() {
		let mult = 0.3;
		return {
			name: "§6Steady Ground",
			desc: [`§7While sitting on your rock, gain +§a${round(this.level*mult, 1)}§7% damage`]
		}
	}
}

class Silverfish extends Pet {
	get stats(){
		return {
	defense: this.level * 1,
			health: this.level * 0.2
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 2 ? 0.15 : this.rarity > 0 ? 0.1 : 0.05;
		return {
			name: "§6True Defense Boost", 
			desc: [`§7Boosts your §f${symbols.true_defense} True Defense §7by §a${floor(this.level*mult, 1)}`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.3 : 0.2;
		return {
			name: "§6Mining Exp Boost", 
			desc: [`§7Boosts your Mining exp by §a${round(this.level*mult, 1)}%`]
		};
	}

	get third() {
		let mult = 0;
		return {
			name: "§6Dexterity", 
			desc: [`§7Gives permanent haste III`]
		};
	}
}

class WitherSkeleton extends Pet {
	get stats(){
		return {
	crit_chance: this.level * 0.05,
	intelligence: this.level * 0.25,
	crit_damage: this.level * 0.25,
	defense: this.level * 0.25,
			strength: 5 + this.level * 0.25
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 0.3 : this.rariy > 1 ? 0.1 : 0.05;
		return {
			name: "§6Stronger Bones", 
			desc: [`§7Take §a${round(this.level*mult, 1)}% §7less damage from skeletons`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.5 : 0.3;
		return {
			name: "§6Wither Blood", 
			desc: [`§7Deal §a${round(this.level*mult, 1)}% §7more damage to wither mobs`]
		};
	}

	get third() {
		let mult = 2;
		return {
			name: "§6Death's Touch", 
			desc: [`§7Upon hitting an enemy inflict the wither effect for §a${round(this.level*mult, 1)}% damage over 3 seconds`, `§8Does not stack`]
		};
	}
}

/*

Combat Pets

*/

class BlackCat extends Pet {
	get stats(){
		return {
			speed: this.level * 0.25,
	intelligence: this.level * 1
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 1;
		return {
			name: "§6Hunter",
			desc: [`§7Increases your speed and speed cap by +§a${round(this.level*mult, 1)}`]
		};
	}

	get second() {
		let mult = 0.15;
		return {
			name: "§6Omen", 
			desc: [`§7Grants §d${floor(this.level*mult, 1)} ${symbols.pet_luck} Pet Luck`]
		};
	}

	get third() {
		let mult = 0.15;
		return {
			name: "§6Supernatural", 
			desc: [`§7Grants §b${floor(this.level*mult, 1)} ${symbols.magic_find} Magic Find`]
		};
	}
}

class Blaze extends Pet {
	get stats(){
		return {
	intelligence: this.level * 1,
	defense: 10 + this.level * 0.2
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 2 ? 0.2 : this.rariy > 1 ? 0.1 : 0.05;
		return {
			name: "§6Nether Embodiment", 
			desc: [`§7Increases all stats by §a${round(this.level*mult, 1)}% §7while on the Blazing Fortress`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.5 : 0.3;
		return {
			name: "§6Bling Armor", 
			desc: [`§7Upgrades §cBlaze Armor §7stats and ability by §a${round(this.level*mult, 1)}%`]
		};
	}

	get third() {
		let mult = 0.1;
		return {
			name: "§6Fusion-Style Potato", 
			desc: [`§7Doubles effects of hot potato books`]
		};
	}
}

class EnderDragon extends Pet {
	get stats(){
		return {
	strength: this.level * 0.5,
	crit_chance: this.level * 0.1,
	crit_damage: this.level * 0.5
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 0.25 : this.rariy > 1 ? 0.1 : 0.05;
		return {
			name: "§6End Strike", 
			desc: [`§7Deal §a${round(this.level*mult, 1)}% §7more damage to end mobs`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.5 : 0.3;
		return {
			name: "§6One With The Dragon", 
			desc: [`§7Buffs the Aspect of the Dragons sword by §a${round(this.level*0.5, 1)} §c${symbols.strength} Damage and §a${round(this.level*0.3, 1)} §c${symbols.strength} Strength`]
		};
	}

	get third() {
		let mult = 0.1;
		return {
			name: "§6Superior", 
			desc: [`§7Increases all stats by §a${round(this.level*mult, 1)}%`]
		};
	}
}

class Enderman extends Pet {
	get stats(){
		return {
			crit_damage: this.level * 0.75
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 0.3 : this.rariy > 1 ? 0.2 : 0.1;
		return {
			name: "§6Enderian", 
			desc: [`§7Take §a${round(this.level*mult, 1)}% §7less damage from end monsters`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.5 : 0.4;
		return {
			name: "§6Teleport Savyy", 
			desc: [`§7Buffs the Aspect of the End ability granting §a${round(this.level*mult, 1)} §7weapon damage for 5s on use.`]
		};
	}

	get third() {
		let mult = 0.25;
		return {
			name: "§6Zealot Madness", 
			desc: [`§7Increases your odds to find a special Zealot by §a${round(this.level*mult, 1)}%.`]
		};
	}
}

class Ghoul extends Pet {
	get stats(){
		return {
			intelligence: this.level * 0.75,
			health: this.level * 1
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 0.25 : this.rariy > 1 ? 0.25 : 0.1;
		return {
			name: "§6Amplified Healing", 
			desc: [`§7Increase all healing by §a${round(this.level*mult, 1)}%`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.5 : 0.1;
		return {
			name: "§6Zombie Arm", 
			desc: [`§7Increase the health and range of the Zombie sword by §a${round(this.level*mult, 1)}%`]
		};
	}

	get third() {
		let mult = 1;
		return {
			name: "§6Reaper Soul", 
			desc: [`§7Increases the health and lifespan of the Reaper Scythe zombies by §a${round(this.level*mult, 1)}%`]
		};
	}
}

class Golem extends Pet {
	get stats(){
		return {
			health: this.level * 1.5,
			strength: this.level * 0.5
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 0.3;
		return {
			name: "§6Last Stand", 
			desc: [`§7While less than 15% HP, deal §a${round(this.level*mult, 1)}% §7more damage`]
		};
	}

	get second() {
		let mult = 0.25;
		return {
			name: "§6Ricochet", 
			desc: [`§7Your iron plating causes §a${round(this.level*mult, 1)}% §7of attacks to rocochet and hit the attacker`]
		};
	}

	get third() {
		let mult = 3;
		return {
			name: "§Toss", 
			desc: [`§7Every 5 hits, throw the enemy up into the air and deal ${200+round(this.level*mult, 1)}% damage (10s cooldown)`]
		};
	}
}

class Guardian extends Pet {
	get stats(){
		return {
			intelligence: this.level * 1,
			defense: this.level * 0.5
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 0.2 : this.rariy > 2 ? 0.15 : this.rariy > 1 ? 0.1 : this.rariy > 0 ? 0.06 : 0.02;
		return {
			name: "§6Lazerbeam", 
			desc: [`§7Zap your enemies for §b${round(this.level*mult, 1)}x §7your §b${symbols.intelligence} Intelligence §7every §a3s`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.3 : 0.25;
		return {
			name: "§6Enchanting Exp Boost", 
			desc: [`§7Boosts your Enchanting exp by §a${round(this.level*mult, 1)}%`]
		};
	}

	get third() {
		let mult = 0.3;
		return {
			name: "§7Mana Pool", 
			desc: [`§7Regenerate §b${round(this.level*mult, 1)}% §7extra mana, doubled when near or in water`]
		};
	}
}

class Horse extends Pet {
	get stats(){
		return {
			intelligence: this.level * 0.5,
			speed: this.level * 0.25
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 0;
		return {
			name: "§6Ridable", 
			desc: [`§7Right-click your summoned pet to ride it!`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 1.2 : 1.1;
		return {
			name: "§6Run", 
			desc: [`§7Increase the speed of your mount by §a${round(this.level*mult, 1)}%`]
		};
	}

	get third() {
		let mult = 0.25;
		return {
			name: "§6Ride Into Battle", 
			desc: [`§7When riding your horse, gain +§a${round(this.level*mult, 1)}% §7bow damage`]
		};
	}
}

class Hound extends Pet {
	get stats(){
		return {
			strength: this.level * 0.4,
		attack_speed: this.level * 0.15
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 0.05;
		return {
			name: "§6Scavenger", 
			desc: [`§7Gain +§a${round(this.level*mult, 1)} §7coins per monster kill`]
		};
	}

	get second() {
		let mult = 0.1;
		return {
			name: "§6Finder", 
			desc: [`§7Increases the chance for monsters to drop their armor by §a${round(this.level*mult, 1)}%`]
		};
	}

	get third() {
		let mult = 0.1;
		return {
			name: "§6Fury Claws", 
			desc: [`§7Grants ${round(this.level*mult, 1)}	§e${symbols.attack_speed} Bonus Attack Speed`]
		};
	}
}

class MagmaCube extends Pet {
	get stats(){
		return {
			health: this.level * 0.5,
			defense: this.level * 0.33,
			strength: this.level * 0.2
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 2 ? 0.3 : this.rariy > 0 ? 0.25 : 0.2;
		return {
			name: "§6Slimy Minions", 
			desc: [`§7Slime minions work §a${round(this.level*mult, 1)}% §7faster while on your island`]
		};
	}

	get second() {
		let mult = 0.2;
		return {
			name: "§6Salt Blade", 
			desc: [`§7Deal §a${round(this.level*mult, 1)} §7more damage to slimes`]
		};
	}

	get third() {
		let mult = 1;
		return {
			name: "§6Hot Ember", 
			desc: [`§7Buffs the stats of Ember Armor by ${round(this.level*mult, 1)}%`]
		};
	}
}

class Phoenix extends Pet {
	get stats(){
		return {
			strength: 10 + this.level * 0.5,
			intelligence: 50 + this.level * 1
		};
	}

	get abilities(){
		let list = [this.first, this.second];
		if (this.rarity > 3)
			list.push(this.third);
			list.push(this.fourth);
		return list;
	}

	get first() {
		let start_strength = this.rarity > 3 ? 15 : 10;
		let mult_strength = this.rarity > 3 ? 0.15 : 0.1;
		let mult_time = 0.02;
		return {
			name: "§6Rekindle", 
			desc: [`§7Before death, become §eimmune §7and gain §c${start_strength + round(this.level*mult_strength, 1)} ${symbols.strength} Strength §7for ${2 + round(this.level*mult_time, 1)} §7seconds`, `§73 minutes cooldown`]
		};
	}

	get second() {
		let mult_damage = this.rarity > 3 ? 0.14 : 0.12;
		let mult_time = 0.04
		return {
			name: "§6Fourth Flare", 
			desc: [`§7On 4th melee strike, §6ignite §7mobs, dealing §c${1 + round(this.level*mult_damage, 1)}x §7your §9${symbols.crit_damage} Crit Damage §7each second for §a${2 + floor(this.level * mult_time, 0)} §7seconds`]
		};
	}

	get third() {
		let mult = 0;
		return {
			name: "§6Magic Bird", 
			desc: [`§7You may always fly on your private island`]
		};
	}

	get fourth() {
		let mult = 0;
		return {
			name: "§6Eternal Coins",
			desc: [`§7Don't lose coins from death.`]
		}
	}
}

class Pigman extends Pet {
	get stats(){
		return {
			strength: this.level * 0.5,
			defense: this.level * 0.5
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 0.3;
		return {
			name: "§6Bacon Farmer", 
			desc: [`§7Pig minions work §a${round(this.level*mult, 1)}% §7faster while on your island`]
		};
	}

	get second() {
		let mult_damage = 0.4;
		let mult_strength = 0.25
		return {
			name: "§6Pork Master", 
			desc: [`§7Buffs the Pigman sword by §a${round(this.level*mult_damage, 1)} §c${symbols.strength} Damage and §7§a${round(this.level*mult_strength, 1)} §c${symbols.strength} Strength`]
		};
	}

	get third() {
		let mult = 0.25;
		return {
			name: "§6Giant Slayer", 
			desc: [`§7Deal §a${round(this.level*mult, 1)}% §7extra damage to monsters level 100 and up`]
		};
	}
}

class SkeletonHorse extends Pet {
	get stats(){
		return {
			speed: this.level * 0.5,
			intelligence: this.level * 1
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 0;
		return {
			name: "§6Ridable", 
			desc: [`§7Right-click your summoned pet to ride it!`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 1.5 : 0.1;
		return {
			name: "§6Run", 
			desc: [`§7Increase the speed of your mount by §a${round(this.level*mult, 1)}%`]
		};
	}

	get third() {
		let mult = 0.4;
		return {
			name: "§6Ride Into Battle", 
			desc: [`§7When riding your horse, gain +§a${round(this.level*mult, 1)}% §7bow damage`]
		};
	}
}

class Skeleton extends Pet {
	get stats(){
		return {
			crit_chance: this.level * 0.15,
			crit_damage: this.level * 0.3
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.raity > 2 ? 0.2 : 0.1;
		return {
			name: "§6Bone Arrows", 
			desc: [`§7Increase arrow damage by §a${round(this.level*mult, 1)}% §7which is tripled while in dungeons`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.2 : 0.17;
		return {
			name: "§6Combo", 
			desc: [`§7Gain a combo stack for every bow hit granting +§a3 §c${symbols.strength} Strength§7. Max §a${round(this.level*mult, 1)} §7stacks, stacks disappear after 8 seconds`]
		};
	}

	get third() {
		let mult = 0;
		return {
			name: "§6Skeletal Defense", 
			desc: [`§7Your skeleton shoots an arrow dealing §a60x §7your §9${symbols.crit_damage} Crit Damage §7when a mob gets close to you (15s cooldown)`]
		};
	}
}

class Snowman extends Pet {
	get stats(){
		return {
			damage: this.level * 0.25,
			strength: this.level * 0.25,
			crit_damage: this.level * 0.25
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 0.04;
		return {
			name: "§6Blizzard", 
			desc: [`§7Slow all enemies within §a${4 + round(this.level*mult, 1)} §7blocks`]
		};
	}

	get second() {
		let mult = 0.15;
		return {
			name: "§6Frostbite", 
			desc: [`§7Your freezing aura slows enemy attacks causing you to take§a${floor(this.level*mult, 1)}% §7reduced damage`]
		};
	}

	get third() {
		let mult = 0;
		return {
			name: "§6Snow Cannon", 
			desc: [`§7Your snowman fires a snowball dealing §a5x §7your §c${symbols.strength} Strength §7when a mob gets close to you (1s cooldown)`]
		};
	}
}

class Spider extends Pet {
	get stats(){
		return {
			strength: this.level * 0.1,
			crit_chance: this.level * 0.1
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 0.1;
		return {
			name: "§6One With The Spider", 
			desc: [`§7Gain §a${round(this.level*mult, 1)} §c${symbols.strength} Strength §7for every nearby spider`, `§8Max 10 spiders`]
		};
	}

	get second() {
		let mult = 0.4;
		return {
			name: "§6Web-weaver", 
			desc: [`§7Upon hitting a monster it becomes slowed by §a${round(this.level*mult, 1)}%`]
		};
	}

	get third() {
		let mult = 0.3;
		return {
			name: "§6Spider Whisperer", 
			desc: [`§7Spider and tarantula minions work §a${round(this.level*mult, 1)} §7faster while on your island`]
		};
	}
}

class Tarantula extends Pet {
	get stats(){
		return {
			crit_chance: this.level * 0.1,
			crit_damage: this.level * 0.3,
			strength: this.level * 0.1
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 0.3;
		return {
			name: "§6Webbed Cells", 
			desc: [`§7Anti-healing is §a${round(this.level*mult, 1)}% §7less effective against you`]
		};
	}

	get second() {
		let mult = 0.5;
		return {
			name: "§6Eight Legs", 
			desc: [`§7Decreases the mana cost of Spider and Tarantula boots by §a${round(this.level*mult, 1)}%`]
		};
	}

	get third() {
		let mult = 0.4;
		return {
			name: "§6Arachnid Slayerr", 
			desc: [`§7Gain +§a${round(this.level*mult, 1)} §7more combat xp from spiders`]
		};
	}
}

class Tiger extends Pet {
	get stats(){
		return {
			strength: 5 + this.level * 0.1,
		crit_chance: this.level * 0.05,
			crit_damage: this.level * 0.5
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 0.2 : this.rariy > 1 ? 0.1 : 0.05;
		return {
			name: "§6Merciless Swipe", 
			desc: [`§7Attacks have a §a${round(this.level*mult, 1)}% §7chance to strike twice`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.55 : 0.3;
		return {
			name: "§6Hemorrhage", 
			desc: [`§7Melee attacks reduce healing by §a${round(this.level*mult, 1)}% §7for 10 seconds`]
		};
	}

	get third() {
		let mult = 0.2;
		return {
			name: "§6Apex Predator", 
			desc: [`§7Deal ${round(this.level*mult, 1)}% damage against targets with no other mobs within 15 blocks`]
		};
	}
}

class Turtle extends Pet {
	get stats(){
		return {
			health: this.level * 0.5,
			defense: this.level * 1
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 0.17;
		return {
			name: "§6Turtle Tactics", 
			desc: [`§7Gain §a+${round(this.level*mult, 1)}% ${symbols.defense} Defense`]
		};
	}

	get second() {
		let mult_defense = this.rarity > 3 ? 0.45 : 0.35;
		let mult_health = this.rarity > 3 ? 0.25 : 0.2;
		return {
			name: "§6Genius Amniote", 
			desc: [`§7Gain §a+${round(this.level*mult_defense, 1)} ${symbols.defense} Defense §7and regen §c+${round(this.level*mult_health, 1)}${symbols.health} §7per second when near or in water`]
		};
	}

	get third() {
		let mult = 0;
		return {
			name: "§6Unflippable", 
			desc: [`§7Gain §aimmunity §7to knockback`]
		};
	}
}

class Wolf extends Pet {
	get stats(){
		return {
			health: this.level * 0.5,
			crit_damage: this.level * 0.1,
			speed: this.level * 0.2,
			true_defense: this.level * 0.1
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 0.3 : this.rariy > 1 ? 0.2 : 0.1;
		return {
			name: "§6Alpha Dog", 
			desc: [`§7Take §a${round(this.level*mult, 1)}% §7less damage from wolves`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.15 : 0.1;
		return {
			name: "§6Pack Leader", 
			desc: [`§7Gain §a${round(this.level*mult, 1)} §9 ${symbols.crit_damage} Crit Damage §7for every nearby wolf monsters`, `§8Max 10 wolves`]
		};
	}

	get third() {
		let mult = 0.3;
		return {
			name: "§6Combat Exp Boost", 
			desc: [`§7Boosts your Combat exp by §a${round(this.level*mult, 1)}%`]
		};
	}
}

class Zombie extends Pet {
	get stats(){
		return {
			crit_damage: this.level * 0.3,
			health: this.level * 1
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 0.3 : this.rariy > 1 ? 0.2 : 0.1;
		return {
			name: "§6Chomp", 
			desc: [`§7Gain +§a${round(this.level*mult, 1)} §7hp per zombie kill`]
		};
	}

	get second() {
		let mult = 0.2;
		return {
			name: "§6Rotten Blade", 
			desc: [`Deal §a${round(this.level*mult, 1)} §7more damage to zombies`]
		};
	}

	get third() {
		let mult = 0.25;
		return {
			name: "§6Living Dead", 
			desc: [`§7Increases the defense of all undead armor sets by §a${round(this.level*mult, 1)}%`]
		};
	}
}

/*

Foraging Pets

*/

class Giraffe extends Pet { 
	get stats(){
		return {
			health: this.level * 1,
			crit_chance: this.level * 0.05
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 0.25 : this.rariy > 2 ? 0.2 : this.rariy > 1 ? 0.15 : 0.1;
		return {
			name: "§6Good Heart", 
			desc: [`§7Regen §c${round(this.level*mult, 1)} ${symbols.health} §7per second`]
		};
	}

	get second() {
		let strMult = this.rarity > 2 ? 0.5 : 0.4;
	let cdMult = this.rarity > 3 ? 0.4 : this.rarity > 2 ? 0.25 : 0.1;
		return {
			name: "§6Higher Ground", 
			desc: [`Grants §c+${round(this.level*strMult, 1)} ${symbols.strength} Strength §7and §9+${round(this.level*cdMult + 20, 1)} ${symbols.crit_damage} Crit Damage §7when mid air or jumping`]
		};
	}

	get third() {
		let mult = 0.25;
		return {
			name: "§6Long Neck", 
			desc: [`See enemies from afar and gain ${round(this.level*mult, 1)}% §7dodge chance`]
		};
	}
}

class Lion extends Pet { 
	get stats(){
		return {
			strength: this.level * 0.5,
			speed: this.level * 0.25
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 0.2 : this.rariy > 2 ? 0.15 : this.rariy > 2 ? 0.1 : 0.5;
		return {
			name: "§6Primal Force", 
			desc: [`§7Adds §c+${round(this.level*mult, 1)}❁ Damage §7to your weapons`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? this.rarity > 3 ? 0.5 : 0.4 : 0.3;
		return {
			name: "§6First Pounce", 
			desc: [`Increases damage dealt by §a${round(this.level*mult, 1)}% §7on your first hit on a mob`]
		};
	}

	get third() {
		let mult = 0.3;
		return {
			name: "§6King of the Jungle", 
			desc: [`Deal §c+${round(this.level*mult, 1)}% ❁ Damage §7against mobs below level §a80`]
		};
	}
}

class Monkey extends Pet { 
	get stats(){
		return {
			speed: this.level * 0.2,
			intelligence: this.level * 0.5
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 2 ? 0.3 : this.rariy > 0 ? 0.25 : 0.2;
		return {
			name: "§6Treeborn", 
			desc: [`§7Increase double drop rates for logs by §a${round(this.level*mult, 1)}%`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 1 : 0.8;
		return {
			name: "§6Vine Swing", 
			desc: [`§7Gain +§a${round(this.level*mult, 1)}	§f${symbols.speed} Speed §7while in The Park`]
		};
	}

	get third() {
		let mult = 0.5;
		return {
			name: "§6Evolved Axes", 
			desc: [`§7Reduce the cooldown of Jungle Axe and Treecapitator by §a${round(this.level*mult, 1)}%`]
		};
	}
}

class Ocelot extends Pet { 
	get stats(){
		return {
			speed: this.level * 0.5
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 2 ? 0.3 : 0.25;
		return {
			name: "§6Foraging Exp Boost", 
			desc: [`§7Boosts your Foraging exp by §a${round(this.level*mult, 1)}%`]
		};
	}

	get second() {
		let mult = 0.3;
		return {
			name: "§6Tree Hugger", 
			desc: [`§7Foraging minions work §a${round(this.level*mult, 1)}% §7faster while on your island`]
		};
	}

	get third() {
		let mult = 0.3;
		return {
			name: "§6Tree Essence", 
			desc: [`§7Gain a §a${round(this.level*mult, 1)}% §7chance to get exp from breaking a log`]
		};
	}
}

/*

Fishing Pets

*/

class BabyYeti extends Pet {
	get stats(){
		return {
	intelligence: this.level * 0.75,
	strength: this.level * 0.4
		};
	}

	get abilities(){
		let list = [this.first, this.second];
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 0.5;
		return {
			name: "§6Cold Breeze", 
			desc: [`§7Gives §a${round(this.level*mult, 1)} §c${symbols.strength} Strength §7and §9${symbols.crit_damage} Crit Damage §7when near snow`]
		};
	}

	get second() {
		let mult = 1;
		return {
			name: "§6Ice Shields", 
			desc: [`§7Gain §a${round(this.level*mult, 1)}% §7of your strenth as §a${symbols.defense} Defense`]
		};
	}

	get third() {
		let mult = 1;
		return {
			name: "§6Yeti Fury", 
			desc: [`§7Buff the Yeti sword by §a${round(this.level*mult, 1)} §c${symbols.strength} Damage §7and §9${symbols.intelligence} Intelligence`]
		};
	}
}


class BlueWhale extends Pet {
	get stats(){
		return {
	health: this.level * 2
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 2.5 : this.rarity > 2 ? 2 : this.rarity > 1 ? 1.5 : this.rarity > 0 ? 1 : 0.5;
		return {
			name: "§6Ingest", 
			desc: [`§7All potions heal §c+${round(this.level*mult, 1)}${symbols.health}`]
		};
	}

	get second() {
		let mult = 0.03;
	let health = this.rarity > 3 ? "20.0" : this.rarity > 2 ? "25.0" : "30.0"
		return {
			name: "§6Bulk", 
			desc: [`§7Gain §a${round(this.level*mult, 1)} ${symbols.defense} Defense §7per §c${health} Max ${symbols.health} Health`]
		};
	}

	get third() {
		let mult = 0.2;
		return {
			name: "§6Archimedes", 
			desc: [`§7Gain §c+${round(this.level*mult, 1)}% Max ${symbols.health} Health`]
		};
	}
}

class Dolphin extends Pet {
	get stats(){
		return {
			sea_creature_chance: this.level * 0.05,
	intelligence: this.level * 1
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 2 ? 0.05 : this.rarity > 0 ? 0.04 : 0.03;
		let max = this.rarity > 2 ? 25 : this.rarity > 0 ? 20 : 15;
		return {
			name: "§6Pod Tactics", 
			desc: [`§7Increases your fishing speed by §a${round(this.level*mult, 1)}% §7for each nearby player within 10 blocks up to §a${max}%`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.1 : 0.07;
		return {
			name: "§6Echolocation", 
			desc: [`§7Increases sea creatures catch chance by §a${round(this.level*mult, 1)}%`]
		};
	}

	get third() {
		let mult = 0;
		return {
			name: "§6Splash Surprise", 
			desc: [`§7Stun sea creatures for §a5s §7after fishing them up`]
		};
	}
}

class FlyingFish extends Pet {
	get stats(){
		return {
	intelligence: this.level * 0.75,
	strength: this.level * 0.4
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 2 ? 0.15 : this.rariy > 1 ? 0.125 : 0.05;
		return {
			name: "§6Quick Reel", 
			desc: [`§7Increases fishing speed by §a${round(this.level*mult, 1)}%`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.5 : 0.4;
		return {
			name: "§6Water Bender", 
			desc: [`§7Gives §a${round(this.level*mult, 1)} §c${symbols.strength} Strength §7and §a${symbols.defense} Defense §7when near water`]
		};
	}

	get third() {
		let mult = 0.3;
		return {
			name: "§6Deep Sea Diver", 
			desc: [`§7Increases the stats of Diver Armor by §a${round(this.level*mult, 1)}%`]
		};
	}
}

class Squid extends Pet {
	get stats(){
		return {
	health: this.level * 0.5,
	intelligence: this.level * 0.5
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 2 ? 0.1 : this.rariy > 0 ? 0.8 : 0.5;
		return {
			name: "§6More Ink", 
			desc: [`§7Gain a §a${round(this.level*mult, 1)}% §7chance to get double drops from squids`]
		};
	}

	get second() {
		let mult_damage = this.rarity > 2 ? 0.4 : 0.3;
		let mult_strength = this.rarity > 2 ? 0.2 : 0.1;
		return {
			name: "§6Ink Specialty", 
			desc: [`§7Buffs the Ink Wand by §a${round(this.level*mult_damage, 1)} §c${symbols.strength} Damage §7and §a${round(this.level*mult_strength, 1)} §c${symbols.strength} Strength`]
		};
	}

	get third() {
		let mult = 0.3;
		return {
			name: "§6Fishing Exp Boost", 
			desc: [`§7Boosts your Fishing exp by §a${round(this.level*mult, 1)}%`]
		};
	}
}

/*

Alchemy Pets

*/

class Jellyfish extends Pet {
	get stats(){
		return {
			health: this.level * 2
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 1;
		return {
			name: "§6Radiant Regeneration", 
			desc: [`§7While in dungeons, increase your base health regen by §a${round(this.level*mult, 1)}% §7and heals players within 8 blocks by up to 10hp/s`]
		};
	}

	get second() {
		let mult = 0;
		return {
			name: "§6Hungry Healer", 
			desc: [`§7While in dungeons, for every 1000 you heal teammates apply the §aenchanted golden apple §7effect to all players within 10 blocks (10s cooldown)`]
		};
	}

	get third() {
		let mult = 0.5;
		return {
			name: "§6Powerful Potions", 
			desc: [`§7While in dungeons, increase the effectiveness of Instant Health and Mana splash potions by §a${round(this.level*mult, 1)}%`]
		};
	}
}

class Parrot extends Pet {
	get stats(){
		return {
			crit_damage: this.level * 0.1,
			intelligence: this.level * 1
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 3 ? 0.2 : 0.15;
		return {
			name: "§6Flamboyant", 
			desc: [`§7Adds §a${Math.max(round(this.level*mult, 0), 1)} §7levels to intimidation accessories`]
		};
	}

	get second() {
		let mult = 0.35;
		return {
			name: "§6Repeat", 
			desc: [`§7Boosts potion duration by §a${round(5 + (this.level*mult), 1)}%`]
		};
	}

	get third() {
		let mult = 0.25;
		return {
			name: "§6Bird Discourse", 
			desc: [`§7Gives §c+${symbols.strength}${round(5 + (this.level*mult), 1)} Strength §7to players within §a20 §7blocks`, `§7Doesn't stack`]
		};
	}
}

class Sheep extends Pet {
	get stats(){
		return {
	ability_damage: this.level * 0.5,
	intelligence: this.level * 1
		};
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = this.rarity > 2 ? 0.2 : this.rariy > 1 ? 0.125 : 0.05;
		return {
			name: "§6Mana Saver", 
			desc: [`§7Reduces the mana cost of abilites by §a${round(this.level*mult, 1)}%`]
		};
	}

	get second() {
		let mult = this.rarity > 2 ? 0.1 : 0.4;
		return {
			name: "§6Overheal", 
			desc: [`§7Gives a §a${round(this.level*mult, 1)}% §7shield after not taking damage for 10s`]
		};
	}

	get third() {
		let mult = 0.25;
		return {
			name: "§6Dungeon Wizard", 
			desc: [`§7Increases your total mana by §a${round(this.level*mult, 1)}% §7while in dungeons`]
		};
	}
}

/*
Other Pets/Todo
*/

class Jerry extends Pet {
	get stats(){
		return {
			intelligence: this.level * -1
		};
	}

	get abilities(){
		let list = [this.first, this.second];
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 50;
		return {
			name: "§6Jerry", 
			desc: [`§7Gain §a${round(mult, 1)}% §7chance to deal your regular damage.`]
		};
	}

	get second() {
		let mult = 100;
		return {
			name: "§6Jerry", 
			desc: [`§7Gain §a${round(mult, 1)}% §7chance to receive a normal amount of drops from mobs.`]
		};
	}

	get third() {
		let mult = 0.1;
		return {
			name: "§6Jerry", 
			desc: [`§7Actually adds ${Math.floor(this.level*mult)} damage to the Aspect of the Jerry.`]
		};
	}
}

class QuestionMark extends Pet {
	get stats(){
		return;
	}

	get abilities(){
		let list = [this.first];
		if (this.rarity > 1)
			list.push(this.second);
		if (this.rarity > 3)
			list.push(this.third);
		return list;
	}

	get first() {
		let mult = 0;
		return {
			name: "§6???", 
			desc: [`§7???`]
		};
	}

	get second() {
		let mult = 0;
		return {
			name: "§6???", 
			desc: [`§7???`]
		};
	}

	get third() {
		let mult = 0;
		return {
			name: "§6???", 
			desc: [`§7???`]
		};
	}
}

module.exports = {
	petStats: {
		//Farming
		'Bee': Bee,
		'Chicken': Chicken,
		'Elephant': Elephant,
		'Pig': Pig,
		'Rabbit': Rabbit,
		//Mining
		'Bat': Bat,
		'Endermite': Endermite,
		'Rock': Rock,
		'Silverfish': Silverfish,
		'Wither Skeleton': WitherSkeleton,
		//Combat
		'Black Cat': BlackCat,
		'Blaze': Blaze,
		'Ender Dragon': EnderDragon,
		'Enderman': Enderman,
		'Ghoul': Ghoul,
		'Golem': Golem,
		'Horse': Horse,
		'Hound': Hound,
		'Magma Cube': MagmaCube,
		'Phoenix': Phoenix,
		'Pigman': Pigman,
		'Skeleton Horse': SkeletonHorse,
		'Skeleton': Skeleton,
		'Snowman': Snowman,
		'Spider': Spider,
		'Tarantula': Tarantula,
		'Tiger': Tiger,
		'Turtle': Turtle,
		'Wolf': Wolf,
		'Zombie': Zombie,
		//Foraging
		'Giraffe': Giraffe,
		'Lion': Lion,
		'Monkey': Monkey,
		'Ocelot': Ocelot,
		//Fishing
		'Baby Yeti': BabyYeti,
		'Blue Whale': BlueWhale,
		'Dolphin': Dolphin,
		'Flying Fish': FlyingFish,
		'Squid': Squid,
		//Alchemy
		'Jellyfish': Jellyfish,
		'Parrot': Parrot,
		'Sheep': Sheep,
		//Other
		'Jerry': Jerry,
		'???': QuestionMark
	}
}