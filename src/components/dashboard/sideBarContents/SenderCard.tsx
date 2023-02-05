function SenderCard({ senderName, senderAvatar, senderStatus }) {
	return (
		<div className="flex items-center p-1 bg-blue-gray-50 relative">
			<Avatar
				style={{ width: '80px', height: '80px' }}
				{...senderAvatar}
				avatarStyle="Circle"
			/>
			<div className="pl-2">
				<div className="font-semibold">{senderName}</div>
				<div className="text-xs text-gray-600">{senderStatus}</div>
			</div>
		</div>
	);
}
