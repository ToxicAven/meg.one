function asset(id, title, mClass) {
	let element = $(`#${id}`);
	let list = $("ul#pack-assets");

	element.toggleClass('selected');

	if ($(`li.${mClass}`).length > 0 && element.hasClass('selected')) {
		$(`.asset#${$(`li.${mClass}`).attr('id')}`).toggleClass('selected');
		$(`li.${mClass}`).remove();
	}

	if (!element.hasClass('selected')) $(`li#${id}`).remove();
	else list.append(`<li class='${mClass}' id='${id}'>${title}</li>`);
}

function download() {
	if ($('li').length < 1) {
		alert('Please add resources to download');
	} else {
		let assets = [];
		$('.asset.selected').each((i, obj) => assets.push(`${obj.id}~~~${$(obj).attr('minecraft')}`));

		fetch(`/pack/?assets=${assets.join(',')}`)
			.then((response) => response.json())
			.then((json) => {
				if (!json.success) throw Error('Failed');
				else window.open(`/download/${json.message}`).focus();
			})
			.catch((err) => alert(err));
	}
}