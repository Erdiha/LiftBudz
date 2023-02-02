import { useState } from 'react';
import AvatarCard from './AvatarCard';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Tooltip,
} from '@material-tailwind/react';
import ProfileAvatar from './ProfileAvatar';

export default function AvatarModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="flex items-center justify-center">
      <Tooltip content="change avatar image">
        <Button onClick={() => setOpen(!open)} variant="gradient">
          <ProfileAvatar setOpen={setOpen} />
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        handler={handleOpen}
        className=" relative bg-white/80 m-4  backdrop-blur-md rounded-lg shadow-2xl text-blue-gray-500 antialiased font-sans text-base font-light leading-relaxed w-[20rem]  min-w-[30%] text-center max-w-5xl"
      >
        <DialogHeader>Choose.</DialogHeader>
        <DialogBody divider>
          <AvatarCard setOpen={setOpen} open={open} />
        </DialogBody>
      </Dialog>
    </div>
  );
}
