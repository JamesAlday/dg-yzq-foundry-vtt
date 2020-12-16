/* ===============================================================================
 * TWILIGHT 2000 4E
 * Official website: https://frialigan.se/en/games/twilight-2000/
 * ===============================================================================
 * System Version: 0.0.1
 * Last Update:    15.12.2020
 * ===============================================================================
 * Contributing: https://github.com/Stefouch/t2k4e
 * ===============================================================================
 * Creator: Stefouch
 * Patreon: https://www.patreon.com/Stefouch
 * ===============================================================================
 */

// Imports Modules.
import { T2K4E } from './config.js';

// Imports Entities.
import ItemT2K from './item/item.js'

// Imports Applications.
import ItemSheetT2K from './item/itemSheet.js';

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once('init', function() {
	console.log(`t2k4e | Initializing the Twilight 2000 4E Game System\n${T2K4E.ASCII2}`);

	// Creates a namespace within the game global.
	// Places our classes in their own namespace for later reference.
	game.t2k4e = {
		applications: {
			ItemSheetT2K
		},
		config: T2K4E,
		entities: {
			ItemT2K
		}
	};

	// Records configuration values.
	CONFIG.T2K4E = T2K4E;
	CONFIG.Item.entityClass = ItemT2K;

	// Patches Core functions.
	CONFIG.Combat.initiative = {
		formula: '1d10 + @attributes.agl.value / 10',
		decimals: 1
	}

	// Registers sheet application classes. 
	// This will stop using the core sheets and instead use our customized versions.
	// Actors.unregisterSheet('core', ActorSheet);
	// Actors.registerSheet('t2k4e', T2KActorSheet, { makeDefault: true });
	Items.unregisterSheet('core', ItemSheet);
	Items.registerSheet('t2k4e', ItemSheetT2K, { makeDefault: true });

	/* -------------------------------------------- */
	/*  Handlebars Custom Helpers
	/* -------------------------------------------- */

	Handlebars.registerHelper('concat', () => {
		let outStr = '';
		for (const arg in arguments) {
			if (typeof arguments[arg] !== 'object') {
				outStr += arguments[arg];
			}
		}
		return outStr;
	});
	
	Handlebars.registerHelper('toLowerCase', str => str.toLowerCase());

	Handlebars.registerHelper('times', (n, content) => {
		let outStr = '';
		for (; n > 0; n--) outStr += content.fn(n);
		return outStr;
	})
});