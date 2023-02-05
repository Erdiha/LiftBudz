import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Tooltip,
} from '@material-tailwind/react';
import Avatar from 'avataaars';
import { useEffect, useState } from 'react';

import { IUser } from '../../firebase/types';

export default function UserCard({
	photoURL,
	description,
	displayName,
	email,
	mobile,
	location,
	id,
}: IUser) {
	return (
		<Card key={id} className="flex max-h-64 w-full ">
			<CardHeader
				floated={false}
				className=" bg-clip-border mt-0 mx-0 p-2 rounded-none overflow-hidden bg-white text-gray-700 shadow-lg flex justify-start items-center"
			>
				<Avatar
					avatarStyle="Circle"
					style={{ width: '40px', height: '40px' }}
					{...photoURL}
				/>
				,
				<Typography variant="h4" color="blue-gray" className=" ">
					{displayName}
				</Typography>
			</CardHeader>
			<Typography
				className="font-medium text-black border-b-2 px-2 p-2 italic"
				textGradient
			>
				{description}
			</Typography>
			<CardFooter className="flex flex-col  gap-1  justify-start text-sm ">
				<Typography color="blue" textGradient className="flex text-sm w-full">
					{email}
				</Typography>
				<Typography color="light-blue" textGradient className="text-sm w-full">
					{mobile}
				</Typography>
				<Typography color="light-blue" textGradient className="text-sm ">
					{location}
				</Typography>
			</CardFooter>
		</Card>
	);
}
