import { Breadcrumb } from '@xlion/component';
import React, { Fragment } from 'react';

export default function BreadcrumbCom(props: any) {
	const { breadcrumb = {} } = props;
	return (
		<>
			<Breadcrumb>
				{breadcrumb?.routes?.map((item: any, index: number) => (
					<Breadcrumb.Item key={index}>
						{item.breadcrumbName}
					</Breadcrumb.Item>
				))}
			</Breadcrumb>
		</>
	);
}
