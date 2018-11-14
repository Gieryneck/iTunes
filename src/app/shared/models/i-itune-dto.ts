export interface IITuneDTO {
	category: {
		attributes: {
			'im:id': string;
			label: string;
			scheme: string;
			term: string;
		};
	};

	id: {
		label: string;
		attributes: {
			'im:id': string;
		};
	};

	'im:artist': {
		label: string;
		attributes: {
			href: string;
		};
	};

	'im:contentType': {
		attributes: {
			term: string;
			label: string;
		};
		'im:contentType': {
			attributes: {
				term: string;
				label: string;
			};
		};
	};

	'im:image': {
		label: string;
		attributes: {
			height: string;
		};
	}[];

	'im:itemCount': {
		label: string;
	};

	'im:name': {
		label: string;
	};

	'im:price': {
		label: string;
		attributes: {
			amount: string;
			currency: string;
		};
	};

	'im:releaseDate': {
		label: string;
		attributes: {
			label: string;
		};
	};

	link: {
		attributes: {
			href: string;
			rel: string;
			type: string;
		};
	};

	rights: {
		label: string;
	};

	title: {
		label: string;
	};
}
