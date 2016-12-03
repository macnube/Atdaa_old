const Icons = [
	//SPECIAL ICONS
	{ id: 0,
		name: "empty",
		imageURI: ""},
	{ id: 1,
		name: "plus",
		imageURI: ""},
	{ id: 2,
		name: "trash",
		imageURI: ""},

	//CATEGORY ICONS
	{ id: 3,
		name: "cheese",
		imageURI: "cheese"},
	{ id: 4,
		name: "fish",
		imageURI: "fish"},
	{ id: 5,
		name: "wine",
		imageURI: "wine"},
	{ id: 6,
		name: "coffee",
		imageURI: "coffee"},
	{ id: 7,
		name: "cocktail",
		imageURI: "cocktail"},
	{ id: 8,
		name: "hotdog",
		imageURI: "hotdog"},
	{ id: 9,
		name: "tea",
		imageURI: "tea"},
	{ id: 10,
		name: "donut",
		imageURI: "donut"},
]

/*
export const IconList = [

	//Cheese Category	
	{
		id: 0,
		name: "Cheese",
		imageURI: "cheese",
		parent: null,
		children: [
			{
				id: "cheese",
				name: "Cheese",
				imageURI: "cheese",
				parent: true,
			},
			{
				id: "cheese_roquefort",
				name: "Roquefort",
				imageURI: "cheese",
				parent: false,
			},
			{
				id: "cheese_cheddar",
				name: "Cheddar",
				imageURI: "cheese",
				parent: false,
			},
			{	
				id: "cheese_mozzarella",
				name: "Mozzarella",
				imageURI: "cheese",
				parent: false,
			},
			{
				id: "cheese_feta",
				name: "Feta",
				imageURI: "cheese",
				parent: false,
			},
			{
				id: "cheese_gouda",
				name: "Gouda",
				imageURI: "cheese",
				parent: false,
			},
			{
				id: "cheese_monterrey_jack",
				name: "Monterrey Jack",
				imageURI: "cheese",
				parent: false,
			},
			{
				id: "cheese_parmesan",
				name: "Parmesan",
				imageURI: "cheese",
				parent: false,
			},
		]

	},
	

	//Fish Category
	{
		id: 1,
		name: "Fish",
		imageURI: "fish",
		parent: null,
		children: [
			{
				id: "fish",
				name: "Fish",
				imageURI: "fish",
				parent: true,
			},
			{
				id: "fish_salmon",
				name: "Salmon",
				imageURI: "fish",
				parent: false,
			},
			{
				id: "fish_trout",
				name: "Trout",
				imageURI: "fish",
				parent: false,
			},
			{
				id: "fish_mahi",
				name: "Mahi",
				imageURI: "fish",
				parent: false,
			},
			{
				id: "fish_tuna",
				name: "Tuna",
				imageURI: "fish",
				parent: false,
			},
		]
	},
	

	//Wine Category

	{
		id: 2,
		name: "Wine",
		imageURI: "wine",
		parent: null,
		children: [
			{
				id: "wine",
				name: "Wine",
				imageURI: "wine",
				parent: true,
			},
			{
				id: "wine_malbec",
				name: "Malbec",
				imageURI: "wine",
				parent: false,
			},
			{
				id: "wine_cabernet",
				name: "Cabernet",
				imageURI: "wine",
				parent: false,
			},
			{
				id: "wine_merlot",
				name: "Merlot",
				imageURI: "wine",
				parent: false,
			},
			{
				id: "wine_chardonney",
				name: "Chardonney",
				imageURI: "wine",
				parent: false,
			},

		]
	},
	

	//Coffee Category

	{
		id: 3,
		name: "Coffee",
		imageURI: "coffee",
		parent: null,
		children: [
			{
				id: "coffee",
				name: "Coffee",
				imageURI: "coffee",
				parent: true,
			},
			{
				id: "coffee_latte",
				name: "Latte",
				imageURI: "coffee",
				parent: false,
			},
			{
				id: "coffee_espresso",
				name: "Espresso",
				imageURI: "coffee",
				parent: false,
			},
			{
				id: "coffee_capuccino",
				name: "Capuccino",
				imageURI: "coffee",
				parent: false,
			},
			{
				id: "coffee_aeropress",
				name: "Aeropress",
				imageURI: "coffee",
				parent: false,
			},
			{
				id: "coffee_iced_coffee",
				name: "Iced Coffee",
				imageURI: "coffee",
				parent: false,
			},
		]
	},
	

	//Cocktail Category

	{
		id: 4,
		name: "Cocktail",
		imageURI: "cocktail",
		parent: null,
		children: [
			{
				id: "cocktail",
				name: "Cocktail",
				imageURI: "cocktail",
				parent: true,
			},
			{
				id: "cocktail_mojito",
				name: "Mojito",
				imageURI: "cocktail",
				parent: false,
			},
			{
				id: "cocktail_martini",
				name: "Martini",
				imageURI: "cocktail",
				parent: false,
			},
			{
				id: "cocktail_manhattan",
				name: "Manhattan",
				imageURI: "cocktail",
				parent: false,
			},
			{
				id: "cocktail_whiskey_sour",
				name: "Whiskey Sour",
				imageURI: "cocktail",
				parent: false,
			},
			{
				id: "cocktail_bloody_mary",
				name: "Bloody Mary",
				imageURI: "cocktail",
				parent: false,
			},
			{
				id: "cocktail_margarita",
				name: "Margarita",
				imageURI: "cocktail",
				parent: false,
			},

		]
	},
	

	//Other

	{
		id: 5,
		name: "Hotdog",
		imageURI: "hotdog",
		parent: null,
		children: [
			{
				id: "hotdog",
				name: "Hotdog",
				imageURI: "hotdog",
				parent: true,
			},
		]
	},


	{
		id: 6,
		name: "Noodles",
		imageURI: "noodles",
		parent: null,
		children: [
			{
				id: "noodles",
				name: "Noodles",
				imageURI: "noodles",
				parent: true,
			},
		]

	},


	{
		id: 7,
		name: "Tea",
		imageURI: "tea",
		parent: null,
		children: []
	},

	{
		id: 8,
		name: "Donut",
		imageURI: "donut",
		parent: null,
		children: []
	},
]
*/
export default Icons;