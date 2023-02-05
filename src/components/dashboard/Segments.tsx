import useAuth, { useUserLibrary } from '@/firebase/usefirebaseUI';
import React from 'react';

function Segments({ tabs, setActiveTab, activeTab }: any) {
	const { currentUser } = useAuth();
	const { getCurrentUser } = useUserLibrary(currentUser!.uid);
	return (
		<div className="w-full h-full">
			<div className="h-fit w-fit flex items-center text-gray-300">
				{getCurrentUser?.displayName}
			</div>
			<div className="md:flex flex-col grid grid-cols-2 mt-4 md:mt-12 text-sm md:text-md">
				{tabs.map((tab: any, index: number) => (
					<button
						key={index}
						onClick={() => setActiveTab(tab.tabName)}
						className={`flex w-full justify-between p-2  hover:text-gray-500 cursor-pointer items-center md:mb-6 ${
							activeTab === tab.tabName
								? 'text-gray-300 border-[1px] border-white'
								: 'text-gray-500 border-none '
						} `}
					>
						<div className="flex items-center">
							<span className="text-sm  m-2">{tab.name}</span>
						</div>
						{tab.notification && (
							<div className="py-1 px-3 bg-gray-700 rounded flex items-center justify-center text-xs">
								{tab?.notification}
							</div>
						)}
					</button>
				))}
			</div>
		</div>
	);
}

export default Segments;
