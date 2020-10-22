import React, { useMemo } from 'react';
import Pending from './../pending/index';
import Declined from './../declined/index';

function NotApprovedInfo({ advert }) {
	const Item = useMemo(() => {
		if (advert.status_id === 1) {
			return <Pending advert={advert} />;
		}

		if (advert.status_id === 3) {
			return <Declined />;
		}
	}, [advert]);

	return Item;
}

export default NotApprovedInfo;
