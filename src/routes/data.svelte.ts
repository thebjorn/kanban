
export const data: Board = $state([
	{
		id: "c1",
		name: "TODO",
		tasks: [
			{ id: 1, name: "item41" },
			{ id: 2, name: "item42" },
			{ id: 3, name: "item43" },
			{ id: 4, name: "item44" },
			{ id: 5, name: "item45" },
			{ id: 6, name: "item46" },
			{ id: 7, name: "item47" },
			{ id: 8, name: "item48" },
			{ id: 9, name: "item49" }
		]
	},
	{
		id: "c2",
		name: "DOING",
		tasks: [
			{ id: 10, name: "item50" },
			{ id: 11, name: "item51" },
			{
				id: 17,
				name: "folder62",
				tasks: []
			}
		]
	},
	{
		id: "c3",
		name: "DONE",
		tasks: [
			{ id: 13, name: "item52" },
			{
				id: 14,
				name: "folder61",
				tasks: [
					{ id: 15, name: "item62" },
					{ id: 16, name: "item63" }
				]
			}
		]
	}
]);