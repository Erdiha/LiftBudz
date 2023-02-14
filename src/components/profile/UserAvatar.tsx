import React from 'react';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({ name, src, size = 'md' }) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full h-${size} w-${size}`}>
      {src ? (
        <img
          className='h-full w-full rounded-full object-cover'
          src={src}
          alt={name}
        />
      ) : (
        <p className='text-lg font-medium'>{name[0]}</p>
      )}
    </div>
  );
};

export default Avatar;

{
  /* <Avatar name="John Doe" />
<Avatar name="Jane Doe" src="https://via.placeholder.com/150" size="lg" /> */
}
