(function (Scratch) {

	const icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gsREi0NSRRAjgAAAfVJREFUWMPtl71PFEEYxp/3uMoQCMWRQEFjjESIYIwNicGEBjUGY2dJQ0FF439ARUfoLGywpaYRSCyIRkRptPTjYk4uesAZC4jyo5nDuWWDu3O7hIInmWx2svM+z/s1OyNd4DwAyGQ98ABY4x8+ATNAe8yanujERCg5UAQ+czqGgDbgOvAUeAkcG7jjProZKKJKOtQbawtmJkkj7n0DeJwmLcCSpFIKvWVJJeAy8LBhZCGi8BlQSCjgN2GoSlKDZDtid1LSAVD6D/mgpEsBWauYWbcvYC3mozZJVaAGlPyIeOm5FUD+zcx647zZSRC258AVwNzoDwj9F5/XPAE3JG0mLXxJh+5ZTBmBspn1HXeBI5+WVJE0mNCIuRQVA1Kw7r80DHQ4AfuS/jrjeWG5yRNXUEOS3p/Ftm9u42naiMxsS9LbM+CvRScKXluNusLKE+/iislvxU5JryVdzUlAl5ntnoiAh7qZ9btueJMx+dcouWLaqAv4mZP344AiNdgcATOrSZrKgXzFzD5GyU/7ycyTHXZDj1ePgA8ZCBho6cjnfjqLgeR3WyW/BrwIIP4D3Asl7QHGgFeBXleA7sSeA8PAOvCrxVzvA3Opj/le0d0GysBhSuIfwGymlxPgPrAKfHdHsj036sC2644nWV1scrktXSApjgAIc9v26afYKwAAAABJRU5ErkJggg==';
	const bicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gsREjIQ50giyQAAAmRJREFUWMPtlz1oVEEQx3/v3WEhMn7ABU5ZLCwMMWIKRVDU4AeI4gdYicIiaCOioGBlY2FldRYiIsgKprOwukpSCIJoUFEIiIVkkdOTRF0FNRKx2ZO95+XuvZe72OTfvd2Z+c/szszOgwX8Z0QAyjisltxGGvrKuAPAeWDYb70FKsAtq+VbQqdstdSiYOGQ1XI/DzlQBN4Aq9uIDgGvgHXAGaAf2B55A8PAKLDRahnL4UQdKGVQ+Wq1CEDsj36L33iqjDsaRJaG/F5GcguUlHFrlHGHi36xHAiMKOP2ACeB3ykM7s16YMAP4KPV0hf7xQ8JoRPAtDKu1CH6QWBxjrytWS19AA0HRlsIFYC6Mm5KGVdSxsWJxAPYlIP8ndWysqkMvdFPwLIOyneByz7jAdYC4xkdmLBa/lZLHGzsTKF8DHgNzAC/gJd5e0+TA8q400ANGMxgpODrPysehR8NA+Id+OmjK/Sw+1abIvEJtQF4Ph+932ppvgKrBavlBTA2D/xTyYU4KKsdKRvPXPCsbUYq45YCj3159QLLrZbP/5xAAGe19PtqeNJl8okkeasTWAFM9ij6AWA8OXdELfr7KeBml8kfWC27O3alwIkKcLZL5F+slllbfDzLeHUOOJKjz7fC1nazRZRi4IiAO8DxHOT7gGq7ebPYgXwAuAbsykg8Axy0WqqdBIstSMs+Y68Am3NE/d639nqqV00ZNwRcB9YDS+Zw19NAxWq5mGXMj4KZfhswAqxKkxsBJoEbVsulPF4XA08fWi3KX8N+4IK/ikXB8xwB3z3pbavlapYJOs8PxwJ6jj9Ynr6Hp/fUKgAAAABJRU5ErkJggg==';

	class Twitter {

		constructor() {
			this._caches = {
				search: {}
			}
		}

		getInfo() {
			return {
				id: 'Twitter',
				name: 'Twitter',
				menuIconURI: bicon,
				blockIconURI: icon,
				color1: '#1da1f2',
				color2: '#ffffff',
				color3: '#4c97ff',
				blocks: [
					{
						opcode: 'twitterSearch',
						text: 'get the [INDEX] most recent tweet about [TOPIC]',
						blockType: Scratch.BlockType.REPORTER,
						arguments: {
							TOPIC: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: '#Scratch'
							},
							INDEX: {
								type: Scratch.ArgumentType.NUMBER,
								defaultValue: 0
							}
						}
					}
				]
			};
		}

		_sanitiseIndex(idx) {
			if (!idx) {
				return 0;
			}
			let num = 0;
			try {
				num = parseInt(idx, 10);
				if (num <= 0) {
					return 0;
				}
				if (num >= 50) {
					return 50;
				}
				return num;
			}
			catch (err) {
				return 0;
			}
		}

		twitterSearch (args, util) {
			const idx = this._sanitiseIndex(args.INDEX);
			const searchstring = args.TOPIC;

			if (!searchstring) {
				return '';
			}

			if (this._caches.search[searchstring] &&
				this._caches.search[searchstring][idx]) 
			{
				return this._caches.search[searchstring][idx];
			}

			var url = new URL('https://twitter.sipc-api.top/');
			url.searchParams.append('q', searchstring);
			url.searchParams.append('count', 100);

			var _cache = this._caches.search;

			return fetch(url)
				.then((response) => {
					return response.json();
				})
				.then((responseJson) => {
					if (responseJson.statuses) {
						const tweets = responseJson.statuses;
						_cache[searchstring] = tweets.map((tweet) => tweet.text);
						return _cache[searchstring][idx];
					}
					else {
						console.log(responseJson);
						return '';
					}
				})
				.catch((err) => {
					console.log(err);
					return '';
				});
		}
	}
	Scratch.extensions.register(new Twitter());
})(Scratch);