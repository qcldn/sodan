var names = ['Daniel', 'Franzi', 'Hector', 'Nathan', 'Sam'];

var data = names.map((o) => {
	return {name: o,
			value: Math.floor(Math.random()*100)}
});

draw_pie_chart(data);