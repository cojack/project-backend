import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import { NestExpressApplication } from '@nestjs/platform-express';
const View = require('express/lib/view');

function TwigView(name, options) {
	View.call(this, name, options);
}

TwigView.prototype = Object.create(View.prototype);
TwigView.prototype.lookup = (name) => name;

export function registerTwigEngine(app: NestExpressApplication) {
	const loader = new TwingLoaderFilesystem();
	loader.addPath(__dirname + '/../../admin/template', 'admin');
	const twing = new TwingEnvironment(loader, {debug: true});

	app.engine('twig', (filePath, options, callback) => {
		twing.render(filePath, options)
			.then(result => callback(null, result))
			.catch(err => callback(err));
	});
	app.set('view', TwigView);

	app.setBaseViewsDir([__dirname + '/../../admin/template']);
	app.useStaticAssets(process.cwd() + '/public');
	app.setViewEngine('twig');
}
