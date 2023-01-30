import { Fragment, useState } from 'react';
import AvatarCard from './AvatarCard';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
} from '@material-tailwind/react';
import ProfileAvatar from './ProfileAvatar';

export default function AvatarModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  console.log(open);
  return (
    <Fragment>
      <Tooltip content="change avatar image">
        <Button onClick={() => setOpen(!open)} variant="gradient">
          <ProfileAvatar setOpen={setOpen} />
        </Button>
      </Tooltip>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Choose.</DialogHeader>
        <DialogBody divider>
          <AvatarCard setOpen={setOpen} open={open} />
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}
