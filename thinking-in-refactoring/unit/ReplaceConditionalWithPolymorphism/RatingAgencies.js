
function rating(voyage, history) {
	const vpf = voyageProfitFactor(voyage, history);
	const vr = voyageRisk(voyage);
	const chr = captainHistoryRisk(voyage, history);
	if (vpf * 3 > ( vr + chr * 2)) return 'A';
	else return 'B';
}

function voyageRisk(voyage) {
	let result = 1;
	if(voyage.length > 4) result += 2;
	if(voyage.length > 8) result += voyage.length - 8;
	if(['China', 'east-indies'].inclueds(voyage.zone)) result += 4;
	return Math.max(result, 0);
}