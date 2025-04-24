// (() => {
// 	const modelViewer = document.getElementById('lanyard-model');
// 	const orbitCycle = [
// 		'45deg 55deg 4m',
// 		'-60deg 110deg 2m',
// 		modelViewer.cameraOrbit
// 	];

// 	setInterval(() => {
// 		const currentOrbitIndex = orbitCycle.indexOf(modelViewer.cameraOrbit);
// 		modelViewer.cameraOrbit =
// 			orbitCycle[(currentOrbitIndex + 1) % orbitCycle.length];
// 	}, 1500);
// })();