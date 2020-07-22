import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '../../config';
import View from 'express/lib/view';

function TwigView(name, options): void {
	View.call(this, name, options);
}

TwigView.prototype = Object.create(View.prototype);
TwigView.prototype.lookup = (name): string => name;

export function registerTwigEngine(app: NestExpressApplication, config: ConfigService): void {
	const loader = new TwingLoaderFilesystem();
	loader.addPath(__dirname + '/../../admin/template', 'admin');
	const twing = new TwingEnvironment(loader, {
		debug: true,
		cache: false,
		auto_reload: true
	});
	twing.addGlobal('config', config);
	const express = app.getHttpAdapter().getInstance();
	twing.addGlobal('url', express.locals.url);

	app.engine('twig', (filePath, options, callback) => {
		twing
			.render(filePath, options)
			.then(result => callback(null, result))
			.catch(err => callback(err));
	});
	app.set('view', TwigView);

	app.setBaseViewsDir([__dirname + '/../../admin/template']);
	app.useStaticAssets(process.cwd() + '/public');
	app.setViewEngine('twig');
}
