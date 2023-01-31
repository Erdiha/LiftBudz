import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,

} from '@material-tailwind/react';
import Avatar, { AvatarStyle } from 'avataaars';

import {IUser} from './types'

export default function UserCard({photoURL,description,displayName,email,mobile,location}:IUser) {
  return (
    <Card className="h-96">
      <CardHeader floated={false} className="h-80 flex items-center">
        <Avatar style={{ width: '80px', height: '80px' }} {...photoURL} />
        <Typography variant="h4" color="blue-gray" className=" ">
          {displayName}
        </Typography>
      </CardHeader>

      <CardBody className="text-center">
        <Typography color="blue" className="font-medium" textGradient>
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="flex flex-col justify-center gap-1 pt-2">
        <Typography variant="lead" color="blue" textGradient>
          {email}
        </Typography>
        <Typography variant="lead" color="light-blue" textGradient>
          {mobile}
        </Typography>
        <Typography
          as="a"
          href="#instagram"
          variant="lead"
          color="light-blue"
          textGradient
        >
          {location}
        </Typography>
      </CardFooter>
    </Card>
  );
}
