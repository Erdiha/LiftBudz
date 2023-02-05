export interface IPexelImages {
	data: {
		next_page: string;
		page: number;
		per_page: number;
		photos: [
			{
				alt: string;
				avg_color: string;
				id: number;
				width: number;
				height: number;
				url: string;
				photographer: string;
				photographer_url: string;
				photographer_id: number;
				src: {
					landscape: string;
					large: string;
					large2x: string;
					medium: string;
					original: String;
					portrait: string;
					small: string;
					tiny: string;
				};
			},
		];
	};
}

export interface IPost {
	id: string | number;
	created_at: string;
	friends: [string];
	likes: [string];
}
